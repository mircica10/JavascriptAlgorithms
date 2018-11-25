
function Stack(){
  this.internalArray = [];
}
Stack.prototype.push = function(number){
    this.internalArray.push(number);
}
Stack.prototype.pop = function(){
    return this.internalArray.pop();  
}
Stack.prototype.peek = function(){
    return this.internalArray[this.internalArray.length - 1];
}
Stack.prototype.isEmpty = function(){
    return this.internalArray.length == 0;
}
Stack.prototype.print = function(){
  this.internalArray.forEach((val) => console.log(val));
}


function manaPnueli(number){
  let value = 0;
  let stack = new Stack();
  stack.push(number);
  while(!stack.isEmpty()){
    let stackTop = stack.peek();
    if(stackTop >= 12){
      value = stack.pop() - 1;
      if(stack.isEmpty())
        break;
      stack.pop();
      stack.push(value);      
    } else {
      stack.push(stack.peek() + 2);
    }
  }
  return value;
}
function manaPnueliRecursive(number){
  if(number >= 12)
    return number - 1;
  else{
    let firstLevel = manaPnueliRecursive(number + 2);
    return manaPnueliRecursive(firstLevel);
  }  
}

function manaPnueliTest(){
  let test1 = manaPnueli(6);
  let test2 = manaPnueliRecursive(6);
  console.assert(test1 == "11", true);
  console.assert(test2 == "11", true);
}

manaPnueliTest();
