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
        var className:string =  classFactory["name"];
        if( typeof className != "string"){
            return;
        }

        if( window["skins"][className] == void 0){
            GameResponse.GetInstance().addEventListener(GameEvent.LOAD_COMPETE,this.onUILoadCompleteHandler,this);
            this.readyClassFactory = classFactory;
            this.readyMode = mode;
            LoadManage.GetInstance().StartLoad([className],this.loadView);
        }else{
            this.startShow(classFactory,mode);
        }
    }

    private onUILoadCompleteHandler(e:GameEvent):void{
        GameResponse.GetInstance().removeEventListener(GameEvent.LOAD_COMPETE,this.onUILoadCompleteHandler,this);
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