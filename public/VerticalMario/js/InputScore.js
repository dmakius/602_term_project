var VerticalMario = VerticalMario || {};
VerticalMario.InputScoreState = {
  create: function(){
    this.highScores = VerticalMario.GameState.highScores;
    console.log(`INPUT Stage: score: ${VerticalMario.globalScore }`);
    //create score for game just played
    this.newScore = new Object();
    this.newScore.username = "YOU";
    this.newScore.score = VerticalMario.GlobalsScore;
    console.log(`INPUT Stage: score: ${ this.newScore.score}`);


    this.background = this.game.add.sprite(0,0, 'background');
     
    this.game.title = this.game.add.bitmapText(this.game.world.centerX, 50, "gameFont", "INPUT SCORE" , 48);
    this.game.title.anchor.setTo(0.5);
    this.game.title2 = this.game.add.bitmapText(this.game.world.centerX-150, this.game.world.centerY, "gameFont", "Name: " , 48);
    this.game.title2 = this.game.add.bitmapText(this.game.world.centerX-150, this.game.world.centerY + 50, "gameFont", "Score: "+  this.newScore.score , 48);


    this.username =  this.game.add.bitmapText(this.game.world.centerX-10, this.game.world.centerY, "gameFont", "" , 48);
    var username = this.username;
    this.game.input.keyboard.onPressCallback = function (letter, t, k) {
      username.setText(username.text += letter);
    };

    if(mobile){
      this.continueSign = this.game.add.bitmapText(this.game.world.centerX, 400, "gameFont", "Press Start to Continue", 28);
    }else{
      this.continueSign = this.game.add.bitmapText(this.game.world.centerX, 400, "gameFont", "Press SPACEBAR to Continue", 28);
    }
    
    this.continueSign.anchor.setTo(0.5);
    this.start = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    if(mobileGame){
      prompt();
    }

  },

  update:function(){

    if(this.start.isDown || startGame){
        console.log(this.username.text);
        $.ajax({
            type: "POST",
            url: '/Score/Create',
            data:{
              name: this.username.text,
              score: this.newScore.score
            },
            success: function(response){
                console.log(response);
            } 
        });
        this.game.state.start('ScoreState');
    }
  },

 
 
}