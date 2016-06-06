/**
 * Created by Administrator on 2016/6/6.
 */
class DebugSkin extends UIPanel{
    private modeGroup:eui.RadioButtonGroup;
    private paramGroup:eui.Group;
    constructor(){
        super();
    }

    protected configHandler():void{
        this.modeGroup = new eui.RadioButtonGroup();
        this.addRadioToGroup(["modeRadio0","modeRadio1"],this.modeGroup);
        this.registerListener(this.modeGroup,eui.UIEvent.CHANGE,this.onModeChangeHandler,this);
        this.registerListener(this,egret.Event.ENTER_FRAME,this.nextFrameHandler,this);

    }

    private nextFrameHandler( e:egret.Event ):void{
        this.clearListener(this,egret.Event.ENTER_FRAME,this.nextFrameHandler,this);
        var radio:eui.RadioButton = this.getUI("modeRadio0");
        if( radio ){
            this.modeGroup.$setSelection(radio,true);
        }
    }

    //游戏模式选择
    private onModeChangeHandler( e:eui.UIEvent ):void{
        this.paramGroup.visible = e.target.selectedValue == "1" ? true:false;
        debug.IsDebug = this.paramGroup.visible;
    }

    private addRadioToGroup(lst:string[],group:eui.RadioButtonGroup):void{
        for( var i:number=0;i < lst.length ; i++ ){
            var radio:eui.RadioButton = this.getUI(lst[i]);
            if( radio ){
                radio.group = group;
            }
        }
    }

}