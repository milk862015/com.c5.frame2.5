var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable, data) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable, data) || this;
    }
    return GameEvent;
}(egret.Event));
GameEvent.DEBUG = "debug";
GameEvent.ALERT = "alert";
GameEvent.START = "start";
GameEvent.UPDATE_TIME = "update_time";
GameEvent.LOAD_PROGRESS = "load_progress";
GameEvent.LOAD_COMPETE = "load_complete";
GameEvent.LOAD_GROUP_COMPLETE = "load_group_complete";
GameEvent.EFFECT_END = "effect_end";
GameEvent.WX_READY = "wx_ready";
