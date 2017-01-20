/**
 * Created by Administrator on 2015/11/2.
 */
class MusicLayer extends eui.Group {
    static BG_WIDTH: number = 48;
    static BG_HEIGHT: number = 48;
    private btn: egret.Bitmap;
    private _isPlay: boolean;
    constructor() {
        super();
        this.initialize();
    }

    private initialize(): void {
        this.btn = new egret.Bitmap();
        this.btn.anchorOffsetX = MusicLayer.BG_WIDTH * 0.5;
        this.btn.anchorOffsetY = MusicLayer.BG_HEIGHT * 0.5;

        this.btn.touchEnabled = true;
        this.addChild(this.btn);
        this.btn.x = 700;
        this.btn.y = 60;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

    }

    private onTouchHandler(e: egret.TouchEvent): void {
        this.IsPlay = !this.IsPlay;
    }


    public set IsPlay(value: boolean) {
        this.btn.x = Core.Stage.stageWidth * 0.5 + 325;
        if (this._isPlay != value) {
            this._isPlay = value;
            if (this._isPlay) {
                MusicManage.PlayMusic("bg_mp3", MusicManage.MusicSys.BACKGROUND);
                this.btn.texture = RES.getRes("play_png");
                this.run();
            } else {
                this.stop();
                this.btn.rotation = 0;
                this.btn.texture = RES.getRes("stop_png");
                MusicManage.StopMusic("bg_mp3");
            }
        }
    }

    private run(): void {
        Core.Stage.addEventListener(egret.Event.ENTER_FRAME, this.runHandler, this);
    }

    private runHandler(e: egret.Event): void {
        this.btn.rotation += 5;
        if (this.btn.rotation >= 360) {
            this.btn.rotation = this.btn.rotation - 360;
        }
    }

    private stop(): void {
        Core.Stage.removeEventListener(egret.Event.ENTER_FRAME, this.runHandler, this);
    }

    public get IsPlay(): boolean {
        return this._isPlay;
    }
}
