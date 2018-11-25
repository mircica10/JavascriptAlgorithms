//we have an permutation of set n with some inversion
//find out the number of inversions

function findInversionsInPermutation(array){
  let copyArray = [];
  array.forEach(element => copyArray.push(element));
  array.sort((a,b) => a-b);
  let elementsWithSamePositions = 0;
  
  for(let i = 0; i <  array.length; ++i)
    if(copyArray[i] == array[i])
      elementsWithSamePositions++;

  return Math.ceil((array.length - elementsWithSamePositions) / 2);
}

function testInversionInPermutation(){
  let test1 = [1,2,3,4];
  let test2 = [3,1,2];
  let test3 = [2,1];
  let answer1 = 0;
  let answer2 = 2;
  let answer3 = 1;
  console.assert(answer1 == findInversionsInPermutation(test1));
  console.assert(answer2 == findInversionsInPermutation(test2));
  console.assert(answer3 == findInversionsInPermutation(test3));
  
}

testInversionInPermutation();
