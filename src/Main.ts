class Main extends eui.UILayer {
    private loadArr:string[] = [];
    protected createChildren(): void {
        //注入自定义的素材解释器
        this.stage.registerImplementation("eui.IAssetAdapter",new AssetAdapter());
        HttpNet.Initialize();
        super.createChildren();
        //var theme = new eui.Theme("resource/default.thm.json", this.stage);
        RES.registerAnalyzer("exml",EXMLAnalyzer);
        //RES.registerAnalyzer("xml",RES.XMLAnalyzer);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }

    private onConfigComplete( e:RES.ResourceEvent ):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("LoadViewSkin");

        if( typeof RES["configInstance"]["groupDic"] != "undefined" ){
            this.loadArr = [];
            for( var key in RES["configInstance"]["groupDic"] ){
                if( key != "loadRes" ){
                    this.loadArr.unshift(key);
                }
            }
        }
    }

    private onResourceProgress(e:RES.ResourceEvent):void{

    }

    private onResourceLoadComplete( e:RES.ResourceEvent ):void{
        if( e.groupName == "LoadViewSkin" ){
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            this.createScene();
            gr.addEventListener(GameEvent.LOAD_GROUP_COMPLETE,this.onLoadGroupCompleteHandler,this);
            gr.addEventListener(GameEvent.LOAD_COMPETE,this.onLoadCompleteHandler,this);
            LoadManage.Initialize();
            LoadManage.StartLoad(this.loadArr,null);
        }
    }

    private onLoadGroupCompleteHandler(e:GameEvent):void{
        // var groupName:string = <string>e.data;
        // if( groupName == "LaunchSkin" ){
        //     this.startShow();
        // }
    }

    private onLoadCompleteHandler(e:GameEvent):void{
        this.startShow();
    }

    private startShow():void{
        gr.removeEventListener(GameEvent.LOAD_PROGRESS,this.onLoadGroupCompleteHandler,this);
        gr.removeEventListener(GameEvent.LOAD_COMPETE,this.onLoadCompleteHandler,this);
        //DragonBonesManage.Initialize();
        gr.Launch();
    }

    private createScene():void{
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


        Core.UILayer.SetLoadView(LoadViewSkin);

        GameManage.Initialize();

    }
}

