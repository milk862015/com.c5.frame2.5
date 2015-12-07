module GameManage{

    export function Initialize():void{
        instance.Initialize();
    }

    class GameSys {
        private lst:any[][];
        static UI_NORMAL:number =0;//正常现实
        static UI_POP_UP:number = 1;//弹窗
        constructor(){

        }

        public Initialize():void{
            //[事件，打开界面前的触发函数，打开界面方式(0 UI显示 1 弹窗),要被打开的界面类,打开模式mode,打开界面后的触发函数]
            this.lst = [
                [GameEvent.LAUNCH,null,GameSys.UI_NORMAL,LaunchSkin,0,null],
            ];
            var count:number = this.lst.length;
            for( var i:number = 0 ; i<count;i++ ){
                var arr:any[] = this.lst[i];
                this.register(arr[0],this.handler,this);
            }
        }

        protected register( type:string,callback:Function,target:any ):void{
           gs.addEventListener(type,callback,target);
        }

        private handler( e:GameEvent ):void{
            var count:number = this.lst.length;
            for( var i:number =0; i < count ;i++ ){
                var arr:any[] = this.lst[i];
                if( arr[0] == e.type ){//调用触发界面的函数
                    if( arr[1] != null && typeof arr[1] == "function" ){
                        arr[1].apply(this);
                    }

                    //显示界面
                    if( arr[2] == 0 && arr[3] != null ){
                        Core.UILayer.Show(arr[3],arr[4]);
                    }else if( arr[2] == 1 && arr[3] != null ){
                        Core.PopUpLayer.AddPopUp(arr[3],arr[4]);
                    }

                    if(arr[5] != null && typeof arr[5] == "function"){
                        arr[5].apply(this);
                    }

                    break;
                }
            }
        }

    }

    var instance:GameSys = new GameSys();
}