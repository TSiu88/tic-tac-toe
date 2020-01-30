// Business Logic -----------------------
function Game(){
  this.spots = ["", "", "", "", "", "", "", "", ""];
  this.currentTurn = 1;
  this.currentSelection = -1;
}

Game.prototype.getCurrentPlayer = function(){
  if(this.currentTurn%2 === 1){
    return "x";
  }else{
    return "o";
  }
}

Game.prototype.getSpotString = function(spotNumber){
  return this.spots[spotNumber];
}

Game.prototype.checkSpotEmpty = function(spotNumber){
  if(this.spots[spotNumber] === ""){
    return true;
  }else{
    return false;
  }
}

Game.prototype.evaluateWin = function(){
  var player = this.getCurrentPlayer();
  var newestSpot = this.currentSelection;
  if (newestSpot === 4){
    if ((this.getSpotString(1) === player && this.getSpotString(7) === player) || (this.getSpotString(3) === player && this.getSpotString(5) === player) || (this.getSpotString(2) === player && this.getSpotString(6) === player) || (this.getSpotString(0) === player && this.getSpotString(8) === player)) {
      return player;
    } else {
      console.log("no winner");
    }
  } else if (newestSpot%2 === 0){
    if (true) {
      // check edges
    }
  } else { //already checked center cross
    console.log("no winner")
  }
}

// User Interface Logic -----------------
var game = new Game();

function markSpot(spotNumber){
  if(game.checkSpotEmpty(spotNumber) === true){
    if ($(`#${spotNumber}`).text()){
      $(`#${spotNumber}`).text("");
      game.currentSelection = -1;
    } else {
      if (game.currentSelection === -1) {
        $(`#${spotNumber}`).text(game.getCurrentPlayer());
        game.currentSelection = spotNumber;
      }
    }
  }
  console.log(game.currentSelection);
    // alert("Invalid move! Spot already filled.");
}

function isGameOver(){

  // 
  if (game.currentTurn === 9){
    return true;
  }else{
    return false;
  }
}

$(document).ready(function(){
  $("#startButton").click(function(){
    game = new Game();
    // $("#startScreen").hide();
    // $("#boardScreen").show();
    // $("#gameOverScreen").hide();
  });

  $(`#boardGame`).on("click", ".col", function() {
    console.log(`clicked ${this.id} spot`);
    markSpot(this.id);
  });

  $("#submitTurnButton").click(function(){
    if (game.currentSelection !== -1) {
      game.spots[game.currentSelection] = game.getCurrentPlayer();

      if (game.currentTurn > 5){
        isGameOver();
      }

      game.currentSelection =-1;
      game.currentTurn++;
      console.log(game);

    }
  });
 

});