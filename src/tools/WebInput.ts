module one {
	export class WebInput extends egret.DisplayObjectContainer {

		private textField: egret.TextField;
		private inputElement: HTMLInputElement;
		private webNode: WebNode;
		public constructor() {
			super();

			let div = document.createElement("div");
			this.inputElement = document.createElement("input");
			this.inputElement.type = "text";
			this.inputElement.style.outline = "thin";
			this.inputElement.style.background = "none";

			this.inputElement.style.overflow = "hidden";
			this.inputElement.style.wordBreak = "break-all";

			this.inputElement.style.border = "1px solid #000000";
			this.inputElement.setAttribute("tabindex", "-1");

			div.appendChild(this.inputElement);

			this.webNode = new WebNode();
			this.webNode.bind(div);

			this.textField = new egret.TextField();
			this.addChild(this.textField);
			this.textField.size = 50;
			this.textField.width = 300;
			this.textField.height = 50;
			this.textField.text = "输入框";
			this.textField.textColor = 0xff0000;
			this.textField.multiline = false;

			this.init();
		}

		private init(): void {
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

			this.inputElement.oninput = (e) => {
				this.textField.text = this.inputElement.value;
			};

			this.inputElement.onfocus = (e) => {
				egret.log("focus")
				this.textField.visible = false;
			};

			this.inputElement.onblur = () => {
				let player = document.getElementsByClassName("egret-player")[0];
				let canvas = player.getElementsByTagName("canvas")[0];
				// canvas["userTyping"] = false;
				egret.log("blur");

				this.textField.visible = true;
				this.removeChild(this.webNode);
			};

			this.inputElement.onkeypress = (e)=> {
				egret.log(e.keyCode)
			}
		}

		private onTap(e: egret.TouchEvent): void {
			let player = document.getElementsByClassName("egret-player")[0];
			let canvas = player.getElementsByTagName("canvas")[0];
			// canvas["userTyping"] = true;

			e.stopImmediatePropagation();

			this.addChild(this.webNode);

			this.updateInput();
			this.inputElement.focus();

			egret.log("tap")
		}

		private updateInput(): void {
			let textfield: egret.TextField = this.textField;
			this.setElementStyle("fontFamily", textfield.fontFamily);
			this.setElementStyle("fontStyle", textfield.italic ? "italic" : "normal");
			this.setElementStyle("fontWeight", textfield.bold ? "bold" : "normal");
			this.setElementStyle("textAlign", textfield.textAlign);
			this.setElementStyle("fontSize", textfield.size + "px");
			// this.setElementStyle("color", egret.toColorString(0x000000));
			this.setElementStyle("color", egret.toColorString(textfield.textColor));
			this.inputElement.value = textfield.text;

			let tw: number;
			if (textfield.stage) {
				tw = textfield.localToGlobal(0, 0).x;
				tw = Math.min(textfield.width, textfield.stage.stageWidth - tw);
			}
			else {
				tw = textfield.width
			}

			this.setElementStyle("width", tw + "px");

			this.setElementStyle("verticalAlign", textfield.verticalAlign);

			this.setElementStyle("lineHeight", (textfield.size) + "px");
			if (textfield.height < textfield.size) {
				this.setElementStyle("height", (textfield.size) + "px");

				let bottom = (textfield.size / 2);
				this.setElementStyle("padding", "0px 0px " + bottom + "px 0px");
			}
			else {
				this.setElementStyle("height", (textfield.size) + "px");
				let rap = (textfield.height - textfield.size);
				let valign = egret.TextFieldUtils.$getValign(textfield);
				let top = rap * valign;
				let bottom = rap - top;
				if (bottom < textfield.size / 2) {
					bottom = textfield.size / 2;
				}
				this.setElementStyle("padding", top + "px 0px " + bottom + "px 0px");
			}


			if (textfield.maxChars > 0) {
				this.inputElement.setAttribute("maxlength", textfield.maxChars + "");
			}
			else {
				this.inputElement.removeAttribute("maxlength");
			}

			this.inputElement.selectionStart = this.inputElement.value.length;
			this.inputElement.selectionEnd = this.inputElement.value.length;
		}

		/**
         * @private
         */
		private _styleInfoes: Object = {};

        /**
         * @private
         * 
         * @param style 
         * @param value 
         */
		private setElementStyle(style: string, value: any): void {
			if (this.inputElement) {
				if (this._styleInfoes[style] != value) {
					this.inputElement.style[style] = value;
					//this._styleInfoes[style] = value;
				}
			}
		}

	}
}