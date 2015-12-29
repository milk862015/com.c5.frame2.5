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

    export function Send(code:string,msg?:any):void{
        var info:SocketPort.Info = <SocketPort.Info>{};
        info.code = code;
        if( msg == void 0 ){
            info.msg = "";
        }else{
            info.msg = msg;
        }
        instance.Send(info);
    }

    class WS{
        private socket:egret.WebSocket;
        public constructor(){
        }

        public Initialize():void{
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_STRING;
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
            this.socket.addEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
            this.socket.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSocketError,this);
        }

        public Connect( path:string,port:number ):void{
            this.socket.connect(path,port);
        }

        public Send(info:SocketPort.Info):void{
            var value:string = JSON.stringify(info);
            console.log("value:",value);
            this.socket.writeUTF(value);
            this.socket.flush();
        }

        private onSocketError( e:egret.IOErrorEvent ):void{
            sr.Error();
        }

        private onSocketOpen( e:egret.Event ):void{
            sr.Open();
        }

        private onSocketClose( e:egret.Event ):void{
            sr.Close();
        }

        private onReceiveMessage( e:egret.ProgressEvent ):void{
            console.log(e);
        }

    }
    var instance:WS = new WS();
}