/**
 * Created by Administrator on 2015/9/18.
 */
class DragonBonesManage{
    static instance:DragonBonesManage;
    private dragonBonesFactory:dragonBones.EgretFactory;
    public constructor(){
        if( DragonBonesManage.instance != null ){
            throw new TypeError("DragonBonesManage Singleton already constructed");
        }
        DragonBonesManage.instance = this;
        this.initialize();
    }

    private initialize():void{
        this.dragonBonesFactory = new dragonBones.EgretFactory();

        egret.Ticker.getInstance().register(
            function(frameTime:number){
                dragonBones.WorldClock.clock.advanceTime(0.01)
            },this);
    }

    public static GetInstance():DragonBonesManage{
        if( DragonBonesManage.instance == null ){
            DragonBonesManage.instance = new DragonBonesManage();
        }
        return DragonBonesManage.instance;
    }

    public AddDragonBones( key:string ):void{
        var dragonBonesData = RES.getRes( key + "_json");
        var textureData = RES.getRes(key + "_texture_json");
        var texture = RES.getRes( key + "_texture_png");
        this.dragonBonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonBonesData));
        this.dragonBonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
    }

    public GetArmature(key:string):dragonBones.Armature{
        var armature:dragonBones.Armature = this.dragonBonesFactory.buildArmature(key);
        dragonBones.WorldClock.clock.add(armature);
        return armature;
    }

    public RemoveArmature(armature:dragonBones.Armature):void{
        dragonBones.WorldClock.clock.remove(armature);
    }
}