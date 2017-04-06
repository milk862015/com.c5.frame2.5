var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UILayer = (function (_super) {
    __extends(UILayer, _super);
    function UILayer() {
        var _this = _super.call(this) || this;
        _this.initialize();
        return _this;
    }
    UILayer.prototype.initialize = function () {
    };
    UILayer.prototype.SetLoadView = function (value) {
        this.loadView = value;
    };
    UILayer.prototype.Show = function (classFactory, mode, params) {
        if (mode === void 0) {
            mode = 1;
        }
        if (this.curClass == classFactory) {
            return;
        }
        var className = egret.getQualifiedClassName(classFactory);
        if (typeof className != "string") {
            return;
        }
        if (RES.getGroupByName(className).length > 0 && RES.isGroupLoaded(className) == false) {
            gr.addEventListener(GameEvent.LOAD_COMPETE, this.onUILoadCompleteHandler, this);
            gr.addEventListener(GameEvent.LOAD_GROUP_COMPLETE, this.onUILoadGroupCompleteHandler, this);
            UILayer.ReadyClassFactory = classFactory;
            UILayer.ReadyMode = mode;
            UILayer.ReadyClassName = className;
            UILayer.ReadyParams = params;
            LoadManage.StartLoad([className], null);
            Core.LoadLayer.ShowMinLoading();
        }
        else {
            this.startClear();
            this.startShow(classFactory, mode, params);
        }
    };
    UILayer.prototype.onUILoadGroupCompleteHandler = function (e) {
        var groupName = e.data;
        if (groupName != void 0 && groupName == UILayer.ReadyClassName) {
            this.startClear();
        }
    };
    UILayer.prototype.onUILoadCompleteHandler = function (e) {
        this.startClear();
    };
    UILayer.prototype.startClear = function () {
        if (UILayer.ReadyClassFactory) {
            this.startShow(UILayer.ReadyClassFactory, UILayer.ReadyMode, UILayer.ReadyParams);
        }
        Core.LoadLayer.CloseMinLoading();
        gr.removeEventListener(GameEvent.LOAD_GROUP_COMPLETE, this.onUILoadGroupCompleteHandler, this);
        gr.removeEventListener(GameEvent.LOAD_COMPETE, this.onUILoadCompleteHandler, this);
        UILayer.ReadyClassFactory = null;
        UILayer.ReadyMode = null;
        UILayer.ReadyClassName = null;
        UILayer.ReadyParams = null;
    };
    UILayer.prototype.startShow = function (classFactory, mode, params) {
        if (this.curShow) {
            this.lastShow = this.curShow;
        }
        this.curClass = classFactory;
        if (classFactory != null) {
            if (params == void 0) {
                this.curShow = new classFactory();
            }
            else {
                this.curShow = new classFactory(params);
            }
        }
        if (this.curShow) {
            switch (mode) {
                case 0:
                case 1:
                case 2:
                    this.addChild(this.curShow);
                    break;
                case 3:
                    this.addChildAt(this.curShow, this.numChildren - 1);
                    break;
            }
        }
        if (this.lastShow) {
            switch (mode) {
                case 1:
                    this.curShow.alpha = 0;
                    egret.Tween.get(this.curShow).to({ alpha: 1 }, UILayer.CHANGE_TIME).call(this.Close, this).call(gr.EffectEnd, gr);
                    egret.Tween.get(this.lastShow).to({ alpha: 0 }, UILayer.CHANGE_TIME);
                    break;
                case 2:
                    this.curShow.y = Core.Stage.height;
                    egret.Tween.get(this.curShow).to({ y: 0 }, UILayer.CHANGE_TIME).call(this.Close, this).call(gr.EffectEnd, gr);
                    break;
                case 3:
                    egret.Tween.get(this.lastShow).to({ y: Core.Stage.height }, UILayer.CHANGE_TIME).call(this.Close, this).call(gr.EffectEnd, gr);
                    break;
                default:
                    this.Close();
                    gr.EffectEnd();
                    break;
            }
        }
        else {
            this.Close();
            gr.EffectEnd();
        }
    };
    UILayer.prototype.Close = function () {
        if (this.lastShow && this.lastShow.parent) {
            this.lastShow.parent.removeChild(this.lastShow);
            this.lastShow = null;
        }
    };
    return UILayer;
}(eui.Group));
UILayer.CHANGE_TIME = 500;
