import Load from "./scenes/Load.ts";
import Menu from "./scenes/Menu.ts";
import Play from "./scenes/Play.ts";
import Phaser from "phaser";

const GAME_CONFIG = {
  type: Phaser.CANVAS,
  parent: "phaser-game",
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  width: 640,
  height: 360,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
    },
  },
  scene: [Load, Menu, Play],
};

document.addEventListener(
  "DOMContentLoaded",
  () => new Phaser.Game(GAME_CONFIG),
);
