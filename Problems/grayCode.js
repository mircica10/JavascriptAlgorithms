
function grayCodeRecursive(numberOfBits){
  if(numberOfBits == 1){
    return ["0", "1"];
  }
  let previousResult = grayCodeRecursive(numberOfBits - 1);
  let newResult = [];
  for(let i = 0; i < previousResult.length; ++i){
    newResult.push("0" + previousResult[i]);
  }
  for(let i = previousResult.length - 1; i >= 0; --i){
    newResult.push("1" + previousResult[i]);
  }
  return newResult;
}

function testRecursive(){
  let test1 = grayCodeRecursive(3);
  console.assert(test1.length == 8);
}
testRecursive();

function grayCodeToDecimal(numberOfBits){
  let greyCodeInBinary = grayCode(numberOfBits);
  let greyCodeInDecimal = [];
  greyCodeInBinary.forEach(element => {
    let decimal = convertFromBinaryToDecimal(element);
    greyCodeInDecimal.push(decimal);
  });
  return greyCodeInDecimal;
}

function grayCode(numberOfBits){
  let queue = ["0", "1"];
  let counter = 1;
  
  while(counter < numberOfBits){
    let temp = [];
    queue.forEach(element => temp.push(element));
    queue = [];
    
    for(let i = 0; i < temp.length; ++i)
      queue.push("0" + temp[i]);
    for(let i = temp.length - 1; i >= 0; --i)
      queue.push("1" + temp[i]);        
    
    ++counter;
  }
  return queue;
}

function convertFromBinaryToDecimal(numberInBinary){
  let numberInDecimal = 0;
  let powerOfTwo = 1;
  for(let i = numberInBinary.length - 1; i >= 0; --i){
    if(numberInBinary[i] == "1"){
      numberInDecimal = numberInDecimal + powerOfTwo;
    }
    powerOfTwo = powerOfTwo * 2;
  }
  return numberInDecimal;
}

function test(){
  let test1 = grayCodeToDecimal(3);
  let answer1 = [0,1,3,2,6,7,5,4];
  test1.forEach( (element, index) => console.assert(element == answer1[index]));
  let testConversion = convertFromBinaryToDecimal("1001");
  console.assert(testConversion == 9);
}

test();