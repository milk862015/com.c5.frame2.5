/**
 * Created by Administrator on 2015/9/18.
 */
module DragonBonesManage {

  export function Initialize(): void {
    instance.Initialize();
  }

  export function AddDragonBones(key: string): void {
    instance.AddDragonBones(key);
  }

  export function GetArmature(key: string): dragonBones.Armature {
    return instance.GetArmature(key);
  }

  export function RemoveArmature(armature: dragonBones.Armature): void {
    return instance.RemoveArmature(armature);
  }

  class DragonBonesSys {
    private dragonBonesFactory: dragonBones.EgretFactory;
    private lst: string[];
    constructor() {

    }

    public Initialize(): void {
      this.lst = [];
      this.dragonBonesFactory = new dragonBones.EgretFactory();

      var lastTime: number = 0;
      egret.startTick(function(frameTime: number): boolean {
        if (lastTime == 0) {
          lastTime = frameTime;
        } else {
          var nt: number = (frameTime - lastTime) / 1000;
          dragonBones.WorldClock.clock.advanceTime(nt);
          gr.UpdateTime();
          lastTime = frameTime;
        }
        return true;
      }, this);

    }

    public AddDragonBones(key: string): void {
      if (this.lst.indexOf(key) != -1) {
        return;
      }

      var dragonBonesData = RES.getRes(key + "_ske_dbbin");
      var textureData = RES.getRes(key + "_tex_json");
      var texture = RES.getRes(key + "_tex_png");
      this.dragonBonesFactory.parseDragonBonesData(dragonBonesData);
      this.dragonBonesFactory.addTextureAtlasData(new dragonBones.EgretTextureAtlas(texture, textureData));
      this.lst.push(key);
    }

    public GetArmature(key: string): dragonBones.Armature {
      var armature: dragonBones.Armature = this.dragonBonesFactory.buildArmature(key);
      dragonBones.WorldClock.clock.add(armature);
      return armature;
    }

    public RemoveArmature(armature: dragonBones.Armature): void {
      if (armature) {
        if (armature.display["parent"] != null) {
          armature.display["parent"].removeChild(armature.display);
        }
        dragonBones.WorldClock.clock.remove(armature);
      }
    }
  }

  var instance: DragonBonesSys = new DragonBonesSys();
}
