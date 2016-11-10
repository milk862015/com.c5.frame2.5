class AlertSkin extends UIPanel{
    public bg:eui.Image;
    public contentLabel:eui.Label;
    private curContent:string;
    constructor(content:string){
        super();
        this.curContent = content;
    }
	
	protected initView():void{
        this.contentLabel.text = this.curContent;
        this.validateNow();
        this.bg.width = this.contentLabel.width + 60;
        this.bg.height = this.contentLabel.height + 20;

        //更新他们的位置
        this.bg.x = Core.Stage.stageWidth * 0.5 - this.bg.width * 0.5;
        this.contentLabel.x = Core.Stage.stageWidth * 0.5 - this.contentLabel.width * 0.5;

        this.bg.y = Core.Stage.stageHeight * 0.5 - this.bg.height * 0.5;
        this.contentLabel.y = Core.Stage.stageHeight * 0.5 - this.contentLabel.height * 0.5;
	}

    protected configHandler():void{
        egret.setTimeout(this.closeWindow,this,1500);
    }

    private closeWindow():void{
        egret.Tween.get(this).to({alpha:0},500).call(this.closeHandler,this);
    }

    private closeHandler():void{
        if( this.parent != undefined ){
            this.parent.removeChild(this);
        }
    }

    protected updateView():void{

    }
}