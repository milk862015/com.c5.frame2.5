/**
 * Created by Administrator on 2015/9/18.
 */
module DragonBonesManage{

    export function Initialize():void{
        instance.Initialize();
    }

    export function AddDragonBones(key:string):void{
        instance.AddDragonBones(key);
    }

    export function GetArmature(key:string):dragonBones.Armature{
        return instance.GetArmature(key);
    }

    export function RemoveArmature(armature:dragonBones.Armature):void{
        return instance.RemoveArmature(armature);
    }

    class DragonBonesSys{
        private dragonBonesFactory:dragonBones.EgretFactory;
        constructor(){

        }

        public Initialize():void{
            this.dragonBonesFactory = new dragonBones.EgretFactory();
            egret.startTick(function(frameTime:number):boolean{
                    dragonBones.WorldClock.clock.advanceTime(0.01);
                    return true;
                },this);

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

    var instance:DragonBonesSys = new DragonBonesSys();
}