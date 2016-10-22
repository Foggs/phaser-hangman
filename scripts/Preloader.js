
Hangman.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;

};

Hangman.Preloader.prototype = {

	preload: function () {

		// These are the assets we loaded in Boot.js
		// A loading progress bar
		// this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(50, this.world.centerY, 'preloaderBar');

		// This sets the preloadBar sprite as a loader sprite.
		// What that does is automatically crop the sprite from 0 to full-width
		// as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		this.load.image('game-bck',      'images/game-bck.png');
		this.load.image('play_button',   'images/play_button.png');
		this.load.image('replay_button', 'images/replay.png');

		this.game.load.atlasXML('letters',   'images/spritesheets/wood_spritesheet.png', 'data/wood_spritesheet.xml');
		this.game.load.atlasJSONArray('volume', 'images/spritesheets/volume.png', 'images/spritesheets/volume.json');
		this.load.audio('explosion_sound', ['audio/explosion.mp3']);
		this.load.audio('preloadMusic', ['audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);

		// There are various tools that can create Bitmap Fonts and the XML file needed.
		// On Windows you can use the free app BMFont: http://www.angelcode.com/products/bmfont/
		// On OS X we recommend Glyph Designer: http://www.71squared.com/en/glyphdesigner
		this.load.bitmapFont('carrier_command', 'fonts/carrier_command.png', 'fonts/carrier_command.xml');

		// level.jsondata contains the x,y coordinates and the source location on the spritesheet
		this.load.json('leveldata','data/level.json');


	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
	},

	update: function () {

		//	Wait for our audio file to be decoded before proceeding to the MainMenu.
		if (this.cache.isSoundDecoded('preloadMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
