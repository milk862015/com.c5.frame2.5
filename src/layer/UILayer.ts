/**
 * Created by Administrator on 2015/9/28.
 */
class  UILayer extends eui.Group{
    static CHANGE_TIME:number = 500;//单位:毫秒

    private curShow:egret.DisplayObjectContainer;
    private lastShow:egret.DisplayObjectContainer;

    private loadView:any;

    private readyClassFactory:any;
    private readyMode:number;

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

        if( window["skins"][className] == void 0){
            gr.addEventListener(GameEvent.LOAD_COMPETE,this.onUILoadCompleteHandler,this);
            this.readyClassFactory = classFactory;
            this.readyMode = mode;
            LoadManage.StartLoad([className],null);
            Core.LoadLayer.ShowMinLoading();
        }else{
            this.startShow(classFactory,mode);
        }
    }

    private onUILoadCompleteHandler(e:GameEvent):void{
        gr.removeEventListener(GameEvent.LOAD_COMPETE,this.onUILoadCompleteHandler,this);
        this.startShow(this.readyClassFactory,this.readyMode);
        this.readyClassFactory = null;
        this.readyMode = null;
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