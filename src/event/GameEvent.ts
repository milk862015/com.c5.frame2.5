/**
 * Created by Administrator on 2015/9/28.
 */
class GameEvent extends egret.Event {
    static DEBUG: string = "debug";

    static ALERT: string = "alert";

    //-------这里自动添加代码分割线-------

    static START: string = "start";

    static UPDATE_TIME: string = "update_time";

    static LOAD_PROGRESS: string = "load_progress";
    static LOAD_COMPETE: string = "load_complete";
    static LOAD_GROUP_COMPLETE: string = "load_group_complete";

    static EFFECT_END: string = "effect_end";

    static WX_READY: string = "wx_ready";

    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, data?: any) {
        super(type, bubbles, cancelable, data);
    }
}
