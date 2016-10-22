
Hangman.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
	this.target = null;
	this.startPrompt;

};

Hangman.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		this.music = this.add.audio('preloadMusic');
		// this.music.play('',0,0.2,true);

		var bck = this.add.sprite(this.world.centerX, this.world.centerY, 'game-bck');
		bck.anchor.setTo(0.5, 0.5);

		var graphics = this.game.add.graphics(0, 0);
		graphics.beginFill(0x000000, 0.6);
		graphics.drawRect(0,0,300,600);

		this.addTeeth();

		this.target =	this.game.add.sprite(0, 0, 'letters', 'letter_A.png');
		this.target.scale.set(0.10, 0.10);

		this.game.physics.enable(this.target, Phaser.Physics.ARCADE);
		this.target.body.velocity.setTo(50,50);
		//  This makes the game world bounce-able
    this.target.body.collideWorldBounds = true;
    //  This sets the target bounce energy for the horizontal
    //  and vertical vectors. "1" is 100% energy return
    this.target.body.bounce.set(1);

		this.playButton = this.add.button(this.world.centerX, this.world.centerY + 130, 'play_button', this.launchGame, this);
		this.playButton.anchor.setTo(0.5, 0.5);

		var startPrompt = this.getDevice();

		var text2 = this.game.add.text(this.world.centerX, this.world.centerY, startPrompt, Hangman.fontMenuStyle);
		text2.anchor.setTo(0.5, 0.5);
	},

	    buildEnemies: function() {
	    	this.letters = this.game.add.group();
	    	this.letters.inputEnabled = true;
	    	this.letters.enableBody = true;
	    	this.letters.physicsBodyType = Phaser.Physics.ARCADE;
	 	    var levelData = this.game.cache.getJSON('leveldata');
	 	    console.log(levelData.letters[src]);

	      var len = levelData.letters.length;
	        
	        for (var i = len; i >= 0; i--) {
	            var randomX = this.rnd.integerInRange(0,this.world.width);
	            var randomY = this.rnd.realInRange(-1500,-10);
	            var e = this.letters.create(
														            	randomX,
														            	randomY, 
														            	'letters', 
														            	levelData.letters[i].src
							);

	            e.name = 'tile' + i;
	            e.enableBody = true;
	            e.body.bounce.setTo(6,2);
	            var scaleFactor = this.rnd.realInRange(0.2, 0.5)
	            e.scale.setTo(scaleFactor);
							e.body.velocity.y = this.rnd.integerInRange(10,50);
							e.body.collideWorldBounds = true;
							//  This sets the target bounce energy for the horizontal
							//  and vertical vectors. "1" is 100% energy return
							e.body.bounce.set(1);
	            // e.rotation = this.rnd.integerInRange(0,10)
	            // this.physics.arcade.accelerateToXY(e, this.hero.x, this.hero.y, 60, 100, 500);

	            // e.body.gravity.y = 2000;
	            e.checkWorldBounds = true;
	            // e.events.onOutOfBounds.add(this.resetEnemy, this);
	        };
	    },

	addTeeth: function() {
		this.letters = this.game.add.group();
		this.letters.inputEnabled = true;
		this.letters.enableBody = true;
		this.letters.physicsBodyType = Phaser.Physics.ARCADE;
		
		// this.game.add.sprite(100, 200, 'letters', 'letter_A.png');
		var levelData = this.game.cache.getJSON('leveldata');
		var len = levelData.letters.length;

    for (var i = 0; i < len; i++) {
    	var randomX = this.game.rnd.integerInRange(0,350);
    	var randomY = this.game.rnd.integerInRange(0,this.game.world.height-50);
      var tile = this.letters.create(
          randomX,
          randomY,
          'letters',
          levelData.letters[i].src);
      console.log(randomY);
      tile.scale.set(0.10, 0.10);

      // tile.body.collideWorldBounds=true;
      // tile.body.gravity.x = this.game.rnd.integerInRange(-250, 50);
      // tile.body.gravity.y = 100 + Math.random() * 100;
      tile.body.velocity.setTo(50,50);
		//  This makes the game world bounce-able
      tile.body.collideWorldBounds = true;
    //  This sets the target bounce energy for the horizontal
    //  and vertical vectors. "1" is 100% energy return
    tile.body.bounce.set(1);


      // tile.body.bounce.setTo(0.9, 0.9);
  	}
	},

	getDevice: function() {
		if(this.game.device.desktop) {
			return 'CLICK TO\n PLAY\n HANGMAN'
		} else {
			return 'TAP TO\nSHOOT'
		}
	},

	update: function () {},

	launchGame: function () {
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		// this.music.stop();

		//	And start the actual game
			
		// this.state.start('GamePlay');

	}

};
