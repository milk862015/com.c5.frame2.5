/**
 * Created by Administrator on 2015/10/28.
 */
class PopUpUnit extends egret.Sprite{
    private modalAlpha:number;
    private bg:egret.Bitmap;
    private _child:egret.DisplayObject;
    constructor(alpha?:number){
        super();
        this.modalAlpha = alpha;
        this.initialize();
    }

    private initialize():void{

        this.bg = new egret.Bitmap();
        this.bg.alpha = this.modalAlpha;
        this.bg.texture = RES.getRes("black_jpg");
        this.bg.scale9Grid = new egret.Rectangle(1,1,1,1);
        this.bg.width = Core.Stage.stageWidth;
        this.bg.height = Core.Stage.stageHeight;
        this.addChild(this.bg);
    }

    public SetChild( value:egret.DisplayObject ):void{
        if( this._child && this._child.parent ){
            this._child.parent.removeChild(this._child);
        }
        this._child = value;
        this.addChild(value);
    }

    public GetChild():egret.DisplayObject{
        return this._child;
    }
}