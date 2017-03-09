import Phaser from 'phaser'

export default class extends Phaser.State {

  init () {
    this.data = this.game.leveldata;
  }

  preload () {}

  create () {
    // reuse tile animation from SplashState
    this.game.animate(this.data);

    let banner = this.add.text(20,20, 'Hangman Game',this.data.styles.banner);

    this.message = this.add.text(20,20, this.game.message, this.data.styles.guessesLeftConfig);
    this.message.fontSize = 80;
    this.message.anchor.setTo(0.5)

    this.replay = this.add.button(0, 0, 'replay', this.replayGame , this);
    this.replay.scale.setTo(0.5, 0.5);
    this.replay.input.useHandCursor = true;

    this.createModals();
  }

  createModals() {
    this.drawBckgrd();
    this.rendermodalContant();
  }

  drawBckgrd(){
    let backgroundColor =  "0x000000";
    let backgroundOpacity = 0.3;
    let graphics = this.add.graphics(0, 0);
    // draw a rectangle
    graphics.lineStyle(1, 0x0000FF, 1);
    graphics.beginFill(backgroundColor, backgroundOpacity);
    graphics.drawRect(0, 0, this.game.width, this.game.height);
  }

  rendermodalContant(){
    let backgroundColor =  "0x212121";
    let backgroundOpacity = 1;
    let rect = game.add.graphics(this.game.world.centerX/2, this.game.world.centerY/2);
    // draw a rectangle
    rect.lineStyle(2, 0xffffff, 1);
    rect.beginFill(backgroundColor, backgroundOpacity);
    rect.drawRoundedRect(0, 0, this.game.width/2, this.game.height/2,12);
    rect.addChild(this.replay);
    rect.getChildAt(0).x = 360;
    rect.getChildAt(0).y = 10;

    rect.addChild(this.message);
    rect.getChildAt(1).x = rect.width/2;
    rect.getChildAt(1).y = rect.height/2;

    rect.addChild(this.replay);
    rect.getChildAt(1).x = 250;
    rect.getChildAt(1).y = 10;
  }

  replayGame () {
    this.state.start('Splash');
  }

  update() {
  }
}
