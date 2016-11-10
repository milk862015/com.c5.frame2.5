/**
 * Created by milk on 2016/11/10.
 */
class AlertLayer extends eui.Group{
    constructor(){
        super();
        this.initialize();
    }

    private initialize():void{

    }

    public Show(content:string):void{
        var as:AlertSkin = new AlertSkin(content);
        this.addChild(as);
    }
}