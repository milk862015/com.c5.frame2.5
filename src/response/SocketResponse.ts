/**
 * Created by Milk on 2015/12/25.
 */
module sr{

    export function addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):void{
        instance.addEventListener(type, listener, thisObject, useCapture, priority);
    }

    export function removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void{
        instance.removeEventListener(type, listener, thisObject, useCapture)
    }

    export function Open():void{
        instance.sendEvent(SocketEvent.OPEN);
    }

    export function Close():void{
        instance.sendEvent(SocketEvent.CLOSE);
    }

    export function Error():void{
        instance.sendEvent(SocketEvent.ERROR)
    }

    class SocketResponse extends egret.EventDispatcher{
        constructor(){
            super();
        }

        public sendEvent(key:string,data?:any):void {
            var ge:GameEvent = new GameEvent(key, false, false, data);
            this.dispatchEvent(ge);
        }
    }

    var instance:SocketResponse = new SocketResponse();
}