
var View = require("./View");
var actionTypes = require("./actionTypes");

function Tiger(){
  this.energy = 150;
  this.previousMoves = [];
}
Tiger.prototype.act = function(context) {
  var space = context.find(" ");
  if(this.energy > 170 && space)
    return {type: "reproduce", direction: space};
  var plantEater = context.find("O");
  if (plantEater){
    this.previousMoves = [];
    return {type: "eat", direction: plantEater};
  }
  let counter = 20;
  while(counter > 0){
    if(this.previousMoves.indexOf(context.vector) == -1){
      this.previousMoves.push(context.vector);
      return {type: "move", direction: space};
    }
    space = context.find(" ");
    counter--;  
  }
  if(space){
    return {type: "move", direction: space};
  }    
};

module.exports = Tiger;