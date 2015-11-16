var skins;
(function (skins) {
	var LaunchSkin=(function (_super) {
		__extends(LaunchSkin, _super);
		function LaunchSkin() {
			_super.call(this);
			
			this.height = 1008;
			this.width = 640;
			this.elementsContent = [this._Image1_i(),this.btnStart_i()];
		}
		var _proto = LaunchSkin.prototype;
	
		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "launchBg_jpg";
			t.verticalCenter = 0;
			return t;
		};
		_proto.btnStart_i = function () {
			var t = new eui.Image();
			this.btnStart = t;
			t.horizontalCenter = 0;
			t.source = "btnStart_png";
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["btnStart"];
			},
			enumerable: true,
			configurable: true
		});
		return LaunchSkin;
	})(eui.Skin);
})(skins || (skins = {}));