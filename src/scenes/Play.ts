import Phaser from "phaser";

type aura = "roids" | "milk-bone" | "sick-cat" | "sweater" | "none";
type obstacle = "spikes" | "vet" | "cold" | "squirrel" | "none";

export default class Play extends Phaser.Scene {
  private tileSprites: Map<number, Phaser.GameObjects.TileSprite>;
  private tileSpeeds: number[];
  private playerAura: aura;
  private auraToObstacle: Map<aura, obstacle>;
  private currentObstacle: [obstacle, Phaser.Physics.Arcade.Sprite | undefined];
  private playerReactionDelay: number;
  //   private keys:
  constructor() {
    super({ key: "playScene" });
    this.tileSprites = new Map();
    this.tileSpeeds = [4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2];
    this.playerAura = "none";
    this.auraToObstacle = new Map([
      ["roids", "spikes"],
      ["sweater", "cold"],
      ["sick-cat", "vet"],
      ["milk-bone", "squirrel"],
    ]);
    this.currentObstacle = ["none", undefined];
    this.playerReactionDelay = 3000; // time in ms for player to react to incoming obstacles
  }

  init() {}
  preload() {}
  create() {
    //spawn background
    this.populateTilesprites();

    //spawn dog
    this.add.sprite(120, 275, "necroDog-run", 0).setScale(2).anims.play(
      "necroDog-run-anim",
    );

    this.events.addListener("checkPlayer", () => {
      if (
        this.auraToObstacle.get(this.playerAura) === this.currentObstacle[0]
      ) {
        // SAFE
      } else {
        // fucked
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

  delayWarningObstacle() {
    const destroyME = this.add.sprite(
      this.game.config.width as number - 100,
      275,
      "warning",
    );
    // tween
    this.time.addEvent({
      delay: 5000,
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
    ).setVelocityX(-200);

    //create
    this.time.addEvent({
      delay: this.playerReactionDelay, // this is the time the player has to react before they could lose/win
      callback: () => {
        this.events.emit("checkPlayer");
      },
    });
  }
}
