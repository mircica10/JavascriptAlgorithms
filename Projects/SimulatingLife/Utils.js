let Vector = require("./Vector");

var directions = {
  "n": new Vector(0, -1),
  "ne": new Vector(1, -1),
  "e": new Vector(1, 0),
  "se": new Vector(1, 1),
  "s": new Vector(0, 1),
  "sw": new Vector(-1, 1),
  "w": new Vector(-1, 0),
  "nw": new Vector(-1, -1)
};

function elementFromChar(legend, ch){
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;  
}
function charFromElement(element){
  if (element == null)
    return " ";
  else
    return element.originChar;  
}

function randomElement(array){
  return array[Math.floor(Math.random() * array.length)];
}


module.exports = {directions: directions,
elementFromChar: elementFromChar,
charFromElement: charFromElement,
randomElement: randomElement
};