import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import GameOver from './states/GameOver'
import Preloader from './states/Preloader'

class Game extends Phaser.Game {

  constructor () {
    let width = document.documentElement.clientWidth > 1024 ? 1024 : document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight > 768 ? 768 : document.documentElement.clientHeight;
    // let width = window.innerWidth * window.devicePixelRatio; 
    // let height = window.innerHeight * window.devicePixelRatio;
    super(width, height, Phaser.Canvas, 'content', null);
    
    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Preloader', Preloader, false)
    this.state.add('GameOver', GameOver, false)
    this.state.start('Boot')
  }
}

window.game = new Game()
