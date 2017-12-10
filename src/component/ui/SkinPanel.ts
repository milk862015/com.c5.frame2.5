/**
 * Created by milk on 15/9/30.
 */
class SkinPanel extends eui.Panel {
    private listenerLst: ListenerData[] = [];
    constructor() {
        super();
        if (typeof this["__class__"] == "string") {
            var path: string = "skins." + this["__class__"];
            this.skinName = path;
            //this.skinName = EXML.parse()
        }
        this.initialize();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
    }

    public registerListener(listenerTarget: any, eventType: string, func: Function, target: any): void {
        listenerTarget.addEventListener(eventType, func, target);
        var ld: ListenerData = <ListenerData>{};
        ld.listenerTarget = listenerTarget;
        ld.eventType = eventType;
        ld.func = func;
        ld.target = target;
        this.listenerLst.push(ld);
    }

    public clearListener(listenerTarget: any, eventType: string, func: Function, target: any): void {
        listenerTarget.removeEventListener(eventType, func, target);
        var ld: ListenerData = <ListenerData>{};
        ld.listenerTarget = listenerTarget;
        ld.eventType = eventType;
        ld.func = func;
        ld.target = target;
        var index: number = this.listenerLst.indexOf(ld);
        if (index != -1) {
            this.listenerLst.splice(index, 1);
        }
    }

    public onAddToStageHandler(e: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
        this.registerListener(Core.Stage, egret.Event.RESIZE, this.onResizeHandler, this);
        this.onResizeHandler(null);
        this.onAdd();
    }

    private onResizeHandler(e: egret.Event): void {

    }

    protected onAdd(): void {

    }

    protected onRemove(): void {

    }

    public onRemoveFromStageHandler(e: egret.Event): void {
        var count: number = this.listenerLst.length;
        for (var i: number = 0; i < count; i++) {
            var ld: ListenerData = this.listenerLst[i];
            ld.listenerTarget.removeEventListener(ld.eventType, ld.func, ld.target);
        }

        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
        this.onRemove();
    }

    public initialize(): void {

    }

}