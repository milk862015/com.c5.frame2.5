class Main extends eui.UILayer {
    private loadArr:string[] = [];
    protected createChildren(): void {
        //注入自定义的素材解释器
        this.stage.registerImplementation("eui.IAssetAdapter",new AssetAdapter());

        super.createChildren();
        //var theme = new eui.Theme("resource/default.thm.json", this.stage);
        RES.registerAnalyzer("exml",EXMLAnalyzer);
        //RES.registerAnalyzer("xml",RES.XMLAnalyzer);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/")
    }

    private onConfigComplete( e:RES.ResourceEvent ):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("loadRes");
    }

    private onResourceProgress(e:RES.ResourceEvent):void{

    }

    private onResourceLoadComplete( e:RES.ResourceEvent ):void{
        if( e.groupName == "loadRes" ){
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            this.createScene();
            GameResponse.GetInstance().addEventListener(GameEvent.LOAD_COMPETE,this.onLoadCompleteHandler,this);
            LoadManage.GetInstance().Init();
            LoadManage.GetInstance().StartLoad(this.loadArr,LoadViewSkin);
        }
    }

    private onLoadCompleteHandler(e:GameEvent):void{
        GameResponse.GetInstance().removeEventListener(GameEvent.LOAD_COMPETE,this.onLoadCompleteHandler,this);
        //GameResponse.GetInstance().Launch();
    }

    private createScene():void{
        //初始化层
        Core.Stage = this.stage;

        Core.GameLayer = new GameLayer();
        this.addChild(Core.GameLayer);

        Core.UILayer = new UILayer();
        this.addChild(Core.UILayer);

        Core.PopUpLayer = new PopUpLayer();
        this.addChild(Core.PopUpLayer);

        Core.UILayer.SetLoadView(LoadViewSkin);

        GameManage.GetInstance().Init();
    }
}

