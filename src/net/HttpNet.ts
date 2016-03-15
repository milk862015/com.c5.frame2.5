/**
 * Created by milk on 16/3/8.
 */
module HttpNet{
    export const GET:number = 0;
    export const POST:number = 1;
    export function Initialize():void{
        instance.Initialize();
    }

    export function SendRequest(url:string,mode:number,data?:any,comHandler?:Function,comTarget?:any,errHandler?:Function,errTarget?:any):void{
        instance.SendRequest(url,mode,data,comHandler,comTarget,errHandler,errTarget);
    }

    class HttpSys{
        private isInit:boolean = false;
        constructor(){

        }

        public Initialize():void{
            if( this.isInit == false ){
                this.isInit = true;
            }
        }

        public SendRequest(url:string,mode:number,data?:any,completeHandler?:Function,comTarget?:any,errHandler?:Function,errTarget?:any):void{
            var request:egret.HttpRequest = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;

            var mSrc:string = "url";

            var value:string = "";
            if( data != void 0 ){
                for( var i in data ){
                    if( value == "" ){
                        value = value + i + "=" + data[i];
                    }else{
                        value = value + "&" + i + "=" + data[i];
                    }
                }
            }

            if(mode == HttpNet.POST){
                mSrc = egret.HttpMethod.POST;
                request.open(url,mSrc);
            }else{
                mSrc = egret.HttpMethod.GET;
                request.open(url+"?"+ value,mSrc)
            }
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            var respHandler = function(evt:egret.Event){
                switch(evt.type){
                    case egret.Event.COMPLETE:
                        typeof completeHandler == "function"  && completeHandler.apply(comTarget,[1,request.response]);
                        break;
                    case egret.IOErrorEvent.IO_ERROR:
                        typeof errHandler == "function"  && errHandler.apply(errTarget,[1,request.response]);
                        break;
                }
            };

            request.once(egret.Event.COMPLETE,respHandler,null);
            if( value != ""  && mode == HttpNet.POST ){
                request.send(value);
            }else{
                request.send()
            }
        }
    }

    var instance:HttpSys = new HttpSys();
}