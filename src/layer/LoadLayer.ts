/**
 * Created by milk on 15/12/20.
 */
class LoadLayer extends eui.Group{
    static ModalAlpha:number = 0.8;
    private curClass:any;

    private popUpUnit:PopUpUnit;
    private minView:LoadMinViewSkin;
    constructor(){
        super();
        this.initialize();
    }

    private initialize():void{

    }

    public ShowLoadView(classFactory:any,alpha?:number):any{
        var target:any;
        if( alpha == void 0 ){ alpha = PopUpLayer.ModalAlpha }
        if( this.curClass != classFactory ){
            var pu:PopUpUnit = new PopUpUnit();
            target = new classFactory();
            target["anchorOffsetX"] = Core.Stage.stageWidth * 0.5;
            target["anchorOffsetY"] = Core.Stage.stageHeight * 0.5;
            target["x"] = Core.Stage.stageWidth * 0.5;
            target["y"] = Core.Stage.stageHeight * 0.5;
            pu.SetChild(target);
            this.addChild(pu);
            this.popUpUnit = pu;
        }
        return target;
    }

    public RemoveLoadView():void{
        if( this.popUpUnit){
            if( this.popUpUnit.parent != null ){
                this.popUpUnit.parent.removeChild(this.popUpUnit);
            }
            this.popUpUnit = null;
        }
    }

    public ShowMinLoading():void{
        if( this.minView == null ){
            this.minView = new LoadMinViewSkin();
            this.addChild(this.minView);
            this.minView.touchChildren = false;
            this.minView.touchEnabled = false;
            this.minView.alpha = 0;
            egret.Tween.get(this.minView).to({alpha:1},500);
        }
    }

    public CloseMinLoading():void{
        if( this.minView ){
            egret.Tween.removeTweens(this.minView);
            if( this.minView.parent != null ){
                this.minView.parent.removeChild(this.minView);
            }
            this.minView = null;
        }
    }
}