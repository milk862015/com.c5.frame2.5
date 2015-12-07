/**
 * Created by milk on 15/10/8.
 */
module WSNet{
    export function Initialize():void{
        instance.Initialize();
    }

    export function Connect( path:string,port:number ):void{
        instance.Connect(path,port);
    }

    class WS{
        private socket:egret.WebSocket;
        public constructor(){
        }

        public Initialize():void{
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
            this.socket.addEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
            this.socket.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSocketError,this);
        }

        public Connect( path:string,port:number ):void{
            this.socket.connect(path,port);
        }

        private onSocketError( e:egret.IOErrorEvent ):void{

        }

        private onSocketOpen( e:egret.Event ):void{

        }

        private onSocketClose( e:egret.Event ):void{

        }

        private onReceiveMessage( e:egret.ProgressEvent ):void{

        }
    }
    var instance:WS = new WS();
}