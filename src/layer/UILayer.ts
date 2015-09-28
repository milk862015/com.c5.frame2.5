/**
 * Created by Administrator on 2015/9/28.
 */
class  UILayer extends eui.Group{
    static CHANGE_TIME:number = 500;//单位:毫秒

    private curShow:egret.DisplayObjectContainer;
    private lastShow:egret.DisplayObjectContainer;

    private curClass:any;
    constructor(){
        super();
        this.initialize();
    }

    private initialize():void{
    }

    public Show(classFactory:any,mode?:number):void{
        if( mode === void 0 ){mode = 1}
        if( this.curClass == classFactory ){
            return;
        }
        if( this.curShow ){
            this.lastShow = this.curShow;
        }
        this.curClass = classFactory;
        if(classFactory != null ){
            this.curShow = new classFactory();
        }

        if( this.curShow ){
            switch(mode){
                case 1:
                    this.addChild(this.curShow);
                    break;
                default:
                    this.addChildAt(this.curShow,this.numChildren - 1);
                    break;
            }
        }

        if( this.lastShow ){
            switch(mode){
                case 1:
                    break;
                default :
                    break;
            }
        }else{
            this.Close();
        }
    }

    private Close():void{
        
    }
}