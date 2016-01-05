/**
 * Created by Administrator on 2015/9/28.
 */
class GameEvent extends egret.Event{
    static LAUNCH:string = "launch";

    static LOAD_PROGRESS:string = "load_progress";
    static LOAD_COMPETE:string = "load_complete";
    static LOAD_GROUP_COMPLETE:string = "load_group_complete";

    static EFFECT_END:string = "effect_end";

    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false,data?:any){
        super(type,bubbles,cancelable,data);
    }
}