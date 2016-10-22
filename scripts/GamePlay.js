
Hangman.GamePlay = function (game) {

    this.levelData;
    this.bck;
    this.gamemusic;
    this.volume_control;
    this.bullets;
    this.bulletTime = 0;
    this.fireButton;
    this.shooter;
    this.teeth;

    // Define constants
    Hangman.GAMES_PLAYED = 0;
    this.SHOT_DELAY = 300; // milliseconds (10 bullets/3 seconds)
    this.GAME_TIME = 20;
    this.targX;
    this.targY;

    this.score = 0;
    this.scoreString = '';
    this.explosion;
    this.explosion_sound;
    this.gamemusic;
    this.volume_control;
    this.timeLeftString = '';
    this.timeLeft = this.GAME_TIME;
    this.timer;

    
};

Hangman.GamePlay.prototype = {

    create: function () {
        // levelData contains the x,y positions and frames extracted from the spritesheet for all the teeth
        // this.levelData = JSON.parse(this.game.cache.getText('leveldata'));

        this.addBackground()
        this.addGameMusic();
        // this.addShooter();
        this.addTeeth();
        // this.createBullets();
        // this.addListeners();

        this.scoreString = 'SCORE : ';
        this.scoreText = this.game.add.text(10, 10, this.scoreString + this.score, Hangman.fontStyle);

        this.timeLeftString = 'Time left : ';
        this.timeLeft = this.add.text(10, 30, this.timeLeftString + this.timeLeft, Hangman.fontStyle);

        this.startGame();
        // this.game.input.mouse.requestPointerLock();
    },

    addBackground: function() {
        this.bck = this.add.image(this.world.centerX, this.world.centerY, 'game-bck');
        this.bck.anchor.setTo(0.5, 0.5);
    },

    addGameMusic: function (){
        this.gamemusic = this.add.audio('preloadMusic');
        this.gamemusic.play('', 0, 0.2, true);
        this.game.sound.mute = true;
        // mute sound controls
        this.volume_control = this.add.button(5, this.world.height -5, 'volume', this.muteSounds, this);
        this.volume_control.anchor.setTo(0, 1);
    },


    addTeeth: function() {

        this.letters = this.game.add.group();
        this.letters.inputEnabled = true;
        this.letters.enableBody = true;
        this.letters.physicsBodyType = Phaser.Physics.ARCADE;
        
        // this.game.add.sprite(100, 200, 'letters', 'letter_A.png');
        var levelData = this.game.cache.getJSON('leveldata');
        var len = levelData.letters.length;
        console.log(levelData)
        for (var i = 0; i < len; i++) {
            this.letters.create(
                levelData.letters[i].x, 
                levelData.letters[i].y, 
                'letters',
                levelData.letters[i].src);
        }

        // this.teeth.setAll('scale', 0.5);
        this.letters.scale.set(0.25, 0.25);
    },

    createBullets: function() {
        //  Our bullet group
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(3, 'missile');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
    },

    addListeners: function() {
        this.game.input.onDown.add(this.fireMissile,this);
        // this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    muteSounds: function(btn) {
        if(btn.frame === 0) {
            this.game.sound.mute = false;
            btn.frame = 1;
        } else {
            this.game.sound.mute = true;
            btn.frame = 0;
        }

    },

    startGame: function() {
        Hangman.GAMES_PLAYED ++;
        // this.timer = this.game.time.create(false);
        // // Set a TimerEvent to occur every second
        // this.timer.loop(1000, this.updateCounter, this);
        // this.timer.start();
    },

    updateCounter: function () {
        // this.GAME_TIME --;
        // if(this.GAME_TIME < 0) {
        //     this.gameOver();
        // }
        // this.timeLeft.text = 'Time left: ' + this.GAME_TIME;
    },


    render: function() {
        // this.game.debug.body(this.shooter);
        // this.game.debug.body(this.enemy);
    },

    collisionHandler : function (tooth) {
        if(!tooth) {return;}
        tooth.damage(1);
        if(tooth.health === 1) {
            var  str = tooth.frameName;
            var s = str.replace("Tooth", "Tooth_decayed");
            tooth.frameName = s;
        }
        this.score += 2;
        this.scoreText.text = this.scoreString + this.score;
    },

    fireMissile: function(pointer) {
        //check if click happens below shooter, if so return
        if(pointer.y > this.shooter.y) return;
        this.shooter.bringToTop();

        if (this.game.time.now > this.bulletTime) {
            //  Grab the first bullet we can from the pool
            var bullet = this.bullets.getFirstExists(false);

            if (bullet) {
                // Set the bullet position to the gun position. And fire it
                bullet.reset(this.shooter.x, this.shooter.y);
                this.bulletTime = this.game.time.now + 200;
                var tween = this.game.add.tween(bullet).to( { x:pointer.x, y: pointer.y}, 1000, Phaser.Easing.Quadratic.In, true);
                tween.onComplete.add(this.onMissileFiredComplete, this);
            }
        }
    },

    onMissileFiredComplete: function(missile) {
        missile.kill();
        this.game.physics.arcade.overlap(missile, this.teeth, this.collisionHandler, null, this);
        var targ = this.game.physics.arcade.getObjectsUnderPointer(this.input.activePointer, this.teeth );
        this.collisionHandler(targ[0]);

        var sound = this.add.audio('explosion_sound');
        sound.play('',0,0.3,false);

        var graphics = this.add.graphics(0, 0);
        graphics.beginFill(0xffffff,0.5);
        graphics.drawRect(0, 0, this.game.world.width, this.game.world.height);
        var graphicsTween = this.game.add.tween(graphics).to( { alpha:0}, 100, Phaser.Easing.Bounce.InOut, true, 0, 2);
        graphicsTween.onComplete.add(this.onBoomComplete, this);

        var boom = this.add.sprite(this.input.x, this.input.y, 'explosion');
        boom.anchor.setTo(0.5, 0.5);
        var boomTween = this.game.add.tween(boom).to( { alpha:0}, 100, Phaser.Easing.Bounce.InOut, true, 0, 2);
        boomTween.onComplete.add(this.onBoomComplete, this);

        missile.kill();
    },

    onBoomComplete: function(boom) {
        boom.kill();
    },

    gameOver: function (pointer) {
        this.GAME_TIME = 20;
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.gamemusic.stop();
        this.gamemusic = null;
        this.score = 0;

        //  Then let's go back to the main menu.
        this.state.start('GameOver');

    }

};
