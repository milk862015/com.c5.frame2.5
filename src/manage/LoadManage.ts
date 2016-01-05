/**
 * Created by Administrator on 2015/5/25.
 */

module LoadManage{

    export function Initialize():void{
        instance.Initialize();
    }

    export function StartLoad(arr:string[],classView:any):void{
        instance.StartLoad(arr,classView);
    }

    export function GetView():any{
        return instance.GetView();
    }

    export function getCurLoad():number{
        return instance._curLoad;
    }

    export function getTotalLoad():number{
        return instance._totalLoad;
    }

    class LoadSys{
        private _loadArr:string[];
        private _view:any;
        public _totalLoad:number = 0;
        public _curLoad:number = 0;
        constructor(){

        }

        public Initialize():void{
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        }

        public StartLoad(arr:string[],classView:any):void{
            if( classView ){
                this._view = Core.LoadLayer.ShowLoadView(classView);
            }
            if( arr != void 0 && arr.length > 0 ){
                this._loadArr = arr;
                this._totalLoad = this.getTotalNeedLoad(this._loadArr);
                this._curLoad = 0;

                var count:number = this._loadArr.length;
                for( var i:number=0;i<count;i++ ){
                    RES.loadGroup(this._loadArr[i],count-i);
                }
            }else{
                this.endLoad();
            }
        }

        private onResourceLoadComplete( e:RES.ResourceEvent ):void{
            gr.LoadGroupComplete(e.groupName);
            if( this._curLoad >= this._totalLoad ){
                this.endLoad();
            }
        }

        private endLoad():void{
            if( this._view ){
                Core.LoadLayer.RemoveLoadView();
                this._view = null;
            }

            gr.LoadComplete();
            this._loadArr = null;
        }

        private onResourceProgress( e:RES.ResourceEvent ):void{
            if( this._loadArr.indexOf(e.groupName) != -1 ){
                this._curLoad = this._curLoad + 1;
                gr.LoadProgress(this._curLoad,this._totalLoad,e.groupName);
            }
        }

        public GetView():any{
            return this._view;
        }

        private getTotalNeedLoad(arr:string[]):number{
            var num:number = 0;
            var count:number = arr.length;
            for( var i:number=0;i< count;i++ ){
                var rArr = RES.getGroupByName(arr[i]);
                num = num + rArr.length;
            }
            return num;
        }
    }
    var  instance:LoadSys = new LoadSys();
}