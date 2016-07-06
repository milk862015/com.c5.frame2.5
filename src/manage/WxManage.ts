/**
 * Created by milk on 16/3/8.
 */
    /*
module WxManage {
    export const BASE_SHARE_LINK:string = "http://fun.xiaoxiemm.com/test/test.html";
    export const BASE_SHARE_IMG:string = "http://fun.xiaoxiemm.com/test/share.jpeg";
    export const BASE_SHARE_TITLE:string = "点进去看看";
    export const BASE_SHARE_DES:string = "部署好了";
    export const BASE_SHARE_TIME_LINE_TITLE:string = "测试一下";

    export class WxEvent extends egret.Event{
        static RESULT:string = "result";
        public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false,data?:any){
            super(type,bubbles,cancelable,data);
        }
    }
    export function Initialize():void{
        instance.Initialize();
    }

    export function ShareTimeLine(body:BodyMenuShareTimeline):void{
        instance.ShareTimeLine(body);
    }

    export function ShareAppMessage(body:BodyMenuShareAppMessage):void{
        instance.ShareAppMessage(body);
    }

    class WxSys{
        static URL:string = "http://115.29.42.128:8080/";//验证地址
        static KEY:string = "jhhc";
        static TICKET:string = "ticket";
        static JS_API_LIST:string[] = ["onMenuShareTimeline","onMenuShareAppMessage"];
        private isInit:boolean = false;
        constructor(){

        }

        public Initialize():void{
            if( this.isInit == false ){
                this.isInit = true;
                this.getInfo();
            }
        }

        private getInfo():void{
            var data:any = {};
            var href:string = encodeURIComponent(window.location.href.split("#")[0]);
            data.key = WxSys.KEY;
            data.url = href;
            HttpNet.SendRequest(WxSys.URL + WxSys.TICKET,HttpNet.POST,data,this.getInfoCallback,this);
            //HttpNet.SendRequest(WxSys.URL,HttpNet.POST,this.getInfoCallback,this,data);
        }

        private getInfoCallback(result:number,data:string):void{
            console.log("result:",result);
            console.log("data:",data);
            var info:any = JSON.parse(data);
            if(info["result"] == 1){
                var appID:string = info["appID"];
                var nonceStr:string = info["noncestr"];
                var signature:string = info["signature"];
                var timestamp:number = info["time"];
                this.configData(appID,WxSys.JS_API_LIST,nonceStr,signature,timestamp);
            }
        }

        private configData(appID:string,jsApiList:string[],nonceStr:string,signature:string,timestamp:number):void{
            var bodyConfig:BodyConfig = new BodyConfig();
            bodyConfig.debug = false;
            bodyConfig.appId = appID;
            bodyConfig.jsApiList = jsApiList;
            bodyConfig.nonceStr = nonceStr;
            bodyConfig.signature = signature;
            bodyConfig.timestamp = timestamp;

            if( typeof wx != "undefined"){
                wx.config(bodyConfig);
                wx.ready(function(){
                    gr.WxReady();
                    //默认分享设置
                    var body:BodyMenuShareTimeline = new BodyMenuShareTimeline();
                    body.title = WxManage.BASE_SHARE_TIME_LINE_TITLE;
                    body.imgUrl = WxManage.BASE_SHARE_IMG;
                    body.link = WxManage.BASE_SHARE_LINK;
                    body.success = function(){
                    };

                    body.cancel = function(){
                    };

                    WxManage.ShareTimeLine(body);

                    var ba:BodyMenuShareAppMessage = new BodyMenuShareAppMessage();
                    ba.title = WxManage.BASE_SHARE_TITLE;
                    ba.imgUrl = WxManage.BASE_SHARE_IMG;
                    ba.link = WxManage.BASE_SHARE_LINK;
                    ba.desc = WxManage.BASE_SHARE_DES;
                    ba.success = function(){
                    };
                    ba.cancel = function(){
                    };

                    WxManage.ShareAppMessage(ba);
                    //if( typeof wx != "undefined" ){
                    //    wx.hideOptionMenu({});
                    //}
                });
            }
        }

        //分享到朋友圈
        public ShareTimeLine(body:BodyMenuShareTimeline):void{
            if( typeof wx != "undefined"){
                wx.onMenuShareTimeline(body);
            }
        }

        //分享给朋友
        public ShareAppMessage(body:BodyMenuShareAppMessage):void{
            if( typeof wx != "undefined"){
                wx.onMenuShareAppMessage(body);
            }
        }
    }

    var instance:WxSys = new WxSys();
}
 */