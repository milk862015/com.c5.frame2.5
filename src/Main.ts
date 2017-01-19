class Main extends eui.UILayer {
    private loadArr: string[] = [];
    protected createChildren(): void {
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        HttpNet.Initialize();
        super.createChildren();
        var theme: eui.Theme = new eui.Theme("resource/default.thm.json", this.stage);
        // RES.registerAnalyzer("exml", EXMLAnalyzer);
        //RES.registerAnalyzer("xml",RES.XMLAnalyzer);
        theme.addEventListener(egret.Event.COMPLETE, this.onThemeComplete, this);
    }

    private onThemeComplete(e: egret.Event): void {
        var theme: eui.Theme = <eui.Theme>e.target;
        theme.removeEventListener(egret.Event.COMPLETE, this.onThemeComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private startResize(): void {
        // var windowScale:number = window.screen.height/window.screen.width;
        var windowScale: number = this.stage.stageHeight / this.stage.stageWidth;

        var div = document.getElementsByClassName("egret-player")[0];
        var data = div["dataset"];
        var baseScale: number = parseInt(data.contentHeight) / parseInt(data.contentWidth);
        if (windowScale < baseScale) {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            LayoutSys.InitFixedHeight();
        } else {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            LayoutSys.InitFixedWidth();
        }
        LayoutSys.Show();
    }

    private onConfigComplete(e: RES.ResourceEvent): void {
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
    }

    private onResourceProgress(e: RES.ResourceEvent): void {

    }

    private onResourceLoadComplete(e: RES.ResourceEvent): void {
        if (e.groupName == "LoadViewSkin") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
            gr.addEventListener(GameEvent.LOAD_GROUP_COMPLETE, this.onLoadGroupCompleteHandler, this);
            gr.addEventListener(GameEvent.LOAD_COMPETE, this.onLoadCompleteHandler, this);
            LoadManage.Initialize();
            LoadManage.StartLoad(this.loadArr, LoadViewSkin);
        }
    }

    private onLoadGroupCompleteHandler(e: GameEvent): void {
        // var groupName:string = <string>e.data;
        // if( groupName == "LaunchSkin" ){
        //     this.startShow();
        // }
    }

    private onLoadCompleteHandler(e: GameEvent): void {
        this.startShow();
    }

    private startShow(): void {
        this.startResize();
        gr.removeEventListener(GameEvent.LOAD_PROGRESS, this.onLoadGroupCompleteHandler, this);
        gr.removeEventListener(GameEvent.LOAD_COMPETE, this.onLoadCompleteHandler, this);
        //DragonBonesManage.Initialize();
        gr.addEventListener(GameEvent.START, this.onStartHandler, this);
        gb.IsGameReady = true;
        if (debug.IsDebug || gb.IsServiceReady) {
            gr.Start();
        }
    }

    protected onStartHandler(e: GameEvent): void {
        gr.removeEventListener(GameEvent.START, this.onStartHandler, this);
        // gr.Launch();
    }

    private createScene(): void {
        //初始化层
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

    }
}
