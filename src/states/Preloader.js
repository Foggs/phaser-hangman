import Phaser from 'phaser';
import { centerGameObjects } from '../utils';


export default class extends Phaser.State {
  init () {
    this.ready = false;
  }

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar);

    // load your assets
    this.load.atlasXML('letters','assets/images/spritesheets/wood_spritesheet.png', 'data/wood_spritesheet.xml');
    this.load.image('launch_button', 'assets/images/play_button.png');
    this.load.image('block', 'assets/images/block.png');
    this.load.image('replay', 'assets/images/replay.png');
    this.load.image('gallows', 'assets/images/gallows.png');
    this.load.image('body', 'assets/images/body.png');
    this.load.image('head', 'assets/images/head.png');

    // level.jsondata contains the x,y coordinates and the source location on the spritesheet
    this.load.json('leveldata','data/level.json');
    this.load.onLoadComplete.add(this.loadComplete, this);
  }

  loadComplete(){
      this.ready = true;
      this.game.leveldata = this.game.cache.getJSON('leveldata');

  }

  create () { }

  update () {

      //  Wait for our files file to be load before proceeding to the Splash.
      if ( this.ready=== true)
      {
          this.state.start('Splash');
      }

  }


}

