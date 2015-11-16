
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/socket/socket.js",
	"libs/modules/dragonbones/dragonbones.js",
	"libs/modules/tween/tween.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/component/ui/SkinPanel.js",
	"bin-debug/component/ui/LaunchSkin.js",
	"bin-debug/component/ui/LoadViewSkin.js",
	"bin-debug/event/GameEvent.js",
	"bin-debug/EXMLAnalyzer.js",
	"bin-debug/func/func.js",
	"bin-debug/global/Core.js",
	"bin-debug/global/GameData.js",
	"bin-debug/layer/GameLayer.js",
	"bin-debug/layer/MusicLayer.js",
	"bin-debug/layer/PopUpLayer.js",
	"bin-debug/layer/UILayer.js",
	"bin-debug/Main.js",
	"bin-debug/manage/DragonBonesManage.js",
	"bin-debug/manage/GameManage.js",
	"bin-debug/manage/LoadManage.js",
	"bin-debug/net/WSNet.js",
	"bin-debug/port/DataPort.js",
	"bin-debug/response/GameResponse.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/unit/PopUpUnit.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1008,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};