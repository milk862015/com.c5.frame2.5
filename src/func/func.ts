/**
 * Created by Administrator on 2015/1/28.
 */
class Func {
    static BtnClickEffect(target:egret.DisplayObject):void{
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
    static Random(value:number):number{
        var result:number = 0;
        if( value > 0 ){
            result = Math.floor(Math.random() * 10000)%value;
        }
        return result;
    }

    //恢复原貌
    static clickReset(target:egret.DisplayObject,x:number,y:number):void{
        target.scaleX = 1;
        target.scaleY = 1;
        target.x = x;
        target.y = y;
    }

    static ChangePath( value:string, path:string ):string{
        var src:string = "";
        var arr:string[] = value.split("http://wx.qlogo.cn/mmopen/");
        if( arr.length > 0 ){
            src = arr[1];
            src = path + "wx_img.jpg?path=" + src + ".jpg";
        }
        return src;
    }

    static DrawImage( x:number,y:number,w:number,h:number ):string{
        try{
            var canvas:any = document.getElementById(egret.StageDelegate.canvas_name);
            var ctx = canvas.getContext("2d");
            var data = ctx.getImageData(x, y, w, h);
            var newCan = document.createElement("canvas");
            newCan.width = w;
            newCan.height = h;
            ctx = newCan.getContext("2d");
            ctx.putImageData(data, 0, 0, 0, 0, w, h);
            var b64 = newCan.toDataURL("image/jpeg",0.5);
            return b64;
        }catch(e){
            alert(e);
            return "";
        }
    }

    static GetAllPicPath(value:string):string{
        return SGame.imgUrlPrefix + value;
    }
}