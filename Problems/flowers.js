//we have n flowers
//create a buccket without consecutive numbers

function createBuckets(n){
  if(n == 0)
    return [[0]];
  let previousFunctions = createBuckets(n - 1);
  let newBuckets = [];
  newBuckets.push([n]);
  for(let i = 0; i < previousFunctions.length; ++i){
    let currentArray = previousFunctions[i];

    if(currentArray[currentArray.length - 1] + 1 != n){
      let newArray = copyArray(currentArray);
      newArray.push(n);
      newBuckets.push(newArray);
    }
  }
  return previousFunctions.concat(newBuckets);  
}

function copyArray(array){
  let newArray = [];
  for(let i = 0; i < array.length; ++i){
    newArray.push(array[i]);
  }
  return newArray;
}

function test(){
  let test1 = createBuckets(4);
  console.assert(test1.length == 12);  
}

test();