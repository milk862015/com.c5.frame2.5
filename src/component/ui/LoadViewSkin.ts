/**
 * Created by Administrator on 2015/9/28.
 */
class LoadViewSkin extends SkinPanel{
    private loadProgress:eui.Label;
    constructor(){
        super();
    }

    protected onAdd():void{
        this.setProgress(0);
        this.registerListener(gr,GameEvent.LOAD_PROGRESS,this.onProgressHandler,this);
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

    public initialize():void{

    }

    public remove():void{

    }
}