Hangman.GameOver = function (game) {

	this.replayButton;
	this.endFrames = ['game_over1','game_over2','game_over3']
};

Hangman.GameOver.prototype = {

	create: function () {
		//for looping an alternate end frame
		if(Hangman.GAMES_PLAYED === 4 ){
			Hangman.GAMES_PLAYED = 1;
		}

		// set the endframe depending on number of games played
		this.bck = this.add.sprite(this.world.centerX, 170, this.endFrames[Hangman.GAMES_PLAYED-1]);
		this.bck.scale.x = this.bck.scale.y = 0.90;
        this.bck.anchor.setTo(0.5,0);

		this.replayButton = this.add.button(250,165, 'replay_button', this.replayGame, this);
		this.replayButton.anchor.setTo(0.5, 0.5);
		this.replayButton.scale.setTo(0.3, 0.3);

		this.logo = this.add.sprite(10, 140, 'logo');
		this.logo.scale.setTo(0.25, 0.25);

	},

	update: function () {},

	replayGame: function (pointer) {
		// replay the game
		this.state.start('MainMenu');

	}

};
