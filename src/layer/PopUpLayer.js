var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopUpLayer = (function (_super) {
    __extends(PopUpLayer, _super);
    function PopUpLayer() {
        var _this = _super.call(this) || this;
        _this.initialize();
        return _this;
    }
    PopUpLayer.prototype.initialize = function () {
        this.pLst = [];
    };
    PopUpLayer.prototype.AddPopUp = function (classFactory, effect, alpha, params) {
        if (effect === void 0) {
            effect = 1;
        }
        if (alpha == void 0) {
            alpha = PopUpLayer.ModalAlpha;
        }
        var cName = egret.getQualifiedClassName(classFactory);
        for (var i in this.pLst) {
            var ta = this.pLst[i];
            var taName = egret.getQualifiedClassName(ta.GetChild());
            if (taName == cName) {
                return false;
            }
        }
        var className = egret.getQualifiedClassName(classFactory);
        if (typeof className != "string") {
            return false;
        }
        if (RES.getGroupByName(className).length > 0 && RES.isGroupLoaded(className) == false) {
            PopUpLayer.ReadyClassName = className;
            PopUpLayer.ReadyParams = params;
            gr.addEventListener(GameEvent.LOAD_COMPETE, this.onLoadCompleteHandler, this);
            gr.addEventListener(GameEvent.LOAD_PROGRESS, this.onProgressHandler, this);
            PopUpLayer.ReadyClassFactory = classFactory;
            PopUpLayer.ReadyAlpha = alpha;
            PopUpLayer.ReadyEffect = effect;
            LoadManage.StartLoad([className], null);
            Core.LoadLayer.ShowMinLoading();
            return false;
        }
        else {
            this.startClear();
            return this.showPopUp(classFactory, effect, alpha, params);
        }
    };
    PopUpLayer.prototype.onLoadCompleteHandler = function (e) {
        this.startClear();
    };
    PopUpLayer.prototype.onProgressHandler = function (e) {
        var data = e.data;
        if (data["groupName"] != void 0 && data["groupName"] == PopUpLayer.ReadyClassName) {
            this.startClear();
        }
    };
    PopUpLayer.prototype.startClear = function () {
        gr.removeEventListener(GameEvent.LOAD_COMPETE, this.onLoadCompleteHandler, this);
        gr.removeEventListener(GameEvent.LOAD_PROGRESS, this.onProgressHandler, this);
        egret.Tween.get(this).wait(200).call(this.startShow, this);
    };
    PopUpLayer.prototype.startShow = function () {
        if (PopUpLayer.ReadyClassFactory) {
            this.showPopUp(PopUpLayer.ReadyClassFactory, PopUpLayer.ReadyEffect, PopUpLayer.ReadyAlpha, PopUpLayer.ReadyParams);
        }
        Core.LoadLayer.CloseMinLoading();
        PopUpLayer.ReadyClassFactory = null;
        PopUpLayer.ReadyEffect = 0;
        PopUpLayer.ReadyAlpha = 0;
        PopUpLayer.ReadyClassName = null;
        PopUpLayer.ReadyParams = null;
    };
    PopUpLayer.prototype.showPopUp = function (classFactory, effect, alpha, params) {
        var pu = new PopUpUnit(alpha);
        var target;
        if (params == void 0) {
            target = new classFactory();
        }
        else {
            target = new classFactory(params);
        }
        target["anchorOffsetX"] = Core.Stage.stageWidth * 0.5;
        target["anchorOffsetY"] = Core.Stage.stageHeight * 0.5;
        target["x"] = Core.Stage.stageWidth * 0.5;
        target["y"] = Core.Stage.stageHeight * 0.5;
        pu.SetChild(target);
        this.pLst.push(pu);
        this.addChild(pu);
        if (effect == 1) {
            target["scaleX"] = 0;
            target["scaleY"] = 0;
            egret.Tween.get(target).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut).call(gr.EffectEnd, gr);
        }
        else {
            gr.EffectEnd();
        }
        return pu;
    };
    PopUpLayer.prototype.RemovePopUp = function (target, effect) {
        if (effect === void 0) {
            effect = true;
        }
        var pa;
        var index = -1;
        for (var i in this.pLst) {
            if (target.parent == this.pLst[i]) {
                index = parseInt(i);
                break;
            }
        }
        if (index != -1) {
            pa = this.pLst[index];
            this.pLst.splice(index, 1);
            if (effect) {
                egret.Tween.get(target).to({ scaleX: 0, scaleY: 0 }, 300).call(this.removeTarget, this, [pa]);
            }
            else {
                this.removeTarget(pa);
            }
        }
    };
    PopUpLayer.prototype.removeTarget = function (pa) {
        if (pa.parent) {
            pa.parent.removeChild(pa);
        }
    };
    PopUpLayer.prototype.CloseAll = function () {
        while (this.pLst.length > 0) {
            var pa = this.pLst.pop();
            this.removeTarget(pa);
        }
    };
    return PopUpLayer;
}(eui.Group));
PopUpLayer.ModalAlpha = 0.8;
