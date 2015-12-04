/**
 * Created by Administrator on 2015/12/4.
 */
class MusicManager{
    static EFFECT:number = 0;
    static BACKGROUND:number = 1;
    static instance:MusicManager;
    static MUSIC_GROUP:string = "music";
    private soundLst:any = {};
    constructor(){
        super();
        if( MusicManager.instance != null ){ throw new TypeError("MusicManager Singleton already constructed"); }
        this.initialize();
    }

    private initialize():void{
        var lst:RES.ResourceItem[] = RES.getGroupByName(MusicManager.MUSIC_GROUP);
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
        if( type == void 0 ){type=MusicManager.EFFECT}
        var sound:any = this.soundLst[name];
        if( sound != void 0 ){
            if( type == MusicManager.EFFECT ){
                if( sound.hasOwnProperty("autoplay") ){
                    delete sound["autoplay"];
                    sound.play();
                }
            }else if( type == MusicManager.BACKGROUND ){
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

    static GetInstance():MusicManager{
        if( MusicManager.instance == null ){
            MusicManager.instance = new MusicManager();
        }
        return MusicManager.instance;
    }

}