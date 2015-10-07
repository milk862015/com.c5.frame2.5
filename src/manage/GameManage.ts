class GameManage{
    static instance:GameManage;
    public IsStart:boolean = false;
    private _score:number = 0;//得分
    public constructor(){
        if( GameManage.instance != null ){
            throw new TypeError("GameManage Singleton already constructed")
        }
        GameManage.instance = this;
    }

    static GetInstance():GameManage{
        if(GameManage.instance == null){
            GameManage.instance = new GameManage()
        }
        return GameManage.instance;
    }

    public Init():void{
        this.register(GameEvent.LAUNCH,this.onLaunchHandler,this);
    }

    protected register( type:string,callback:Function,target:any ):void{
        GameResponse.GetInstance().addEventListener(type,callback,target);
    }

    private onLaunchHandler(e:GameEvent):void{
        Core.UILayer.Show(LaunchSkin);
    }
}