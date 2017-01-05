var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gr;
(function (gr) {
    function addEventListener(type, listener, thisObject, useCapture, priority) {
        instance.addEventListener(type, listener, thisObject, useCapture, priority);
    }
    gr.addEventListener = addEventListener;
    function removeEventListener(type, listener, thisObject, useCapture) {
        instance.removeEventListener(type, listener, thisObject, useCapture);
    }
    gr.removeEventListener = removeEventListener;
    function LoadProgress(cur, total, groupName) {
        var data = {};
        data.cur = cur;
        data.total = total;
        data.groupName = groupName;
        instance.sendEvent(GameEvent.LOAD_PROGRESS, data);
    }
    gr.LoadProgress = LoadProgress;
    function LoadGroupComplete(groupName) {
        instance.sendEvent(GameEvent.LOAD_GROUP_COMPLETE, groupName);
    }
    gr.LoadGroupComplete = LoadGroupComplete;
    function LoadComplete() {
        instance.sendEvent(GameEvent.LOAD_COMPETE);
    }
    gr.LoadComplete = LoadComplete;
    function EffectEnd() {
        instance.sendEvent(GameEvent.EFFECT_END);
    }
    gr.EffectEnd = EffectEnd;
    function WxReady() {
        instance.sendEvent(GameEvent.WX_READY);
    }
    gr.WxReady = WxReady;
    function Debug() {
        instance.sendEvent(GameEvent.DEBUG);
    }
    gr.Debug = Debug;
    function Start() {
        instance.sendEvent(GameEvent.START);
    }
    gr.Start = Start;
    function UpdateTime() {
        instance.sendEvent(GameEvent.UPDATE_TIME);
    }
    gr.UpdateTime = UpdateTime;
    var GameResponse = (function (_super) {
        __extends(GameResponse, _super);
        function GameResponse() {
            return _super.call(this) || this;
        }
        GameResponse.prototype.sendEvent = function (key, data) {
            var ge = new GameEvent(key, false, false, data);
            this.dispatchEvent(ge);
        };
        return GameResponse;
    }(egret.EventDispatcher));
    var instance = new GameResponse();
})(gr || (gr = {}));
