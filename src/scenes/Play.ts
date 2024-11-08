import Phaser from "phaser";

type aura = "roids" | "milk-bone" | "sick-cat" | "sweater" | "none";
type obstacle = "spikes" | "vet" | "cold" | "squirrel" | "none";
interface keything {
  keycode: string;
  key: Phaser.Input.Keyboard.Key;
}
export default class Play extends Phaser.Scene {
  private tileSprites: Map<number, Phaser.GameObjects.TileSprite>;
  private tileSpeeds: number[];
  private playerAura: aura;
  private auraToObstacle: Map<aura, obstacle>;
  private currentObstacle: [obstacle, Phaser.Physics.Arcade.Sprite | undefined];
  private playerReactionDelay: number;
  private keys!: keything[];
  private playerHealth: number;
  private healthText!: Phaser.GameObjects.Text;
  private auraText!: Phaser.GameObjects.Text;
  constructor() {
    super({ key: "playScene" });
    this.tileSprites = new Map();
    this.tileSpeeds = [4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2];
    this.playerAura = "none";
    this.auraToObstacle = new Map([
      ["roids", "spikes"],
      ["coat", "cold"],
      ["sick-cat", "vet"],
      ["milk-bone", "squirrel"],
    ]);
    this.currentObstacle = ["none", undefined];
    this.playerReactionDelay = 1500; // time in ms for player to react to incoming obstacles
    this.playerHealth = 3;
  }

  init() {}
  preload() {}
  create() {
    this.keys = [
      { keycode: "one", key: this.input.keyboard?.addKey("ONE")! },
      { keycode: "two", key: this.input.keyboard?.addKey("TWO")! },
      { keycode: "three", key: this.input.keyboard?.addKey("THREE")! },
      { keycode: "four", key: this.input.keyboard?.addKey("FOUR")! },
    ];

    for (const x of this.keys) {
      x.key.on("down", () => {
        switch (x.keycode) {
          case "one":
            this.playerAura = "roids";
            break;
          case "two":
            this.playerAura = "milk-bone";
            break;
          case "three":
            this.playerAura = "sick-cat";
            break;
          case "four":
            this.playerAura = "sweater";
            break;
        }
        this.auraText.text = this.playerAura;
      });
    }

    //spawn background
    this.populateTilesprites();

    //spawn buttons
    const { width, height } = this.game.config;
    this.add.sprite(width as number / 2 - 105, 40, "button").setScale(0.5);
    this.add.sprite(width as number / 2 - 35, 40, "button").setScale(0.5);
    this.add.sprite(width as number / 2 + 35, 40, "button").setScale(0.5);
    this.add.sprite(width as number / 2 + 105, 40, "button").setScale(0.5);
    this.add.sprite(width as number / 2 - 105, 40, "roids").setScale(0.5);
    this.add.sprite(width as number / 2 - 35, 40, "milkBone").setScale(0.5);
    this.add.sprite(width as number / 2 + 35, 40, "sickCat").setScale(0.5);
    this.add.sprite(width as number / 2 + 105, 40, "coat").setScale(0.5);

    //spawn dog
    this.add.sprite(120, 275, "necroDog-run", 0).setScale(2).anims.play(
      "necroDog-run-anim",
    );

    this.healthText = this.add.text(120, 100, "❤️❤️❤️");
    this.auraText = this.add.text(120, 120, this.playerAura);

    this.events.addListener("checkPlayer", () => {
      if (
        this.auraToObstacle.get(this.playerAura) === this.currentObstacle[0]
      ) {
        // SAFE
        console.log("safe");
      } else {
        // fucked
        console.log("fucked");
        this.playerHealth -= 1;
        this.healthText.text = this.determineHearts();
      }
      if (this.playerHealth === 0) {
        console.log("NTNT");
        this.scene.start("menuScene");
      }
      // maybe delay
      this.currentObstacle[1]?.destroy();
      this.currentObstacle[1] = undefined;
      this.delayWarningObstacle();
    });

    this.delayWarningObstacle();
  }

  // deno-ignore-next-line no-unused-vars
  override update(time: number, delta: number): void {
    this.updateTilespriteSpeed();
  }

  determineHearts() {
    let result = "";
    for (let x = 0; x < this.playerHealth; x++) {
      result += "❤️";
    }
    return result;
  }

  delayWarningObstacle() {
    const destroyME = this.add.sprite(
      this.game.config.width as number - 100,
      275,
      "warning",
    );
    // tween
    this.add.tween({
      targets: destroyME,
      alpha: { from: 1, to: 0.0 },
      ease: "Sine.InOut",
      duration: 250,
      repeat: -1,
      yoyo: true,
    });

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        destroyME.destroy();
        this.spawnObstacle();
      },
    });
  }

  populateTilesprites() {
    const { width, height } = this.game.config;
    for (let x = 8; x >= 0; x--) {
      this.tileSprites.set(
        x,
        this.add.tileSprite(
          width as number / 2,
          height as number / 2,
          width as number,
          height as number,
          `layer${x}`,
        ),
      );
    }
  }

  updateTilespriteSpeed() {
    for (let x = 0; x < this.tileSpeeds.length; x++) {
      const up = this.tileSprites.get(x);
      up!.tilePositionX += this.tileSpeeds[x];
    }
  }

  spawnObstacle() {
    // console.log('spawn obstacle')
    const obstacles: obstacle[] = ["cold", "spikes", "squirrel", "vet"];
    this.currentObstacle[0] =
      obstacles[Phaser.Math.Between(0, obstacles.length - 1)];
    console.log(this.currentObstacle);
    // add sprite
    this.currentObstacle[1] = this.physics.add.sprite(
      this.game.config.width as number + 100,
      275,
      this.currentObstacle[0],
    ).setVelocityX(-400);

    //create
    this.time.addEvent({
      delay: this.playerReactionDelay, // this is the time the player has to react before they could lose/win
      callback: () => {
        this.events.emit("checkPlayer");
      },
    });
  }
}
