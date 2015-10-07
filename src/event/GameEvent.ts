/**
 * Created by Administrator on 2015/9/28.
 */
class GameEvent extends egret.Event{
    public static LAUNCH:string = "launch";

    public static LOAD_PROGRESS:string = "load_progress";
    public static LOAD_COMPETE:string = "load_complete";

    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false,data?:any){
        super(type,bubbles,cancelable,data);
    }
}