var fs = require('fs');

var resourceDir = "../../resource/";
var resourceFile = "../../resource/default.res.json";

var addInfo = {};
function explorer(dir,path){
    fs.readdir(path + dir,function(err,files){
        if( err ){
            console.log('error:\n' + err);
            return
        }
        var addFunc = function( key, file ){
            if(file.indexOf(".jpg") != -1 || file.indexOf(".png") != -1) {
                if (addInfo.hasOwnProperty(key) == false) {
                    addInfo[key] = [];
                }
                addInfo[key].push(file);
            }
        };

        files.forEach(function(file){
            fs.stat(path  + dir + "/" + file,function (err,stat) {
                if( err ){
                    console.log(err);
                    return;
                }
                if( stat.isDirectory() ){//是目录的继续读取目录的文件
                    explorer(file,path + "/" + dir + "/")
                }else{
                    if( file.indexOf(".jpg") != -1 || file.indexOf(".png") != -1 ){
                        var dPath = path.replace(resourceDir,"");
                        addResourceFile(dPath,dir,file);
                    }
                }
            });
        });
    });
}

function addResourceFile(path,dir,file){
    fs.readFile(resourceFile,function(err,data){
        if( err ){
            console.log("readFile:",resourceFile,"error:",err);
            return;
        }

        var result = JSON.parse(data);
        if( !result.hasOwnProperty("groups")  ){
            result["groups"] = [];
        }
        var nFile = file.replace(".","_");
        //编辑groups的
        var gLst = result["groups"];
        var count = gLst.length;

        var item;
        for( var i = 0 ; i < count; i++ ){
            var info = gLst[i];

            if( info.name == dir ){
                item = info;
                break;
            }
        }

        if( item ){
            if( item.keys == undefined || item.keys == "" ){
                item.keys = nFile
            }else if( item.keys.indexOf(nFile) == -1 ){
                item.keys = item.keys + "," + nFile;
            }
        }else{
            item = {keys:nFile,name:dir};
            gLst.push(item);
        }

        if( !result.hasOwnProperty("resources") ){
            result["resources"] = [];
        }

        var rLst = result["resources"];
        var isHas = false;
        for(var j in rLst){
            var info = rLst[j];
            if(info.name == nFile){
                isHas = true;
                break;
            }
        }

        if( !isHas ){
            var info = {name:nFile,type:"image",url:path + dir + "/" + file};
            rLst.push(info);
        }

        fs.writeFile(resourceFile,JSON.stringify(result),'utf-8',function(err){
            if( err ){
                console.log(err);
            }
        })

    });
}

explorer("ui",resourceDir);

