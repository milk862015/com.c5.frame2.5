/**
 * Created by milk on 2016/11/28.
 */
var fs = require('fs');
var path = "../../../resource";

var tinify = require("tinify");
tinify.key = "";//填写key；
var totalCount = 0;

if( tinify.key == "" ){
    console.log("请先填写key");
    return;
}

function explorer(path){
    fs.readdir(path, function(err,files){
        if(err){
            console.log('error:\n'+err);
            return;
        }

        files.forEach(function(file){
            switch (file){
                case "assets":
                case "skins":
                    return;
                break;
            }
            fs.stat(path+"/"+file,function(err,stat){
            if(err){
                console.log(err);
                return;
            }

            if(stat.isDirectory()){
                console.log(file);
                explorer(path+"/"+file);
            }else{
                var arr = file.split(".");
                if(arr.length > 1 ){
                    var ss = arr[arr.length-1];
                    if( ss == "png" || ss == "jpg" ){
                        // console.log(path+"/"+file);
                        var url = path + "/" + file;
                        tinify.fromFile(url).toFile(url,function(err){
                            if(err){
                                console.log("err:",err,"url:",url);
                                return;
                            }

                            totalCount ++;
                            console.log("success:"+url);
                            console.log("totalCount:",totalCount);
                        });
                    }
                }

            }

        });
    });
});
}

explorer(path);
