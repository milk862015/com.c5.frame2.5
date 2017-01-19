var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.apply(this, arguments) || this;
        _this.loadArr = [];
        return _this;
    }
    Main.prototype.createChildren = function () {
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        HttpNet.Initialize();
        _super.prototype.createChildren.call(this);
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(egret.Event.COMPLETE, this.onThemeComplete, this);
    };
    Main.prototype.onThemeComplete = function (e) {
        var theme = e.target;
        theme.removeEventListener(egret.Event.COMPLETE, this.onThemeComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    Main.prototype.startResize = function () {
        var windowScale = this.stage.stageHeight / this.stage.stageWidth;
        var div = document.getElementsByClassName("egret-player")[0];
        var data = div["dataset"];
        var baseScale = parseInt(data.contentHeight) / parseInt(data.contentWidth);
        if (windowScale < baseScale) {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            LayoutSys.InitFixedHeight();
        }
        else {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            LayoutSys.InitFixedWidth();
        }
        LayoutSys.Show();
    };
    Main.prototype.onConfigComplete = function (e) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("LoadViewSkin");
        if (typeof RES["configInstance"]["groupDic"] != "undefined") {
            this.loadArr = [];
            for (var key in RES["configInstance"]["groupDic"]) {
                if (key != "LoadViewSkin" && key != "music") {
                    this.loadArr.unshift(key);
                }
            }
        }
    };
    Main.prototype.onResourceProgress = function (e) {
    };
    Main.prototype.onResourceLoadComplete = function (e) {
        if (e.groupName == "LoadViewSkin") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
            gr.addEventListener(GameEvent.LOAD_GROUP_COMPLETE, this.onLoadGroupCompleteHandler, this);
            gr.addEventListener(GameEvent.LOAD_COMPETE, this.onLoadCompleteHandler, this);
            LoadManage.Initialize();
            LoadManage.StartLoad(this.loadArr, LoadViewSkin);
        }
    };
    Main.prototype.onLoadGroupCompleteHandler = function (e) {
    };
    Main.prototype.onLoadCompleteHandler = function (e) {
        this.startShow();
    };
    Main.prototype.startShow = function () {
        this.startResize();
        gr.removeEventListener(GameEvent.LOAD_PROGRESS, this.onLoadGroupCompleteHandler, this);
        gr.removeEventListener(GameEvent.LOAD_COMPETE, this.onLoadCompleteHandler, this);
        gr.addEventListener(GameEvent.START, this.onStartHandler, this);
        gb.IsGameReady = true;
        if (debug.IsDebug || gb.IsServiceReady) {
            gr.Start();
        }
    };
    Main.prototype.onStartHandler = function (e) {
        gr.removeEventListener(GameEvent.START, this.onStartHandler, this);
    };
    Main.prototype.createScene = function () {
        Core.Stage = this.stage;
        Core.GameLayer = new GameLayer();
        this.addChild(Core.GameLayer);
        Core.UILayer = new UILayer();
        this.addChild(Core.UILayer);
        Core.MusicLayer = new MusicLayer();
        this.addChild(Core.MusicLayer);
        Core.PopUpLayer = new PopUpLayer();
        this.addChild(Core.PopUpLayer);
        Core.LoadLayer = new LoadLayer();
        this.addChild(Core.LoadLayer);
        Core.AlertLayer = new AlertLayer();
        this.addChild(Core.AlertLayer);
        Core.UILayer.SetLoadView(LoadViewSkin);
        GameManage.Initialize();
    };
    return Main;
}(eui.UILayer));
