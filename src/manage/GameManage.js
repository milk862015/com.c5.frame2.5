var GameManage;
(function (GameManage) {
    function Initialize() {
        instance.Initialize();
    }
    GameManage.Initialize = Initialize;
    var GameSys = (function () {
        function GameSys() {
        }
        GameSys.prototype.Initialize = function () {
            this.lst = [
                [GameEvent.DEBUG, null, GameSys.UI_NORMAL, DebugSkin, 1, null],
                [GameEvent.ALERT, null, GameSys.UI_POP_UP, null, 1, null],
            ];
            var count = this.lst.length;
            for (var i = 0; i < count; i++) {
                var arr = this.lst[i];
                this.register(arr[0], this.handler, this);
            }
        };
        GameSys.prototype.register = function (type, callback, target) {
            gr.addEventListener(type, callback, target);
        };
        GameSys.prototype.handler = function (e) {
            var count = this.lst.length;
            for (var i = 0; i < count; i++) {
                var arr = this.lst[i];
                if (arr[0] == e.type) {
                    if (arr[1] != null && typeof arr[1] == "function") {
                        arr[1].apply(this);
                    }
                    if (arr[2] == 0 && arr[3] != null) {
                        if (e.data == void 0) {
                            Core.UILayer.Show(arr[3], arr[4]);
                        }
                        else {
                            Core.UILayer.Show(arr[3], arr[4], e.data);
                        }
                    }
                    else if (arr[2] == 1 && arr[3] != null) {
                        if (e.data == void 0) {
                            Core.PopUpLayer.AddPopUp(arr[3], arr[4]);
                        }
                        else {
                            Core.PopUpLayer.AddPopUp(arr[3], arr[4], void 0, e.data);
                        }
                    }
                    if (arr[5] != null && typeof arr[5] == "function") {
                        arr[5].apply(this);
                    }
                    break;
                }
            }
        };
        return GameSys;
    }());
    GameSys.UI_NORMAL = 0;
    GameSys.UI_POP_UP = 1;
    var instance = new GameSys();
})(GameManage || (GameManage = {}));
