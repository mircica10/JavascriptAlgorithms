var Vector = require("./Vector");

function Grid(width, heigth){
  this.space = new Array(width * heigth);
  this.width = width;
  this.heigth = heigth;
}
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &
         vector.y >= 0 && vector.y < this.heigth; 
};
Grid.prototype.get = function (vector) {
  return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};
Grid.prototype.forEach = function(f, context) {
  for(var y = 0; y < this.heigth; ++y){
    for(var x = 0; x < this.width; ++x){
      var value = this.space[x + y * this.width];
      if(value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
};

module.exports = Grid;