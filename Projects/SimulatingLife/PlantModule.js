var Vector = require("./Vector");
var Grid = require("./Grid");
var World = require("./World");
var randomElement = require("./Utils").randomElement;
var LifelikeWorld = require("./LifelikeWorld");


function Plant(){
  this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(context) {
  if(this.energy > 15){
    var space = context.find(" ");
    if(space)
      return {type: "reproduce", direction: space};      
  }
  if(this.energy < 20)
    return {type: "grow"};
};

function PlantEater(){
  this.energy = 20;
}
PlantEater.prototype.act = function(context) {
  var space = context.find(" ");
  if(this.energy > 60 && space)
    return {type: "reproduce", direction: space};
  var plant = context.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if(space)
    return {type: "move", direction: space};    
};
//will remember previous positions where no plants where and then try to move to a non visited positions
//if found a plant, 
function SmartPlantEater() {
  this.energy = 20;
  this.previousMoves = [];
}
SmartPlantEater.prototype.act = function(context) {
  var space = context.find(" ");
  if(this.energy > 60 && space)
    return {type: "reproduce", direction: space};
  var plant = context.find("*");
  if (plant){
    this.previousMoves = [];
    return {type: "eat", direction: plant};
  }
  let counter = 8;
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

module.exports = {
  Plant: Plant,
  PlantEater: PlantEater,
  SmartPlantEater: SmartPlantEater
};