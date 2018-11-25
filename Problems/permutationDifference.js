//generate permutations of first n numbers where 
//the difference between 2 consecutive numbers is smaller than d

function generatePermutationHelper(n, d){
  let temporarySolution = [];
  let solution = [];
  let k = 0;
  generatePermutation(n, k, d, temporarySolution, solution);
  return solution;
}

function generatePermutation(n, k, d, temporarySolution, solution){
  if(n == k){
    addToSolution(temporarySolution, solution);
  } else {
    for(let i = 0; i < n; ++i){
      if(temporarySolution.indexOf(i) < 0){
        if(temporarySolution.length == 0 || 
          ( Math.abs(i - temporarySolution[temporarySolution.length - 1]) <= d ) ){
            temporarySolution.push(i);
            generatePermutation(n, k + 1, d, temporarySolution, solution);
            temporarySolution.pop();
        }
      }
    }
  }
}

function addToSolution(newSolution, arrayOfSolution){
  let newArray = [];
  newSolution.forEach(element => newArray.push(element));
  arrayOfSolution.push(newArray);
  //return arrayOfSolution;
}

function testPermutationDifference(){
  let n = 3;
  let d = 1;
  let test = generatePermutationHelper(n,d);
  console.assert(test.length == 2);
}

testPermutationDifference();