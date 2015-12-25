/**
 * Created by milk on 15/12/20.
 */
class LoadMinViewSkin extends SkinPanel{
    static BASE_TEXT:string = "a";
    private loadProgress:eui.BitmapLabel;
    constructor(){
        super();
    }

    protected onAdd():void{
        this.registerListener(gr,GameEvent.LOAD_PROGRESS,this.onProgressHandler,this);
    }

    private onProgressHandler( e:GameEvent ):void{
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
        this.loadProgress.text = LoadMinViewSkin.BASE_TEXT + value.toString() + "%";
    }
}