module one {
    /**
     * 二维码生成器
     */
    export class QRShape extends egret.DisplayObjectContainer {
        private webNode:WebNode;

        private size: number;

        private shape:egret.Shape;
        constructor(size: number) {
            super();

            this.webNode = new WebNode();

            this.size = size;

            this.shape = new egret.Shape();
            // if (egret.Capabilities.runtimeType != egret.RuntimeType.WEB) {
                this.addChild(this.shape);
            // }
            // else {
                this.addChild(this.webNode);
            // }
        }

        /**
         * 生成
         */
        make(msg: string): void {
            var qrcode = new QRCode();
            qrcode.makeCode(msg);
            var points: Array<Array<boolean>> = qrcode.getPoints();

            this.shape.graphics.clear();
            this.shape.graphics.beginFill(0x000000, 1);

            let length:number = points.length;
            for (var i: number = 0; i < length; i++) {
                var lines: Array<boolean> = points[i];

                for (var j: number = 0; j < lines.length; j++) {
                    if (lines[j]) {
                        this.shape.graphics.drawRect(this.size / length * i, this.size / length * j, this.size / length, this.size / length);
                    }
                }
            }

            this.shape.graphics.endFill();

            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                this.addToDOM();
            }
        }

        /**
         * 显示到HTML中，方便微信等识别二维码
         * 请在位置等确定后在执行，不然位置很有可能对不上
         */
        private addToDOM(): void {
            if (this.img == null) {
                this.img = document.createElement("img");
                this.webNode.bind(this.img);

                this.webNode.width = this.size;
                this.webNode.height = this.size;
            }
            this.updateImg();
        }

        private img: HTMLImageElement;
        private updateImg(): void {
            var renterTexture: egret.RenderTexture = new egret.RenderTexture();
            renterTexture.drawToTexture(this.shape);
            
            this.img.src = renterTexture.toDataURL("image/png");
        }
    }
}
