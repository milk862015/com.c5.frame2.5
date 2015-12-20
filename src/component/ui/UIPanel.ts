/**
 * Created by milk on 15/12/20.
 */
class UIPanel extends SkinPanel{
    private uiLst:any;
    constructor(){
        super();
    }

    protected partAdded(partName: string, instance: any): void{
        if( this.uiLst == void 0 ){ this.uiLst = {} }
        var ta:egret.DisplayObject = <egret.DisplayObject>instance;
        this.uiLst[partName] = ta;
    }

    protected onAdd():void{
        this.addHandler();
    }

    protected addHandler():void{
        for( var key in this.uiLst ){
            var handler:any = this["on_" + key + "_handler"];
            if( handler != void 0 ){
                this.registerListener(this.uiLst[key],egret.TouchEvent.TOUCH_TAP,handler,this);
            }
        }
    }
}