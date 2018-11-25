var View = require("./View");
var actionTypes = require("./actionTypes");
var World = require("./World");
var PlantModule = require("./PlantModule");
var Plant = PlantModule.Plant;
var PlantEater = PlantModule.PlantEater;
var SmartPlantEater = PlantModule.SmartPlantEater;
var Tiger = require("./Carnivores");

var Grid = require("./Grid");
var Vector = require("./Vector");
var elementFromChar = require("./Utils").elementFromChar;
var directions = require("./Utils").directions;
var charFromElement = require("./Utils").charFromElement;


function LifelikeWorld(map, legend){
  World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

LifelikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action && action.type in actionTypes && 
                actionTypes[action.type].call(this, critter, vector, action);
  if(!handled){
    critter.energy -= 0.2;
    if(critter.energy <= 0)
      this.grid.set(vector, null);
  }
};

module.exports = LifelikeWorld;