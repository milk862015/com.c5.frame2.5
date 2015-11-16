/**
 * Created by Administrator on 2015/11/2.
 */
class MusicLayer extends eui.Group{
    static BG_WIDTH:number = 48;
    static BG_HEIGHT:number = 48;
    private btn:egret.Bitmap;
    private _isPlay:boolean;
    private _sound:egret.Sound;
    private _chanel:egret.SoundChannel;
    constructor(){
        super();
        this.initialize();
    }

    private initialize():void{
        this.btn = new egret.Bitmap();
        this.btn.anchorOffsetX = MusicLayer.BG_WIDTH * 0.5;
        this.btn.anchorOffsetY = MusicLayer.BG_HEIGHT * 0.5;

        this.btn.touchEnabled = true;
        this.addChild(this.btn);
        this.btn.x = 700;
        this.btn.y = 50;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);

        this._sound = RES.getRes("bg_mp3");
    }

    private onTouchHandler( e:egret.TouchEvent ):void{
        this.IsPlay = !this.IsPlay;
    }


    public set IsPlay(value:boolean){
        if( this._isPlay != value ){
            this._isPlay = value;
            if( this._isPlay ){
                this._chanel = this._sound.play();
                this.btn.texture = RES.getRes("play_png");
                egret.Tween.get(this.btn,{loop:true}).to({rotation:359},1000);
            }else{
                egret.Tween.removeTweens(this.btn);
                this.btn.rotation = 0;
                this.btn.texture = RES.getRes("stop_png");
                if( this._chanel ){
                    this._chanel.stop();
                }
            }
        }
    }

    public get IsPlay():boolean{
        return this._isPlay;
    }
}