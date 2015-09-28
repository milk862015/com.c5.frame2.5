/**
 * Created by Administrator on 2015/9/28.
 */
class LoadViewSkin extends eui.Panel{
    static SKIN_NAME:string = "skins.LoadViewSkin";
    private loadProgress:eui.Label;
    constructor(){
        super();
        this.skinName = LoadViewSkin.SKIN_NAME;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStageHandler,this);
    }

    private onAddToStageHandler( e:egret.Event ):void{
        this.initialize();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStageHandler,this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
        GameResponse.GetInstance().addEventListener(GameEvent.LOAD_PROGRESS,this.onProgressHandler,this);
    }

    private onProgressHandler(e:GameEvent):void{
        var data:any = e.data;
        if( data ){
            var cur:number = data.cur;
            var total:number = data.total;
            var progress:number = Math.floor(cur/total*100);
            this.setProgress(progress);
        }
    }

    private setProgress(value:number):void{
        if( value < 0 ){
            value = 0;
        }else if( value > 100 ){
            value = 100;
        }
        this.loadProgress.text = value.toString() + "%";
    }

    private initialize():void{

    }

    private onRemoveFromStage( e:egret.Event ):void{
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
        GameResponse.GetInstance().removeEventListener(GameEvent.LOAD_PROGRESS,this.onProgressHandler,this);
    }
}