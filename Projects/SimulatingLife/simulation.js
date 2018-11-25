var Vector = require("./Vector");
var Grid = require("./Grid");
var Tiger = require("./Carnivores");
var World = require("./World");

var PlantModule = require("./PlantModule");
var Plant = PlantModule.Plant;
//var PlantEater = PlantModule.PlantEater;
var SmartPlantEater = PlantModule.SmartPlantEater;

var LifelikeWorld = require("./LifelikeWorld");

function Wall() {}

let valleyWithPredators = new LifelikeWorld([
"####################################################",
"#                 ####         ****              ###",
"#   *  @  ##                 ########       OO    ##",
"#   *    ##        O O                 ****       *#",
"#       ##*                        ##########     *#",
"#      ##***  *         ****                     **#",
"#* **  #  *  ***      #########                  **#",
"#* **  #      *               #   *              **#",
"#     ##              #   O   #  ***          ######",
"#*            @       #       #   *        O  #    #",
"#*                    #  ######                 ** #",
"###          ****          ***                  ** #",
"#       O                        @         O       #",
"#   *     ##  ##  ##  ##               ###      *  #",
"#   **         #              *       #####  O     #",
"##  **  O   O  #  #    ***  ***        ###      ** #",
"###               #   *****                    ****#",
"####################################################"],   
{"#": Wall, "@": Tiger, "O": SmartPlantEater, "*": Plant}
);

function runWorld(){
  valleyWithPredators.turn();
  return valleyWithPredators.toString();  
}

function testWorld(numberOfTimes, miliseconds, print){
  if(numberOfTimes < 0) 
    return;
  let world = runWorld();
  print(world);
  setTimeout(() => testWorld(numberOfTimes - 1, miliseconds, print), miliseconds);
};

testWorld(500, 1000, console.log);