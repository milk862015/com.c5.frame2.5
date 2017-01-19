var fs = require('fs');
var xml2js = require('xml2js');

//----修改设置的数值--------
var skinsPath = "../../resource/skins/"; //skins的目录
var skinsExtension = "exml"; //skins的文件的扩展名
var outputTSPath = "../../src/component/ui/"; //输出的对应ts文件
var templatePath = "../template/ts.tmpl"; //ts的模版文件路径

function explorer(path) {
    fs.readdir(path, function(err, files) {
        if (err) {
            console.log('error:\n', err);
            return;
        }

        var len = files.length;
        for (var i = 0; i < len; i++) {
            var file = files[i];


            setTimeout(function(file) {
                console.log("file:", file);
                var arr = file.split(".");
                if (arr.length == 2 && arr[1] == skinsExtension) {
                    // console.log("arr[0]:",arr[0],"path:",path,"file:",file);
                    createTS(arr[0], path, file);
                }
            }, 200 * i, file);


        }
    });
}

function createTS(className, path, file) { //className 对应渲染模版的ts.tmpl中的{{.className}}
    fs.exists(outputTSPath + className + ".ts", function(exists) { //先检查文件是否存在。
        if (!exists) {
            fs.readFile(path + file, "utf-8", function(err, data) { //读取exml文件
                console.log("------------------start build " + className + "---------------");
                if (err) {
                    console.log("read File ", path + file, err);
                    return;
                }
                xml2js.parseString(data, function(err, result) { //将xml转成json，方便解释数据。
                    var valueVar = ""; //生成的变量名字数据 对应渲染模版的{{.valueVar}}
                    var btnLst = []; //需要创建的btn集合
                    // console.log("result:",JSON.stringify(result));
                    var getIDValue = function(key, info) {
                        for (var i in info) {
                            var arr = info[i];
                            if (i != "id") {
                                if (arr instanceof Array || arr instanceof Object) {
                                    if (i == "$" || !isNaN(i)) {
                                        getIDValue(key, arr);
                                    } else {
                                        getIDValue(i, arr);
                                    }
                                }
                            } else {
                                if (typeof key == "string") {
                                    var value = info["id"];
                                    if (value.indexOf("btn") == 0) { //根据id是否有btn开头的字段来创建btn点击事件和对应的处理方法
                                        btnLst.push(value);
                                    }

                                    //生成内容
                                    var classKey = key.replace("e:", "eui.");
                                    var addValue = "public " + value + ":" + classKey + ";";
                                    if (valueVar == "") {
                                        valueVar = addValue;
                                    } else {
                                        valueVar = valueVar + "\n    " + addValue;
                                    }
                                } else {
                                    console.log("key:", key);
                                }
                            }
                        }
                    };
                    getIDValue("", result);
                    var listenValue = "";
                    var funcValue = "";

                    //生成内容
                    for (var k in btnLst) {
                        var btnKey = btnLst[k];
                        var fn = btnKey + "Click";
                        var addListenValue = "this.registerListener(this." + btnKey + ",egret.TouchEvent.TOUCH_TAP,this." + fn + ",this);"
                        if (listenValue == "") {
                            listenValue = addListenValue;
                        } else {
                            listenValue = listenValue + "\n        " + addListenValue;
                        }

                        var addFuncValue = "protected " + fn + "( e:egret.TouchEvent ):void{\n\n    }";
                        if (funcValue == "") {
                            funcValue = addFuncValue
                        } else {
                            funcValue = funcValue + "\n\n    " + addFuncValue;
                        }
                    }

                    createFile(outputTSPath, className, valueVar, listenValue, funcValue);
                });
            });
        } else {
            // console.log("write ts file success");

            addToGameEvent(className);
            // addToGameManage(className);
            // addToGameResponse(className);
        }
    });
}

function createFile(outputPath, className, valueVar, listenValue, funcValue) {
    fs.readFile(templatePath, "utf-8", function(err, data) {
        data = data.replace("{{.className}}", className);
        data = data.replace("{{.valueVar}}", valueVar);
        data = data.replace("{{.listenValue}}", listenValue);
        data = data.replace("{{.funcValue}}", funcValue);
        fs.writeFile(outputPath + className + ".ts", data, function(err) {
            if (err) {
                console.log("write ts file fail");
            } else {
                console.log("write ts file success");

                addToGameEvent(className);
                addToGameManage(className);
                addToGameResponse(className);
            }
        });
    });

}

var partition = "//-------这里自动添加代码分割线-------";
var geFilePath = "../../src/event/GameEvent.ts";

function addToGameEvent(className) {
    fs.readFile(geFilePath, "utf-8", function(err, data) {
        if (err) {
            console.log("addToGameEvent read File:", geFilePath, "error:", err);
            return;
        }
        var cn = className.replace("Skin", "");
        if (data.indexOf("static " + cn.toUpperCase() + ":") != -1) {
            return;
        }

        var addContent = "static " + cn.toUpperCase() + ":string =" + "\"" + cn + "\";\n    ";
        var arr = data.split(partition);
        data = arr[0] + addContent + partition + arr[1];
        fs.writeFile(geFilePath, data, "utf-8", function(err) {
            if (err) {
                console.log("write" + className + " to GameEvent.ts file fail");
            } else {
                console.log("write " + className + " to GameEvent.ts file success");
            }
        })
    });
}

var gmFilePath = "../../src/manage/GameManage.ts";

function addToGameManage(className) {
    fs.readFile(gmFilePath, "utf-8", function(err, data) {
        if (err) {
            console.log("addToGameManage read File:", gmFilePath, "error:", err);
            return;
        }
        var cn = className.replace("Skin", "").toUpperCase();
        if (data.indexOf("." + cn + ",") != -1) {
            return;
        }
        var addContent = "[GameEvent." + cn + ",null,GameSys.UI_NORMAL," + className + ",1,null],\n                ";
        var arr = data.split(partition);
        data = arr[0] + addContent + partition + arr[1];
        fs.writeFile(gmFilePath, data, "utf-8", function(err) {
            if (err) {
                console.log("write" + className + " to GameManage.ts file fail");
            } else {
                console.log("write" + className + " to GameManage.ts file success");
            }
        })
    });
}

var grFilePath = "../../src/response/GameResponse.ts";

function addToGameResponse(className) {
    fs.readFile(grFilePath, "utf-8", function(err, data) {
        if (err) {
            console.log("addToGameResponse read File:", grFilePath, "error:", err);
            return;
        }
        var cn = className.replace("Skin", "");
        if (data.indexOf("function " + cn + "(") != -1) {
            return;
        }

        var addContent = "export function " + cn + "():void{\n" +
            "        instance.sendEvent(GameEvent." + cn.toUpperCase() + ");\n    }\n\n    ";

        var arr = data.split(partition);
        data = arr[0] + addContent + partition + arr[1];
        fs.writeFile(grFilePath, data, "utf-8", function(err) {
            if (err) {
                console.log("write" + className + " to GameResponse.ts file fail");
            } else {
                console.log("write " + className + " to GameResponse.ts file success");
            }
        })
    });
}


//开始运行
explorer(skinsPath);
