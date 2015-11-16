var skins;
(function (skins) {
	var LoadViewSkin=(function (_super) {
		__extends(LoadViewSkin, _super);
		function LoadViewSkin() {
			_super.call(this);
			
			this.height = 1008;
			this.width = 640;
			this.elementsContent = [this.loadProgress_i()];
		}
		var _proto = LoadViewSkin.prototype;
	
		_proto.loadProgress_i = function () {
			var t = new eui.Label();
			this.loadProgress = t;
			t.horizontalCenter = 0;
			t.size = 30;
			t.text = "Loading...0%";
			t.textColor = 0xFFFFFF;
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["loadProgress"];
			},
			enumerable: true,
			configurable: true
		});
		return LoadViewSkin;
	})(eui.Skin);
})(skins || (skins = {}));