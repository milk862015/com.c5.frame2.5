/**
 * Created by Administrator on 2015/12/4.
 */
module MusicManage{

    export function Initialize():void{
        instance.Initialize();
    }

    export function PlayMusic(name:string,type?:number):void{
        instance.PlayMusic(name,type);
    }

    export function StopMusic(name):void{
        instance.StopMusic(name);
    }

    class MusicSys{
        static EFFECT:number = 0;
        static BACKGROUND:number = 1;
        static MUSIC_GROUP:string = "music";
        private soundLst:any = {};
        constructor(){

        }

        public Initialize():void{
            var lst:RES.ResourceItem[] = RES.getGroupByName(MusicSys.MUSIC_GROUP);
            var count:number = lst.length;
            for( var i:number=0;i<count;i++ ){
                var item:RES.ResourceItem = lst[i];
                var soundNick:string = item.name;
                var soundSrc:string = item.url;
                this.addMusic(soundNick,soundSrc);
            }
        }

        private addMusic(name:string,src:string):void{
            if( this.soundLst[name] == void 0 ){
                var dom:any = document.getElementsByTagName("body")[0];
                var nDiv:any = document.createElement("div");
                nDiv.style.width = "0px";
                nDiv.style.height="0px";
                nDiv.style.position = "absolute";
                var sound:any = document.createElement("audio");
                sound.id = name;
                sound.preload= "preload";
                sound.src = src;

                nDiv.appendChild(sound);
                dom.appendChild(nDiv);

                this.soundLst[name] = sound;
            }
        }

        public PlayMusic(name:string,type?:number):void{
            if( type == void 0 ){type=MusicSys.EFFECT}
            var sound:any = this.soundLst[name];
            if( sound != void 0 ){
                if( type == MusicSys.EFFECT ){
                    if( sound.hasOwnProperty("autoplay") ){
                        delete sound["autoplay"];
                        sound.play();
                    }
                }else if( type == MusicSys.BACKGROUND ){
                    sound["autoplay"] = "autoplay"
                }
            }
        }

        public StopMusic(name:string):void{
            var sound:any = this.soundLst[name];
            if( sound != void 0 ){
                if( sound.hasOwnProperty("autoplay") ){
                    delete  sound["autoplay"];
                }
                sound.stop();
            }
        }
    }

    var instance:MusicSys = new MusicSys();
}