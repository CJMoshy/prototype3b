import Phaser from "phaser";
export default class Credits extends Phaser.Scene {
  constructor() {
    super({ key: "creditScene" });
  }
  init() {}
  preload() {}
  create() {
    const { width, height } = this.game.config;

    this.add.text(
      width as number / 2,
      height as number / 2 - 100,
      "CMPM 170 Group 9, Fall 2024",
      {
        color: "White",
      },
    ).setOrigin(0.5);
    this.add.text(
      width as number / 2,
      height as number / 2,
      "CJ Moshy, Elton Zeng, Zeke Davison",
      {
        color: "White",
      },
    ).setOrigin(0.5);
    this.add.text(
      width as number / 2,
      height as number / 2 + 50,
      "Henry Christopher, Lingtian He",
      {
        color: "White",
      },
    ).setOrigin(0.5);

    this.add.text(width as number / 2, height as number / 2 + 120, "MENU", {
      color: "White",
    }).setOrigin(0.5).setInteractive().on(
      "pointerdown",
      () => this.scene.start("menuScene"),
    );
  }
}
