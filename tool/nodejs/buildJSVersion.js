/**
 * Created by Administrator on 2016/8/9.
 */
var fs = require('fs');
var filename = "../../bin-release/web/y6/index.html";

fs.readFile(filename,"utf-8",function(err,data){
    if( err != void 0 ){
        console.log("error:",err);
        return;
    }
    var reg = /\.js\?\d+"/;
    var arr;
    var getContent;
    var newContent;
    var dataArr;
    var index;
    while(reg.test(data)){//去掉旧的版本号
        arr = data.match(reg);
        if( arr ){
            getContent = arr[0];
            index = arr["index"];
            newContent = getContent.split("?")[0] + "\"";
            dataArr = data.split(getContent);
            data = data.slice(0,index) + newContent  + data.slice(index+getContent.length);
        }
    }

    //增加新的版本号
    reg = /\.js"/;
    var version = Math.floor(Date.now()/1000);
    while(reg.test(data)){
        arr = data.match(reg);
        if(arr){
            getContent = arr[0].slice(0,-1);
            var index = arr["index"];
            newContent = getContent +"?" + version;
            data = data.slice(0,index) + newContent  + data.slice(index+getContent.length);
        }
    }

    writeFile(filename,data);
});

function writeFile(saveName,content) {// saveName 写入文件名字 content 保存的内容
    fs.writeFile(saveName,content,null,function(err){
        if( err != void 0 ){
            console.log("save error");
        }else{
            console.log("save success");
        }
    })
}
