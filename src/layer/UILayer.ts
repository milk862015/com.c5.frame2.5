/**
 * Created by Administrator on 2015/9/28.
 */
class  UILayer extends eui.Group{
    static CHANGE_TIME:number = 500;//单位:毫秒

    private curShow:egret.DisplayObjectContainer;
    private lastShow:egret.DisplayObjectContainer;

    private loadView:any;

    static ReadyClassFactory:any;
    static ReadyMode:number;
    static ReadyClassName:string;

    private curClass:any;
    constructor(){
        super();
        this.initialize();
    }

    private initialize():void{
    }

    public SetLoadView(value:any):void{
        this.loadView = value;
    }


    public Show(classFactory:any,mode?:number):void{
        if( mode === void 0 ){mode = 1}
        if( this.curClass == classFactory ){
            return;
        }

        //检查资源是否加载了
        var className:string = egret.getQualifiedClassName(classFactory);
        if( typeof className != "string"){
            return;
        }

        if( RES.isGroupLoaded(className) == false){
            gr.addEventListener(GameEvent.LOAD_COMPETE,this.onUILoadCompleteHandler,this);
            gr.addEventListener(GameEvent.LOAD_GROUP_COMPLETE,this.onUILoadGroupCompleteHandler,this);
            UILayer.ReadyClassFactory = classFactory;
            UILayer.ReadyMode = mode;
            UILayer.ReadyClassName = className;
            LoadManage.StartLoad([className],null);
            Core.LoadLayer.ShowMinLoading();
        }else{
            this.startClear();
            this.startShow(classFactory,mode);
        }
    }

    private onUILoadGroupCompleteHandler(e:GameEvent):void{
        var groupName:string = <string>e.data;
        if(groupName != void 0 && groupName == UILayer.ReadyClassName ){
            this.startClear();
        }
    }

    private onUILoadCompleteHandler(e:GameEvent):void{
        this.startClear();
    }

    private startClear():void{
        if( UILayer.ReadyClassFactory ){
            this.startShow(UILayer.ReadyClassFactory,UILayer.ReadyMode);
        }

        Core.LoadLayer.CloseMinLoading();
        gr.removeEventListener(GameEvent.LOAD_GROUP_COMPLETE,this.onUILoadGroupCompleteHandler,this);
        gr.removeEventListener(GameEvent.LOAD_COMPETE,this.onUILoadCompleteHandler,this);
        UILayer.ReadyClassFactory = null;
        UILayer.ReadyMode = null;
        UILayer.ReadyClassName = null;
    }


    private startShow(classFactory:any,mode:number):void{
        if( this.curShow ){
            this.lastShow = this.curShow;
        }
        this.curClass = classFactory;
        if(classFactory != null ){
            this.curShow = new classFactory();
        }


        if( this.curShow ){//判断加载在哪层
            switch(mode){
                case 0:
                case 1:
                case 2:
                    this.addChild(this.curShow);
                    break;
                case 3:
                    this.addChildAt(this.curShow,this.numChildren - 1);
                    break;
            }
        }

        if( this.lastShow ){
            switch(mode){
                case 1:
                    this.curShow.alpha = 0;
                    egret.Tween.get(this.curShow).to({alpha:1},UILayer.CHANGE_TIME).call(this.Close,this).call(gr.EffectEnd,gr);
                    egret.Tween.get(this.lastShow).to({alpha:0},UILayer.CHANGE_TIME);
                    break;
                case 2:
                    this.curShow.y = Core.Stage.height;
                    egret.Tween.get(this.curShow).to({y:0},UILayer.CHANGE_TIME).call(this.Close,this).call(gr.EffectEnd,gr);
                    break;
                case 3:
                    egret.Tween.get(this.lastShow).to({y:Core.Stage.height},UILayer.CHANGE_TIME).call(this.Close,this).call(gr.EffectEnd,gr);
                    break;
                default :
                    this.Close();
                    gr.EffectEnd();
                    break;
            }
        }else{
            this.Close();
            gr.EffectEnd();
        }
    }

    private Close():void{
        if(this.lastShow  && this.lastShow.parent){
            this.lastShow.parent.removeChild(this.lastShow);
            this.lastShow = null;
        }
    }
}