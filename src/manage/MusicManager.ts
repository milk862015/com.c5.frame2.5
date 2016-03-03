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

        private addMusic(name:string,src:string):any{
            var sound:any = this.soundLst[name];
            if( sound == void 0 ){
                var dom:any = document.getElementsByTagName("body")[0];
                var nDiv:any = document.createElement("div");
                nDiv.style.width = "0px";
                nDiv.style.height="0px";
                nDiv.style.position = "absolute";
                sound = document.createElement("audio");
                sound.id = name;
                sound.preload= "auto";
                sound.src = src;

                nDiv.appendChild(sound);
                dom.appendChild(nDiv);

                this.soundLst[name] = sound;
            }

            return sound;
        }

        public PlayMusic(name:string,type?:number):void{
            if( type == void 0 ){type=MusicSys.EFFECT}

            var sound:any = this.soundLst[name];
            if( sound != void 0 ){
                if( type == MusicSys.EFFECT ){
                    delete sound["autoplay"];
                    delete sound["loop"];
                    sound.removeEventListener("ended",this.playFunc,false);
                    var tag:number = 0;
                    while( sound.paused == false ){
                        tag ++;
                        sound = this.addMusic(name+tag.toString(),sound.src);
                    }
                    sound.play();
                }else if( type == MusicSys.BACKGROUND ){
                    sound["autoplay"] = "autoplay";
                    sound.play();
                    sound.addEventListener("ended",this.playFunc,false);
                }
            }
        }

        private playFunc(e:any):void{
            var sound = e.target;
            setTimeout(function(){sound.play()},100)
        }

        public StopMusic(name:string):void{
            var sound:any = this.soundLst[name];
            if( sound != void 0 ){
                if( sound.hasOwnProperty("autoplay") ){
                    delete  sound["autoplay"];
                    sound.removeEventListener("ended",this.playFunc,false);
                }
                sound.pause();
            }
        }
    }

    var instance:MusicSys = new MusicSys();
}