/**
 * Created by Administrator on 2016/6/6.
 */
var debug = {};
debug.IsDebug = true;//是否开启debug模式
debug.check = function(){
    debug.IsDebug = window.location.href.indexOf("aiwanpai.com") != -1?false:true;
};

debug.check();