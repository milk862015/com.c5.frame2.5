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
        //初始化数据
    }
}