//read an array of numbers and return the numbers which appear odd times

function findOdd(array){
  let functionalArray = new Array(10000);
  let arrayWithOddValues = [];
  functionalArray.forEach( val => val = 0);

  array.forEach(value => ++functionalArray[value]);
  
  functionalArray.forEach( (value, index) => 
    { 
      if (value % 2 == 1)
        arrayWithOddValues.push(index);
    }
  );
  return arrayWithOddValues;
}

function test(){
  let input = [1,2,3,4,5,4,3,1,6,3,11,11,11];
  let test1 = findOdd(input);
  let answer1 = [2,3,5,6,11];
  test1.forEach((val, index) => console.assert(val == answer1[index]));
}

test();