//export hidden layer
var ignoreHiddenLayers = true;
var savePNGs = true;
var saveEXML = true;
var scaleImage = 1;
var useHorizontalCenterAndTop = false;
alertDialog();

/**alert control panel**/
function alertDialog () {
	if (!hasFilePath()) {
		alert("File did not save\nPlease save the file and try again");
		return;
	}

	var dialog = new Window("dialog", "Export");

	dialog.savePNGs = dialog.add("checkbox", undefined, "Export Images");
	dialog.savePNGs.value = savePNGs;
	dialog.savePNGs.alignment = "left";

	dialog.saveEXML = dialog.add("checkbox", undefined, "Export EXML");
	dialog.saveEXML.alignment = "left";
	dialog.saveEXML.value = saveEXML;

	dialog.ignoreHiddenLayers = dialog.add("checkbox", undefined, "Ignore Hidden Layers");
	dialog.ignoreHiddenLayers.alignment = "left";
	dialog.ignoreHiddenLayers.value = ignoreHiddenLayers;

	dialog.useHorizontalCenterAndTop = dialog.add("checkbox", undefined, "Use HorizontalCenterAndTop")
	dialog.useHorizontalCenterAndTop.alignment = "left";
	dialog.useHorizontalCenterAndTop.value = useHorizontalCenterAndTop;


	var scaleGroup = dialog.add("panel", [0, 0, 180, 50], "Image Scale");
	var scaleText = scaleGroup.add("edittext", [10,10,40,30], scaleImage * 100);
	scaleGroup.add("statictext", [45, 12, 100, 20], "%");
	var scaleSlider = scaleGroup.add("slider", [60, 10,165,20], scaleImage * 100, 1, 100);
	scaleText.onChanging = function() {
		scaleSlider.value = scaleText.text;
		if (scaleText.text < 1 || scaleText.text > 100) {
			alert("Valid numbers are 1-100.");
			scaleText.text = scaleImage * 100;
			scaleSlider.value = scaleImage * 100;
		}
	};
	scaleSlider.onChanging = function() { scaleText.text = Math.round(scaleSlider.value); };

	var confirmGroup = dialog.add("group", [0, 0, 180, 50]);
	var okButton = confirmGroup.add("button", [10, 10, 80, 35], "Ok");
	var cancelButton = confirmGroup.add("button", [90, 10, 170, 35], "Cancel");

    okButton.onClick = function() {
		savePNGs = dialog.savePNGs.value;
		saveEXML = dialog.saveEXML.value;
		ignoreHiddenLayers = dialog.ignoreHiddenLayers.value;
		useHorizontalCenterAndTop = dialog.useHorizontalCenterAndTop.value;
		scaleImage = scaleSlider.value / 100;
		init();
		this.parent.close(0);
        //this.parent.remove();
	};

	cancelButton.onClick = function() {
        this.parent.close(0);
        //this.parent.remove();
        return;
    };


	dialog.orientation = "column";
	dialog.center();
	dialog.show();
}
function checkLayerName(names,layerName)
{
    var i  = 1;
	for(var key in layerName){
        if(layerName[key] == names){
            names = names+"_"+i;
            names = checkLayerName(names,layerName);
        };
    }
    return names
}
function init () {
    var stageWidth = app.activeDocument.width.as("px") * scaleImage;
    var stageHeight = app.activeDocument.height.as("px") * scaleImage;
    var name = decodeURI(app.activeDocument.name);//文件名字
	name = name.substring(0, name.indexOf("."));

	var dir = app.activeDocument.path + "/../resource/";

	var res_ui = dir + "ui/"
    var skinDir = dir + "skins/";
    new Folder(dir).create();
    new Folder(skinDir).create();
    if(savePNGs){
    	new Folder(res_ui).create();
		new Folder(res_ui + name +"/" ).create();
    }


	app.activeDocument.duplicate();

	var layers = [];
	getLayers(app.activeDocument, layers);

	var layerCount = layers.length;
	var layerVisibility = {};
    var layerName = [];
    var newName;
	for (var i = layerCount - 1; i >= 0; i--) {
		var layer = layers[i];
		layerVisibility[layer] = getLayerVisible(layer);
		layer.visible = false;
         newName = checkLayerName(trim(layer.name),layerName)
         layerName[i]  = newName;
	}

	if (saveEXML || savePNGs) {
		var exml = "<?xml version='1.0' encoding='utf-8'?>\n";
		exml += '<e:Skin class=\"skins.' + name  + '\" '  +  ' width=\"'+ stageWidth +'\" height=\"'+ stageHeight +'\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:w=\"http://ns.egret.com/wing\">'
		for (var i = layerCount - 1; i >= 0; i--) {
			var layer = layers[i];

			if (ignoreHiddenLayers && !layerVisibility[layer]) continue;
			//屏幕坐标系是左上角的
			var x = app.activeDocument.width.as("px") * scaleImage;
			layer.visible = true;
			if (!layer.isBackgroundLayer)
				app.activeDocument.trim(TrimType.TRANSPARENT, false, true, true, false);
            x -= app.activeDocument.width.as("px") * scaleImage;
            var y = app.activeDocument.height.as("px") * scaleImage;
			if (!layer.isBackgroundLayer)
				app.activeDocument.trim(TrimType.TRANSPARENT, true, false, false, true);
			var width = app.activeDocument.width.as("px") * scaleImage;
			var height = app.activeDocument.height.as("px") * scaleImage;
			y -= height;
			// Save image.
             var ln = layerName[i].replace("_png",".png");
             ln = ln.replace("_jpg",".jpg");
			if (savePNGs && ( ln.indexOf(".png") != -1 || ln.indexOf(".jpg") != -1 )) {
                  	if (scaleImage != 1) scaleImages();
                  	var file;
				  	var file_ui;

                    var option = new ExportOptionsSaveForWeb();
                    var isCreate = false;
                    //设置图片输出的色彩范围为256色。
                    option.colors = 256;
                    option.quality = 100;

                 	if(ln.indexOf (".png") != -1 || ln.indexOf (".jpg") != -1){
						file_ui = File(res_ui + name +"/" + ln );
                        
						if(file_ui.exists) file_ui.remove();
						if( ln.indexOf(".png") != -1 ){
							option.format = SaveDocumentType.PNG;
						}else{
							option.format = SaveDocumentType.JPEG;	
						}
                        
                        option.PNG8 = false;
    					option.interlaced = false;
                        //设置图片输出时支持透明度。
                        option.transparency = true;
						app.activeDocument.exportDocument (file_ui, ExportType.SAVEFORWEB, option)
                  	}    
                 	if (scaleImage != 1) stepHistoryBack();
			}
			if (!layer.isBackgroundLayer) {
                //if(width != stageWidth || height != stageHeight){
				var arr = layer.bounds;
				if(arr[2] != 0 && arr[3] != 0){
					stepHistoryBack();
					stepHistoryBack();
				}
                //}
			}
			layer.visible = false;
			var mid = stageWidth * 0.5;//水瓶中间点
			var hx = x + width * 0.5 -mid;//计算相对于中间的数值
           if( ln.indexOf(".png") != -1 ){
           			if(useHorizontalCenterAndTop){
           				exml += '\n     <e:Image source=\"' + layerName[i] +'\" horizontalCenter=\"'+ hx.toFixed(0) +'\" top=\"'+ y.toFixed(0) +'\"/>'
           			}else{
           				exml += '\n     <e:Image source=\"' + layerName[i] +'\" x=\"'+ x.toFixed(0) +'\" y=\"'+ y.toFixed(0) +'\"/>'
           			}

           }else if( ln.indexOf(".jpg") != -1  ){
           			if(useHorizontalCenterAndTop){
           				exml += '\n     <e:Image source=\"' + layerName[i] +'\" horizontalCenter=\"'+ hx.toFixed(0) +'\" top=\"'+ y.toFixed(0) +'\"/>'
           			}else{
           				exml += '\n     <e:Image source=\"' + layerName[i] +'\" x=\"'+ x.toFixed(0) +'\" y=\"'+ y.toFixed(0) +'\"/>'
           			}

           }

		}


		exml += "\n</e:Skin>"
		if (saveEXML) {
			var file = new File(skinDir + name + ".exml");
			file.remove();
			file.open("a");
			file.lineFeed = "\n";
            file.encoding="utf-8";
			file.write(exml);
			file.close();
		}
	}

	activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

function getLayerVisible(layer){
        var bool = layer.visible;
        var obj = layer;
        while(obj.parent && obj.parent.hasOwnProperty ("visible")){
            if(obj.parent.visible == false){
                bool = false;
            }
            obj = obj.parent;
         }
    return bool;
}

function hasLayerSets (layerset) {
	layerset = layerset.layerSets;
	for (var i = 0; i < layerset.length; i++)
		if (layerset[i].layerSets.length > 0) hasLayerSets(layerset[i]);
}

function scaleImages() {
	var imageSize = app.activeDocument.width.as("px");
	app.activeDocument.resizeImage(UnitValue(imageSize * scaleImage, "px"), undefined, 72, ResampleMethod.BICUBICSHARPER);
}

function stepHistoryBack () {
	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	reference.putEnumerated( charIDToTypeID( "HstS" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Prvs" ));
	descriptor.putReference(charIDToTypeID( "null" ), reference);
	executeAction( charIDToTypeID( "slct" ), descriptor, DialogModes.NO );
}

function getLayers (layer, collect) {
	if (!layer.layers || layer.layers.length == 0) return layer;
	for (var i = 0, n = layer.layers.length; i < n; i++) {
		var child = getLayers(layer.layers[i], collect)
		if (child) collect.push(child);
	}
}

function trim (value) {
	return value.replace(/(\s)|(\.)|(\/)|(\\)|(\*)|(\:)|(\?)|(\")|(\<)|(\>)|(\|)/g, "_");
}

function hasFilePath() {
	var reference = new ActionReference();
	reference.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
	return executeActionGet(reference).hasKey(stringIDToTypeID('fileReference'));
}
