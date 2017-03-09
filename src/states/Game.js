/* globals __DEV__ */
import Phaser from 'phaser';
import _ from 'underscore';
import { validate } from '../utils';



export default class extends Phaser.State {
  init () {
    this.data = this.game.leveldata;
    this.showErrors = false;
    this.guesses = [];
    this.NUM_GUESSES = 6;
    this.gallows = this.add.group();
    this.container = this.add.group();
    // this.game.MYSTERY_WORD='DEBUG'; //enable for quick debugging
  }

  preload () {}

  create () {
    let banner = this.add.text(20, 20, 'Hangman Game');
    banner.font = 'Nunito';
    banner.fontSize = 40;
    banner.fill = '#77BFA3';

    // will be used to check for winning the game
    this.MYSTERY_WORD_CHECK = _.range(this.game.MYSTERY_WORD.length);
    this.buildLabels();
    this.drawGallows();
    this.buildGameBoard();
  }

  drawGallows() {
    let len = this.data.hangman.length,
        i=0;

    for (i; i < len; i++) {
      let item = this.data.hangman[i];
      this.gallows.create(item.x, item.y, item.src);
      this.gallows.getChildAt(i).anchor.setTo(0.5,0);
      this.gallows.getChildAt(i).angle = item.angle;
      this.gallows.getChildAt(i).visible = item.visible;
      this.gallows.getChildAt(i).name = item.name;
    }

    this.gallows.scale.set(.75,.75);
    this.gallows.x = (this.game.width-this.gallows.width)/2;
    this.gallows.y = 50;

  }

  buildLabels() {
    let styles = this.data.styles;
    this.guessesLeft_txt = this.add.text(20, this.world.centerY+30,
    'Guesses Left: ' + this.NUM_GUESSES, styles.guessesLeftConfig);

    let txt_1 = this.add.text(this.guessesLeft_txt.x, this.guessesLeft_txt.y+60, 'Enter a letter: ',styles.labels);

    this.error_txt = this.add.text(txt_1.x, txt_1.y+50,'Please enter a letter!',styles.errorConfig)

    this.guess = this.game.add.inputField(txt_1.x+140, txt_1.y-5, styles.guessEntryConfig);

    this.guessBtn = this.add.button(this.guess.x + 75, this.guess.y-10, 'launch_button', this.checkGuess, this);
    this.guessBtn.input.useHandCursor = true;

    let txt_2 = this.add.text(txt_1.x+400, txt_1.y, 'Chosen letters:',styles.labels);

    this.lettersChosen_txt = this.add.text(txt_2.x+140, txt_2.y, '',styles.labels);
    this.lettersChosen_txt.fill = '#fff';

  }

  buildGameBoard() {
    let letters = this.game.MYSTERY_WORD.split(''),
        curr,
        i=0,
        len = letters.length;

    for(i; i<len; i++) {
      if(i===0) {
        curr = this.add.sprite(0, 0, 'block');
      } else {
        let letter = this.add.sprite(0, 0, 'block').alignTo(curr, Phaser.RIGHT_CENTER, 16);
        curr = letter;
      }
      this.container.add(curr);
    }
    // keep the mystery word from scaling to large
    let scaled = (this.game.width-50)/(this.container.width);
    let scaleFactor = scaled > .72 ? .72 : scaled;
    this.container.scale.set(scaleFactor,scaleFactor);
    this.container.x = (this.game.width-this.container.width)/2;
    this.container.y = (this.game.height)-this.container.height-20;
  }


  checkGuess (e) {
    let guess = this.guess.value.toUpperCase();
    // make sure the choice is a valid character if not display ERROR
    if(validate(guess) === false) {
      this.error_txt.setText('Please enter a letter!');
      this.showErrors = true;
      this.clearInput();
    } else {
      this.showErrors = false;
    }

    // check to see if the letter has already been chosen, if not display ERROR
    if(_.contains(this.guesses, guess) === true) {
      this.error_txt.setText('You chose that letter already!');
      this.showErrors = true;
      this.clearInput();
    }

    // if the guess is valid and has not been tried already
    // check if the guess is in the mystery word
    if(this.showErrors === false) {
      this.guesses.push(guess);
      this.checkIfGuessIsCorrect(guess);
    }
  }

  checkIfGuessIsCorrect(guess){
    this.clearInput();
    // if guess is in the mystery word reveal the letter
    if(_.contains(this.game.MYSTERY_WORD.split(''), guess)) {
        // reveal the hidden letter(s)
        this.revealCorrectGuess(guess);
      } else {
        this.wrongGuess(guess)
    }
  }

  // if the letter is not in the mystery word add it to the guess to the 'Chosen letters" array'
  // its just a visual ref for the user to see which letters have been tried
  revealCorrectGuess(guess) {
    _.filter(this.game.MYSTERY_WORD.split(''), function(letter,index) {
      if(letter === guess) {
        // get a reference to the hidden letter
        let item = {
          sprite: this.container.getChildAt(index),
          x: this.container.getChildAt(index).x,
          y: this.container.getChildAt(index).y,
        }
        // create the revealed letter, using hidden letters x,y
        let newitem = this.add.sprite(item.sprite.x, item.sprite.y, 'letters', guess);
        // replace the hidden letter with the revealed letter
        this.container.replace(item.sprite,newitem);
        this.MYSTERY_WORD_CHECK.splice(index,1,guess);
      }
    },this);

    this.lettersChosen_txt.setText(this.guesses.toString());
    this.checkForWin();
  }

  wrongGuess(guess) {
    // decrement the guesses left count and display on screen
    this.NUM_GUESSES = this.NUM_GUESSES-1;
    // reveal a hangman body part, force it to a string > +''
    let part = this.data.bodyParts[this.NUM_GUESSES]+'';
    this.gallows.getByName(part.trim()).visible = true;
    if(this.NUM_GUESSES === 0) {
      // set message for game over state
      this.game.message = 'SORRY YOU\n LOSE!';
      // go to GameOver State
      this.gameOverTimer();
    }
    this.guessesLeft_txt.setText('Guesses Left: ' + this.NUM_GUESSES.toString(10));
    this.lettersChosen_txt.setText(this.guesses.toString());
    this.clearInput();
  }

  checkForWin(){
    // set ref to Mystery word to array
    let chars = [...this.game.MYSTERY_WORD];
    // compare to MYSTERY_WORD_CHECK array if _.difference = 0 game is Won!
    if(_.difference(chars, this.MYSTERY_WORD_CHECK).length === 0){
      // set message for game over state
      this.game.message = 'YOU WIN!!!';
      // go to GameOver State
      this.gameOverTimer();
    }
  }

  // reset the guess input text
  clearInput() {
    this.guess.resetText();
  }

  gameOverTimer(){
    this.time.events.add(Phaser.Timer.SECOND * 1.5, this.gameOver, this);
  }

  gameOver(){
    this.state.start('GameOver');
  }

  update () {
    if(this.showErrors === true) {
      this.error_txt.visible = true;
    } else {
      this.error_txt.visible = false;
    }
   // if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
   //  {
   //      alert('key');
   //  }

  }


  render () {
    if (__DEV__) {
          // this.game.debug.text(this.MYSTERY_WORD_CHECK.toString(), 20, 20, 'yellow', 'Segoe UI');


    }
  }
}
