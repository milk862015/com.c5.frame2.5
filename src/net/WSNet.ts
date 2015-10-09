/**
 * Created by milk on 15/10/8.
 */
/**
 * Created by Administrator on 2015/8/3.
 */
class WSNet{
    static instance:WSNet;
    private socket:egret.WebSocket;
    public constructor(){
        if( WSNet.instance != null ){
            throw new TypeError("WsNet Singleton already constructed");
        }
        WSNet.instance  = this;
        this.initialize();
    }

    static GetInstance():WSNet{
        if( WSNet.instance == null ){
            WSNet.instance = new WSNet();
        }

        return WSNet.instance;
    }

    private initialize():void{
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