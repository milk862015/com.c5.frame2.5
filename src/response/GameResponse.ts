/**
 * Created by Administrator on 2015/9/28.
 */
module gs {
    export function addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):void{
        instance.addEventListener(type, listener, thisObject, useCapture, priority);
    }

    export function removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void{
        instance.removeEventListener(type, listener, thisObject, useCapture)
    }

    export function LoadProgress(cur:number,total:number):void{
        var data:any = {};
        data.cur = cur;
        data.total = total;
        instance.sendEvent(GameEvent.LOAD_PROGRESS,data);
    }

    export function LoadComplete():void{
        instance.sendEvent(GameEvent.LOAD_COMPETE);
    }

    export function Launch():void{
        instance.sendEvent(GameEvent.LAUNCH);
    }

    export function EffectEnd():void{
        instance.sendEvent(GameEvent.EFFECT_END);
    }

    class GameResponse extends egret.EventDispatcher{
        constructor(){
            super();
        }

        public sendEvent(key:string,data?:any):void{
            var ge:GameEvent = new GameEvent(key,false,false,data);
            this.dispatchEvent(ge);
        }
    }

    var instance:GameResponse = new GameResponse();
}