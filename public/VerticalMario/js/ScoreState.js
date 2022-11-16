var VerticalMario = VerticalMario || {};
VerticalMario.ScoreState = {
  preload: function(){
    console.log("geting scores from API ->");
    $.ajax({
      type: "GET",
      url: '/GetScores',
      async: false,
      success: function(response){
          VerticalMario.GameState.highScores = response;
      }
      });
  },
  
  create: function(){
    this.highScores = VerticalMario.GameState.highScores;
    console.log("DATA FROM API");
    console.log(this.highScores);

    this.background = this.game.add.sprite(0,0, 'background');
    this.game.title = this.game.add.bitmapText(this.game.world.centerX, 50, "gameFont", "High Scores" , 36);
    this.game.title.anchor.setTo(0.5);

    
      for(var x = 0; x < 5;x++){
        if(this.highScores.length > x){
          this.game.add.bitmapText(50, 50*x + 100, "gameFont", this.highScores[x].name , 28);
          this.game.add.bitmapText(550, 50*x + 100, "gameFont",  this.highScores[x].score , 28);
        }
        
      }

    this.continueSign = this.game.add.bitmapText(this.game.world.centerX, 400, "gameFont", "Press SPACEBAR to Replay", 28);
    this.continueSign.anchor.setTo(0.5);
    this.start = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  

  update:function(){

    if(this.start.isDown){
      this.game.state.start('MenuState');
    }
  }
}