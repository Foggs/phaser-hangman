var Hangman = {};

Hangman.Boot = function (game) {

    
};

Hangman.Boot.prototype = {

    init: function () {
        this.stage.backgroundColor = '#000000';
        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        // pause if the browser tab the game is in loses focus.
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        }
        else
        {
            //  mobile settings.
            this.input.addPointer();
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        }
        Hangman.fontMenuStyle = {
        font: "24pt gameFont",
        fill: "#ffffff",
        align: "center"
    };

    },

    preload: function () {
        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        // this.load.image('preloaderBackground', 'images/preloader_background.png');
        this.load.image('preloaderBar', 'images/preloader_bar.png');

    },

    create: function () {
        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');
    }

};
