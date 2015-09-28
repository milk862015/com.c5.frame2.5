/**
 * Created by Administrator on 2015/9/28.
 */
class GameResponse extends egret.EventDispatcher{
    static instance:GameResponse;
    public constructor(){
        super();
        if( GameResponse.instance != null ){
            throw new TypeError("GameResponse Singleton already constrocted")
        }
        GameResponse.instance = this;
    }

    static GetInstance():GameResponse{
        if(GameResponse.instance == null){
            GameResponse.instance = new GameResponse()
        }
        return GameResponse.instance
    }

    private sendEvent(key:string,data?:any):void{
        var ge:GameEvent = new GameEvent(key,false,false,data);
        this.dispatchEvent(ge);
    }

    public LoadProgress(cur:number,total:number):void{
        var data:any = {};
        data.cur = cur;
        data.total = total;
        this.sendEvent(GameEvent.LOAD_PROGRESS,data);
    }

    public LoadComplete():void{
        this.sendEvent(GameEvent.LOAD_COMPETE);
    }

}