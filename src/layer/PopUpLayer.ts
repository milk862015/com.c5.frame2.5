/**
 * Created by Administrator on 2015/9/28.
 */
class PopUpLayer extends eui.Group{
    constructor(){
        super();
        this.initialize();
    }

    private initialize():void{

    }

    public addPopUp(value:egret.DisplayObjectContainer):void{
        this.addChild(value);
    }

    public removePopUp(value:egret.DisplayObjectContainer ):void{
        this.removeChild(value);
    }
}