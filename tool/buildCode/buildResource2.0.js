var fs = require('fs');

var resourceDir = "../../resource/";
var uiDir = "../../resource/ui/";
var resourceFile = "../../resource/default.res.json";
var skinsPath = "../../resource/skins/";
var skinsExtension = "exml";//skins的文件的扩展名

var addInfo = {};
function explorer(path){
    fs.readdir(path,function(err,files){
       if( err ){
           console.log("error:\n" + err);
           return;
       }

       files.forEach(function(file){
          if( file.indexOf( "." +skinsExtension) != -1 ){
              var arr = file.split(".");
              if( arr.length == 2){
                  addFunc(arr[0]);
              }
          }
       });
    });
}

function addFunc(dir){//读取对应目录的文件
    fs.readdir(uiDir+dir,function(err,files){
        if(err){
            //console.log("not found path",uiDir + dir);
            return;
        }

        if( !addInfo.hasOwnProperty(dir) ){
            addInfo[dir] = [];
            var eName = dir + "." + skinsExtension;
            var eUrl = skinsPath + eName;
            eName = eName.replace(".","_");
            eUrl = eUrl.replace(resourceDir,"");
            addInfo[dir].push({name:eName,type:"exml",url:eUrl})
        }

        var lst = addInfo[dir];

        files.forEach(function(file){
           if( file.indexOf(".jpg") != -1 || file.indexOf(".png") != -1 ){
               var obj = {};
               var url = uiDir + dir + "/" + file;
               url = url.replace(resourceDir,"");
               obj["url"] = url;
               obj["name"] = file.replace(".","_");
               obj["type"] = "image";
               lst.push(obj);
           }
        });
    });
}

function addInfoHandler(){
    fs.readFile(resourceFile,function(err,data){
        if( err ){
            console.log("read file:",resourceFile,"error:",err);
            return
        }
        var result = JSON.parse(data);
        console.log("result:",result);
        var gLst;
        var rLst;

        if(!result.hasOwnProperty("groups") ){
            result["groups"] = [];
        }

        if( !result.hasOwnProperty("resources") ){
            result["resources"] = [];
        }

        gLst = result["groups"];
        console.log("gLst:",gLst);
        rLst = result["resources"];

        for( var key in addInfo ){
            console.log("key:",key);
            var item = undefined;
            //从group获取要被添加的位置
            for( var g in gLst ){
                var info = gLst[g];
                if( info.name == key ){
                    item = info;
                    break;
                }
            }

            if( item == undefined ){
                item = {name:key};
                gLst.push(item);
            }

            if( !item.hasOwnProperty("keys") ){
                item.keys = "";
            }

            var arr = addInfo[key];//需要被添加的数据
            var count = arr.length;
            for(var i = 0 ;i < count; i++){
                var obj = arr[i];
                var name = obj["name"];
                //添加到groups对应的item
                if( item.keys.indexOf( name ) == -1 ){
                    if( item.keys == "" ){
                        item.keys = name;
                    }else{
                        item.keys = item.keys + "," + name;
                    }
                }

                //添加到resources
                var isHas = false;
                for( var j in rLst ){
                    var rInfo = rLst[j];
                    if( rInfo.name == name ){
                        isHas = true;
                        break;
                    }
                }

                if( !isHas ){
                    rLst.push(obj);
                }
            }
        }
        fs.writeFile(resourceFile,JSON.stringify(result),'utf-8',function(err){
            if( err ){
                console.log("write fail");
            }else{
                console.log("write success");
            }
        })
    });
}

explorer(skinsPath);
setTimeout(function(){
    addInfoHandler();
    // console.log("addInfo:",JSON.stringify(addInfo));
},1000);
