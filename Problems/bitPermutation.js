//we read 2 numbes and return if the second is a bit permutation of the first

function bitPermutation(input, output){
  let permutations = generateBitPermutation(input);
  let outputBase2 = convertFrom10To2Base(output);
  for(let i = 0; i < permutations.length; ++i){
    if(compare2Permutations(permutations[i], outputBase2))
      return true;
  }
  return false;
}

function generateBitPermutation(input){
  let allPermutationWithOneBit = [];
  let inputBase2 = convertFrom10To2Base(input);
  for(let i = 0; i < inputBase2.length - 1; ++i){
    let firstBit = inputBase2[0];
    let newPermutation = inputBase2.splice(1);
    newPermutation.push(firstBit);
    allPermutationWithOneBit.push(copyArray(newPermutation));
    inputBase2 = newPermutation;
  }
  return allPermutationWithOneBit;
}

function copyArray(initialArray){
  let copyArray = [];
  initialArray.forEach((x) => copyArray.push(x));
  return copyArray;
}

function convertFrom10To2Base(numberInBase10){
  let numberInBase2 = [];
  while(numberInBase10 > 0){
    numberInBase2.unshift(numberInBase10 % 2);
    numberInBase10 = Math.floor(numberInBase10 / 2);
  }
  return numberInBase2;
}

function compare2Permutations(first, second){
  if(first.length < second.length){
    first = padArray(first, 0, second.length - first.length);
  }
  if(second.length < first.length){
    second = padArray(second, 0, first.length - second.length);
  }

  for(let i = 0; i < first.length; ++i){
    if(first[i] != second[i])
      return false;
  }
  return true;
}

function padArray(array, char, numberOfTimes){
  for(let i = 0; i < numberOfTimes; ++i)
    array.unshift(char);
  return array;  
}

function test(){
  let testTrue = bitPermutation(13, 7);
  let testFalse = bitPermutation(8, 7);
  console.assert(testTrue == true, true);
  console.assert(testFalse == false, false);
}

test();