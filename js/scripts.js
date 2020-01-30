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

Game.prototype.evaluateWinner = function(){
  var player = this.getCurrentPlayer();
  var newestSpot = this.currentSelection;
  console.log(newestSpot);
  console.log(this.getSpotString(newestSpot));

  if (this.getSpotString(0) === player && this.getSpotString(1) === player && this.getSpotString(2) === player) {
    return player;
  } else if (this.getSpotString(3) === player && this.getSpotString(4) === player && this.getSpotString(5) === player) {
    return player;
  } else if (this.getSpotString(6) === player && this.getSpotString(7) === player && this.getSpotString(8) === player) {
    return player;
  } else if (this.getSpotString(0) === player && this.getSpotString(3) === player && this.getSpotString(6) === player) {
    return player;
  } else if (this.getSpotString(1) === player && this.getSpotString(4) === player && this.getSpotString(7) === player) {
    return player;
  } else if (this.getSpotString(2) === player && this.getSpotString(5) === player && this.getSpotString(8) === player) {
    return player;
  } else if (this.getSpotString(0) === player && this.getSpotString(4) === player && this.getSpotString(8) === player) {
    return player;
  } else if (this.getSpotString(2) === player && this.getSpotString(4) === player && this.getSpotString(6) === player) {
    return player;
  } else {
    return "none";
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
  var winner = game.evaluateWinner();
  console.log("winner:",winner)
  console.log(game.currentTurn);
  if (winner === "x" || winner === "o"){
    $("#gameOverScreen").show();
    $("#submitTurnButton").hide();
    if (winner === "x"){
      $("#p1Win").show();
    } else if (winner === "o"){
      $("#p2Win").show();
    }
   return true;
  } else if (game.currentTurn >= 9) {
    $("#gameOverScreen").show();
    $("#submitTurnButton").hide();
    console.log("in tie");
    $("#tieGame").show();
    return true;
  } else {
    return false;
  }
}

function resetBoard(){
  for(var i=0; i<=8; i++){
    $(`#${i}`).text("");
  }
  $("#submitTurnButton").show();
}

$(document).ready(function(){
  $("#startButton").click(function(){
    game = new Game();
    resetBoard();
    $("#startScreen").hide();
    $("#boardScreen").show();
    $("#gameOverScreen").hide();
    $("#p1Win").hide();
    $("#p2Win").hide();
    $("#tieGame").hide();
  });

  $(`#boardGame`).on("click", ".col", function() {
    console.log(`clicked ${this.id} spot`);
    markSpot(this.id);
  });

  $("#submitTurnButton").click(function(){
    if (game.currentSelection !== -1) {
      game.spots[game.currentSelection] = game.getCurrentPlayer();

      if (game.currentTurn >= 5){
        isGameOver();
      }
      game.currentSelection =-1;
      game.currentTurn++;
      console.log(game);
    }
  });
 
  $("#playAgain").click(function(){
    $("#gameOverScreen").hide();
    $("#boardScreen").hide();
    $("#startScreen").show();
  });

});