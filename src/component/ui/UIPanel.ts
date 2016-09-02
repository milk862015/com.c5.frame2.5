/**
 * Created by milk on 15/12/20.
 */
class UIPanel extends SkinPanel{
    private uiLst:any;
    protected cLst:any;
    constructor(){
        super();
    }

    protected partAdded(partName: string, instance: any): void{
        if( this.uiLst == void 0 ){ this.uiLst = {} }
        if( this.cLst == void 0 ){this.cLst = {}}
        var ta:egret.DisplayObject = <egret.DisplayObject>instance;
        this.uiLst[partName] = ta;
    }
	
	protected initView():void{
	
	}

    protected configHandler():void{

    }

    protected initData():void{

    }

    protected updateView():void{

    }

    protected onAdd():void{
        this.initData();
		this.initView();
        this.configHandler();
        this.updateView();
        this.addHandler();
    }

    protected addHandler():void{
        for( var key in this.uiLst ){
            var handler:any = this.cLst[key];
            if( handler != void 0 ){
                this.registerListener(this.uiLst[key],egret.TouchEvent.TOUCH_TAP,handler,this);
            }
        }
    }

    protected onCloseHandler( e:egret.TouchEvent ):void{
        Core.PopUpLayer.RemovePopUp(this);
    }

    protected getUI(key:string):any{
        return this.uiLst[key];
    }
}