/**
 * Created by Administrator on 2015/1/28.
 */
module Func {
    export function BtnClickEffect(target:egret.DisplayObject):void{
        if( target.scaleX != 1 ){
            return;
        }
        var pp:number = 0.8//系数
        var x:number = target.x;
        var y:number = target.y;
        var nx:number = target.x + target.width * 0.5 - target.width * pp * 0.5;
        var ny:number = target.y + target.height * 0.5 - target.height * pp * 0.5;
        target.scaleY = pp;
        target.scaleX = pp;
        target.x = nx;
        target.y = ny;
        setTimeout(Func.clickReset,100,target,x,y);

    }

    // 0至value随机一个数
    export function Random(value:number):number{
        var result:number = 0;
        if( value > 0 ){
            result = Math.floor(Math.random() * 10000)%value;
        }
        return result;
    }

    //恢复原貌
    export function clickReset(target:egret.DisplayObject,x:number,y:number):void{
        target.scaleX = 1;
        target.scaleY = 1;
        target.x = x;
        target.y = y;
    }

    export function AddChild(parent:egret.DisplayObjectContainer,target:egret.DisplayObject,scale?:number,x?:number,y?:number):void{
        if(scale == void 0){scale = 1}
        if(x == void 0){ x=Core.Stage.stageWidth*0.5 }
        if(y == void 0){ y=Core.Stage.stageHeight*0.5 }
        parent.addChild(target);
        target.scaleX = scale;
        target.scaleY = scale;
        target.x = x;
        target.y = y;
    }
}