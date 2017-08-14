/**
 * Created by milk on 2017/8/14.
 */
/**
 * Created by milk on 2016/11/28.
 */
var fs = require('fs');
var path = "../../resource";

var tinify = require("tinify");
var totalCount = 0;

var fileLst = [];
var lastLength = -1;
var saveText = "wait.txt";

if(process.argv.length > 2){
    console.log("process.argv[2]:",process.argv[2]);
    tinify.key = process.argv[2];
    if( process.argv.length > 3 ){
        saveText = process.argv[3];
    }
}else{
    console.log("请在命令行 填写key参数");
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
                            fileLst.push(url);
                            // tinify.fromFile(url).toFile(url,function(err){
                            //     if(err){
                            //         console.log("err:",err,"url:",url);
                            //         return;
                            //     }
                            //
                            //     totalCount ++;
                            //     console.log("success:"+url);
                            //     console.log("totalCount:",totalCount);
                            // });
                        }
                    }

                }

            });
        });
    });
}

//------------检查-------------------
function waitReadFile(){
    var wait = function(){
        lastLength = fileLst.length;
        setTimeout(waitReadFile,1000);
    };

    if( lastLength == -1 ){
        wait();
    }else if( lastLength == fileLst.length ){
        uploadFile();
    }else{
        wait();
    }
}

function uploadFile(){
    if( fileLst.length > 0 ){
        var url = fileLst.shift();
        console.log("-----------start upload "+ url +"------------");
        tinify.fromFile(url).toFile(url,function(err){
            if(err){
                console.log("err:",err,"url:",url);
                return;
            }
            saveNotUploadFileLst();
            totalCount ++;
            console.log("success:"+url);
            console.log("totalCount:",totalCount);
            console.log("--------------end upload----------------");
            uploadFile();
        });
    }else{
        if( fs.existsSync(saveText) ){
            fs.unlinkSync(saveText)
        }
    }

}


function saveNotUploadFileLst(){
    var data = fileLst.join("\n");
    fs.writeFile(saveText,data,function(err){

    });
}

function readSaveText(){
    if( fs.existsSync(saveText) ){
        fs.readFile(saveText,"utf-8",function(err,data){
            console.log("data:",data);
            fileLst = data.split("\n");
            if( fileLst instanceof Array && fileLst.length > 0 ){
                uploadFile();
            }else{
                fileLst = [];
                explorer(path);
                waitReadFile();
            }
        });
    }else{
        explorer(path);
        waitReadFile();
    }

}

readSaveText();
