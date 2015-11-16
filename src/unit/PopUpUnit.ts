/**
 * Created by Administrator on 2015/10/28.
 */
class PopUpUnit extends egret.Sprite{
    private modalAlpha:number;
    private bg:egret.Bitmap;
    constructor(alpha?:number){
        super();
        this.modalAlpha = alpha;
        this.initialize();
    }

    private initialize():void{
        //if( this.modalColor != void 0 && this.modalAlpha != void 0 ){
        //    var g:egret.Graphics  = this.graphics;
        //    g.beginFill(this.modalColor,this.modalAlpha);
        //    g.drawRect(0,0,Core.Stage.width,Core.Stage.height);
        //    g.endFill();
        //}
        this.bg = new egret.Bitmap();
        this.bg.alpha = this.modalAlpha;
        this.bg.texture = RES.getRes("black_jpg");
        this.bg.scale9Grid = new egret.Rectangle(1,1,1,1);
        this.bg.width = Core.Stage.stageWidth;
        this.bg.height = Core.Stage.stageHeight;
        this.addChild(this.bg);
    }
}