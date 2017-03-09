import Phaser from 'phaser';
import { randomRange, validate } from '../utils';

export default class extends Phaser.State {

  init () {
    this.data = this.game.leveldata;
    this.center_x = this.world.centerX;
    this.center_y= this.world.centerY;
    this.width = this.game.width;
    this.height = this.game.height;

    // game globals
    this.game.message = '';
    this.game.MYSTERY_WORD = '';
    this.game.animate = this.animate;

  }

  preload () {}

  create () {
    // alert(SCALE_RATIO)
    let styles = this.data.styles;

    this.animate(this.data);
    this.drawBckgrd();

    let banner = this.add.text(this.center_x, this.center_y-60, 'Hangman Game',styles.banner);
    banner.anchor.setTo(0.5),

    this.wordInput = game.add.inputField(this.center_x-75, this.center_y, styles.wordEntryConfig);

    this.error_txt = this.add.text(this.wordInput.x, this.wordInput.y + 50,'Please enter a word!',styles.errorConfig)
    this.error_txt.visible = false;

    this.launchButton = this.add.button(this.center_x, this.center_y + 130, 'launch_button', this.launchGame, this);
    this.launchButton.anchor.setTo(0.5, 0.5);
    this.launchButton.input.useHandCursor = true;
    // this.launchButton.scale.setTo(this.game.scaleRatio, this.game.scaleRatio);
  }

  drawBckgrd(){
    let backgroundColor =  "0x212121",
        backgroundOpacity = 1,
        rect = game.add.graphics(this.game.world.centerX/2, this.game.world.centerY/2);
    // draw a rectangle
    rect.lineStyle(2, 0x77BFA3, 1);
    rect.beginFill(backgroundColor, backgroundOpacity);
    rect.drawRoundedRect(0, 0, this.game.width/2, this.game.height/2,12);
    rect.anchor.setTo(0.5,0.5);

  }

  // create a background animation of floating letters
  animate(data) {
    let letters = this.add.group();
        letters.enableBody = true;
        letters.physicsBodyType = Phaser.Physics.ARCADE;

    let len = data.letters.length;
    for (let i = 0; i < len; i++) {
      let randomX = randomRange(0,this.width);
      let randomY = randomRange(0,this.height-50);
      let tile = letters.create(
          randomX,
          randomY,
          'letters',
          data.letters[i].src);
      tile.scale.set(0.10, 0.10);
      let valX = randomRange(-50,50);
      let valY = randomRange(-50,50)
      //start the tiles in motion
      tile.body.velocity.setTo(valX,valY);
      // This makes the game world bounce-able
      tile.body.collideWorldBounds = true;
      // This sets the target bounce energy for the horizontal
      // and vertical vectors. "1" is 100% energy return
      tile.body.bounce.set(1);
    }
  }

  launchGame () {
    if(validate(this.wordInput.value)) {
      this.game.MYSTERY_WORD = this.wordInput.value.toUpperCase().trim();
      this.state.start('Game');
    } else {
      this.error_txt.visible = true;
      this.wordInput.value = '';
    }
  }

  update() {

    // this.state.start('Game');
  }
}
