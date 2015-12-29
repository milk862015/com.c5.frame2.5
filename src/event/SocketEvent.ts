/**
 * Created by milk on 15/12/26.
 */
class SocketEvent extends egret.Event{
    static OPEN:string = "open";
    static CLOSE:string = "close";
    static ERROR:string = "error";
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false,data?:any){
        super(type,bubbles,cancelable,data);
    }
}