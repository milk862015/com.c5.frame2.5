/**
 * Created by Administrator on 2015/6/2.
 */
/**
 * Created by Administrator on 2015/5/12.
 */

LayoutSys = {};
LayoutSys.screenW = 750;
LayoutSys.screenH = 1208;
LayoutSys.scale = 0;
LayoutSys.scaleX = 0;
LayoutSys.scaleY = 0;
LayoutSys.IsFirstShow = true;

LayoutSys.imgInfo = {
    "ew":{"width":264,"height":264,"left":45,"top":372}
};

LayoutSys.Show = function(){
    var imgLst = ["ew"];
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
            img.src = "resource/ui/ew.png";
        }
        div.appendChild(img);
    }

    for(var key in LayoutSys.imgInfo){
        var tg = document.getElementById(key);
        for( var pr in LayoutSys.imgInfo[key] ){
            LayoutSys.setStyleAuto(tg,pr,LayoutSys.imgInfo[key][pr]);
        }
    }
};
LayoutSys.Init = function(){
    LayoutSys.curClientWidth = document.documentElement.offsetWidth;
    LayoutSys.curClinetHeight = document.documentElement.offsetHeight;

    LayoutSys.canvas = document.getElementsByTagName("canvas")[0];

    LayoutSys.scaleX = LayoutSys.canvas.offsetWidth/LayoutSys.screenW;
    LayoutSys.scaleY = LayoutSys.canvas.offsetHeight/LayoutSys.screenH;
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
    target.style[pr] = value + "px";
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
