import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#101010';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Nunito']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts...', { font: '16px Arial', fill: '#77BFA3', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  create (){
      this.game.plugins.add(Fabrique.Plugins.InputField);

       if(this.game.device.desktop)
       {
           // this.scale.pageAlignHorizontally = true;
       }
       else
       {
           // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ;
          // this.scale.foceLandscape = true;
          this.input.maxPointers = 1;
          this.input.addPointer();
          // this.game.scale.pageAlignHorizontally = true;
            // this.game.scale.pageAlignVertically = true;
            // this.game.scale.refresh();

       }

    }

  render () {
    if (this.fontsReady) {
      this.state.start('Preloader')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

}
