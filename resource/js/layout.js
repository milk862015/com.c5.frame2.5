LayoutSys = {};
LayoutSys.scale = 0;
LayoutSys.scaleX = 0;
LayoutSys.scaleY = 0;
LayoutSys.IsFirstShow = true;

LayoutSys.imgInfo = {
    "ew":{"width":264,"height":264,"left":45,"top":372},
    "big_ew":{"width":264,"height":264,"left":45,"top":372},
    "shengSelect":{"width":111,"height":191,"left":183,"top":241,"opacity":0},
    "shiSelect":{"width":111,"height":191,"left":331,"top":241,"opacity":0},
    "quSelect":{"width":111,"height":191,"left":476,"top":241,"opacity":0}
};

LayoutSys.Show = function(){
    var imgLst = ["ew","big_ew"];
    var div = document.getElementById("StageDelegateDiv");
    var dd = document.createElement("div");
    dd.style.position = "absolute";
    //dd.style.zIndex = 100;
    div.appendChild(dd);
    for( var i in imgLst ){
        var id = imgLst[i];
        var img = new Image();
        img.id = id;
        img.style.display = "none";
        img.style.position = "absolute";
        if( id == "ew" ){
            // img.src = "resource/ui/EWSkin/ew.png";
        }else if( id == "big_ew" ){
            // img.src = "resource/ui/SureSkin/sure_ew.png";
            // img.src = "";
        }
        div.appendChild(img);
    }

    LayoutSys.createSelect(dd);

    for(var key in LayoutSys.imgInfo){
        var tg = document.getElementById(key);
        for( var pr in LayoutSys.imgInfo[key] ){
            LayoutSys.setStyleAuto(tg,pr,LayoutSys.imgInfo[key][pr]);
        }
    }


};

LayoutSys.createSelect = function(div){
    //选择项目
    var selectLst = ["shengSelect","shiSelect","quSelect"];

    for( var j in selectLst ){
        var key = selectLst[j];
        var select = document.createElement("select");
        select.style.position = "absolute";
        select.style.display = "none";
        select.id = key;
        div.appendChild(select);
    }
};

LayoutSys.InitFixedHeight = function(){
    LayoutSys.curClientWidth = document.documentElement.offsetWidth;
    LayoutSys.curClinetHeight = document.documentElement.offsetHeight;

    LayoutSys.canvas = document.getElementsByTagName("canvas")[0];
    var div = LayoutSys.canvas.parentElement;
    var screenH = parseInt(div.dataset.contentHeight)
    LayoutSys.scaleY = LayoutSys.canvas.offsetHeight/screenH;
    LayoutSys.scaleX = LayoutSys.scaleY;
};

LayoutSys.InitFixedWidth = function(){
    LayoutSys.curClientWidth = document.documentElement.offsetWidth;
    LayoutSys.curClinetHeight = document.documentElement.offsetHeight;

    LayoutSys.canvas = document.getElementsByTagName("canvas")[0];
    var div = LayoutSys.canvas.parentElement;
    var screenW = parseInt(div.dataset.contentWidth)

    LayoutSys.scaleX = LayoutSys.canvas.offsetWidth/screenW;
    LayoutSys.scaleY = LayoutSys.scaleX;
};


// mode w
LayoutSys.setStyleAuto = function( target,pr,baseValue,mode ){
    var value;
    if(mode == "w"){
        value = LayoutSys.getCurW(baseValue);
    }else if( pr == "left" || pr == "width" ){
        value = LayoutSys.scaleX * baseValue;
    }else if( pr == "top" || pr == "height" ) {
        value = LayoutSys.scaleY * baseValue;
    }else{
        value = LayoutSys.getCurH(baseValue);
    }

    LayoutSys.setStyle(target,pr,value);
};

LayoutSys.hideGame = function(){
    var gameDiv = document.getElementById('gameDiv');
    gameDiv.style.display = 'none';

    var inputDiv = document.getElementById('register');
    inputDiv.style.display = 'block';
};

LayoutSys.showGame = function(){
    var gameDiv = document.getElementById('gameDiv');
    gameDiv.style.display = 'block';

    var inputDiv = document.getElementById('register');
    inputDiv.style.display = 'none';
};

LayoutSys.getCurH = function(base){
    return LayoutSys.scale * base;
};

LayoutSys.getCurW = function(base){
    return LayoutSys.scale * base;
};

LayoutSys.setStyle = function( target,pr,value ){
    var v;
    if( pr == "opacity" ){
        v = value;
    }else{
        v = value + "px";
    }
    target.style[pr] = v;
};

LayoutSys.ShowEW = function(x,y,w,h){
    var img = document.getElementById("ew");
    if( typeof img != void 0 ){
        if( typeof x != void 0){
            LayoutSys.setStyleAuto(img,"left",x);
            LayoutSys.setStyleAuto(img,"top",y);
            LayoutSys.setStyleAuto(img,"width",w);
            LayoutSys.setStyleAuto(img,"height",h);
        }

        //img.src = "resource/ui/ew.png";
        img.style.display = "block";
        // img.style.opacity = 0;
    }
};

LayoutSys.OnlyShowEW = function(){
    var img = document.getElementById("ew");
    if( img != void 0 ){
        img.style.display = "block";
    }
};

LayoutSys.CloseEW = function(){
    var img = document.getElementById("ew");
    if( img != void 0){
        img.style.display = "none";
    }
};

LayoutSys.ShowBigEW = function(x,y,w,h){
    var img = document.getElementById("big_ew");
    if( typeof img != void 0 ){
        if( typeof x != void 0){
            LayoutSys.setStyleAuto(img,"left",x);
            LayoutSys.setStyleAuto(img,"top",y);
            LayoutSys.setStyleAuto(img,"width",w);
            LayoutSys.setStyleAuto(img,"height",h);
        }

        //img.src = "resource/ui/ew.png";
        img.style.display = "block";
        // img.style.opacity = 0;
    }
};

LayoutSys.CloseBigEW = function(){
    var img = document.getElementById("big_ew");
    if( img != void 0){
        img.style.display = "none";
    }
};
