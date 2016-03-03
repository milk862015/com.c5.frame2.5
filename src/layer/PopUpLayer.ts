/**
 * Created by Administrator on 2015/9/28.
 */
class PopUpLayer extends eui.Group{
    static ModalAlpha:number = 0.8;

    static ReadyClassFactory:any;
    static ReadyAlpha:number;
    static ReadyClassName:string;
    static ReadyEffect:number;

    private pLst:PopUpUnit[];
    constructor(){
        super();
        this.initialize();
    }

    private initialize():void{
        this.pLst = [];
    }

    public AddPopUp(classFactory:any,effect?:number,alpha?:number):any{
        if( effect === void 0 ){effect = 1}
        if(alpha == void 0){alpha = PopUpLayer.ModalAlpha}

        //检查是否存在相同类型的弹窗
        var cName:string = egret.getQualifiedClassName(classFactory);
        for( var i in this.pLst ){
            var ta:any = this.pLst[i];
            var taName:string = egret.getQualifiedClassName(ta.GetChild());
            if( taName == cName ){
                return false;//存在相同立刻退出
            }
        }

        //检查资源是否加载了
        var className:string = egret.getQualifiedClassName(classFactory);
        if(typeof  className != "string"){
            return false;
        }

        if( RES.isGroupLoaded(className) == false){
            PopUpLayer.ReadyClassName = className;
            gr.addEventListener(GameEvent.LOAD_COMPETE,this.onLoadCompleteHandler,this);
            gr.addEventListener(GameEvent.LOAD_PROGRESS,this.onProgressHandler,this);

            PopUpLayer.ReadyClassFactory = classFactory;
            PopUpLayer.ReadyAlpha = alpha;
            PopUpLayer.ReadyEffect = effect;

            LoadManage.StartLoad([className],null);
            Core.LoadLayer.ShowMinLoading();
            return false
        }else{
            this.startClear();
            return this.showPopUp(classFactory,effect,alpha);
        }
    }

    private onLoadCompleteHandler(e:GameEvent):void{
        this.startClear();
    }

    private onProgressHandler(e:GameEvent):void{
        var data:any = e.data;
        if( data["groupName"] != void 0 && data["groupName"] == PopUpLayer.ReadyClassName ){
            this.startClear();
        }
    }

    private startClear():void{
        gr.removeEventListener(GameEvent.LOAD_COMPETE,this.onLoadCompleteHandler,this);
        gr.removeEventListener(GameEvent.LOAD_PROGRESS,this.onProgressHandler,this);
        egret.Tween.get(this).wait(200).call(this.startShow,this)
    }

    private startShow():void{
        if( PopUpLayer.ReadyClassFactory ){
            this.showPopUp(PopUpLayer.ReadyClassFactory,PopUpLayer.ReadyEffect,PopUpLayer.ReadyAlpha);
        }
        Core.LoadLayer.CloseMinLoading();

        PopUpLayer.ReadyClassFactory = null;
        PopUpLayer.ReadyEffect = 0;
        PopUpLayer.ReadyAlpha = 0;
        PopUpLayer.ReadyClassName = null;
    }

    private showPopUp(classFactory:any,effect:number,alpha:number):PopUpUnit{
        var pu:PopUpUnit = new PopUpUnit(alpha);
        var target:any = new classFactory();
        target["anchorOffsetX"] = Core.Stage.stageWidth * 0.5;
        target["anchorOffsetY"] = Core.Stage.stageHeight * 0.5;
        target["x"] = Core.Stage.stageWidth * 0.5;
        target["y"] = Core.Stage.stageHeight * 0.5;
        pu.SetChild(target);
        this.pLst.push(pu);
        this.addChild(pu);
        if( effect == 1 ){
            target["scaleX"] = 0;
            target["scaleY"] = 0;
            egret.Tween.get(target).to({scaleX:1,scaleY:1},300,egret.Ease.backOut).call(gr.EffectEnd,gr);
        }else{
            gr.EffectEnd();
        }
        return pu;
    }

    public RemovePopUp(target:egret.DisplayObject,effect?:boolean ):void{
        if( effect === void 0 ){effect = true}
        var pa:PopUpUnit;
        var index:number = -1;
        for( var i in this.pLst ){
            if(target.parent == this.pLst[i]){
                index = parseInt(i);
                break;
            }
        }
        if( index != -1 ){
            pa = this.pLst[index];
            this.pLst.splice(index,1);
            if( effect ){
                egret.Tween.get(target).to({scaleX:0,scaleY:0},300).call(this.removeTarget,this,[pa]);
            }else{
                this.removeTarget(pa);
            }
        }
    }

    private removeTarget( pa:PopUpUnit ):void{
        if( pa.parent ){
            pa.parent.removeChild(pa);
        }
    }

    public CloseAll():void{
        while(this.pLst.length > 0){
            var pa:PopUpUnit =this.pLst.pop();
            this.removeTarget(pa);
        }
    }
}