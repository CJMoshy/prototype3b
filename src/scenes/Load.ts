import layer0 from "../../assets/background/layer0.png";
import layer1 from "../../assets/background/layer1.png";
import layer2 from "../../assets/background/layer2.png";
import layer3 from "../../assets/background/layer3.png";
import layer4 from "../../assets/background/layer4.png";
import layer5 from "../../assets/background/layer5.png";
import layer6 from "../../assets/background/layer6.png";
import layer7 from "../../assets/background/layer7.png";
import layer8 from "../../assets/background/layer8.png";
import button from "../../assets/obstacles/button.png";
import coat from "../../assets/obstacles/coat.png";
import coldWarning from "../../assets/obstacles/coldwarning.png";
import coolCat from "../../assets/obstacles/coolcat.png";
import milkBone from "../../assets/obstacles/milkbone.png";
import roids from "../../assets/obstacles/roids.png";
import sickCat from "../../assets/obstacles/sickcat.png";
import spikes from "../../assets/obstacles/spikes.png";
import squirrel from "../../assets/obstacles/squirrel.png";
import vet from "../../assets/obstacles/vet.png";
import warning from "../../assets/obstacles/warning.png";
import necroReborn from "../../assets/Doggy/necroReborn.png";
import blue from "../../assets/Blue.png";
import person from "../../assets/Person/PersonRun.png";
import PersonAtlas from "../../assets/Person/PersonRun.json" with {
  type: 'json',
}
import Phaser from "phaser";

export default class Load extends Phaser.Scene {
  constructor() {
    super({ key: "loadScene" });
  }
  init() {}
  preload() {
    this.load.image("layer0", layer0);
    this.load.image("layer1", layer1);
    this.load.image("layer2", layer2);
    this.load.image("layer3", layer3);
    this.load.image("layer4", layer4);
    this.load.image("layer5", layer5);
    this.load.image("layer6", layer6);
    this.load.image("layer7", layer7);
    this.load.image("layer8", layer8);

    this.load.image("button", button);
    this.load.image("coat", coat);
    this.load.image("cold", coldWarning);
    this.load.image("coolCat", coolCat);
    this.load.image("milkBone", milkBone);
    this.load.image("roids", roids);
    this.load.image("sickCat", sickCat);
    this.load.image("spikes", spikes);
    this.load.image("squirrel", squirrel);
    this.load.image("vet", vet);
    this.load.image("warning", warning);

    this.load.image("blue", blue);
    this.load.spritesheet("necroDog-run", necroReborn, {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.atlas("person-run", person, PersonAtlas);
  }
  create() {
    this.anims.create({
      key: "necroDog-run-anim",
      frames: this.anims.generateFrameNumbers("necroDog-run", {
        start: 0,
        end: 7,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "person-run-anim",
      frames: this.anims.generateFrameNames("person-run", {
        prefix: "Run",
        start: 1,
        end: 4,
      }),
      frameRate: 8,
      repeat: -1,
    });


    this.scene.start("menuScene");
  }
}
