import Phaser from "phaser";
export default class Menu extends Phaser.Scene {
  private ts!: Phaser.GameObjects.TileSprite
  constructor() {
    super({ key: "menuScene" });
  }
  init() {}
  preload() {}
  create() {
    
    const {width, height} = this.game.config
    this.ts = this.add.tileSprite(width as number / 2,height as number / 2, width as number, height as number, 'blue')
    this.add.text(width as number / 2, height as number / 2 , 'NECRODOG, REBORN', {color: 'black', fontSize: 30}).setOrigin(0.5)
    this.add.text(width as number / 2, height as number / 2 + 120, 'START', {color: 'black'}).setOrigin(0.5).setInteractive().on('pointerdown', ()=>this.scene.start('playScene'))
    console.log('hello from the meny!')
  }
  override update(time: number, delta: number): void {
    this.ts.tilePositionX += 0.5
  }
}
