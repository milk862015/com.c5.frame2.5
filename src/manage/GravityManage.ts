/**
 * Created by Administrator on 2015/12/7.
 */
module GravityManage{

    export function addEventListener(type:string, listener:(event:egret.Event)=>void, thisObject:any, useCapture:boolean = false, priority:number = 0):void {
        instance.addEventListener(type,listener,thisObject,useCapture,priority);
    }

    export function removeEventListener(type:string, listener:(event:egret.Event)=>void,thisObject:any,useCapture:boolean = false):void {
        instance.removeEventListener(type,listener,thisObject,useCapture);
    }

    export function Start():void{
        instance.Start();
    }

    export function Stop():void{
        instance.Stop();
    }

    class GravityEvent extends egret.Event{
        static CHANGE:string = "change";
        public angleX:number = 0;
        public angleY:number = 0;
        public angleZ:number = 0;
        public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false,data?:any){
            super(type,bubbles,cancelable,data);
        }
    }

    class GravitySys extends egret.EventDispatcher{
        public constructor(){
            super();
            this.initialize();
        }

        private initialize():void{

        }

        public Start():void{
            window.ondevicemotion = function(e){
                var ge:GravityEvent = new GravityEvent(GravityEvent.CHANGE);
                ge.angleX = e.rotationRate.beta;
                ge.angleY = e.rotationRate.gamma;
                ge.angleZ = e.rotationRate.alpha;
                instance.dispatchEvent(ge);
            }
        }

        public Stop():void{
            window.ondevicemotion = function(e){

            }
        }
    }
    var instance:GravitySys = new GravitySys();
}