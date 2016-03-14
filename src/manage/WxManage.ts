/**
 * Created by milk on 16/3/8.
 */
module WxManage {
    export class WxEvent extends egret.Event{
        static RESULT:string = "result";
        public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false,data?:any){
            super(type,bubbles,cancelable,data);
        }
    }
    export function Initialize():void{
        instance.Initialize();
    }

    class WxSys{
        static URL:string = "";//验证地址

        private isInit:boolean = false;
        constructor(){

        }

        public Initialize():void{
            if( this.isInit == false ){
                this.isInit = true;
                this.getInfo();
            }
        }

        private getInfo():void{
            var data:string =  "";

            //HttpNet.SendRequest(WxSys.URL,HttpNet.POST,this.getInfoCallback,this,data);
        }

        private getInfoCallback(result:number,data:any):void{
            console.log("result:",result);
            console.log("data:",data);
        }
    }

    var instance:WxSys = new WxSys();
}