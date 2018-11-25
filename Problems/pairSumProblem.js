//let it be a set of n numbers, n>=3
//we have the sum of pairs of numbers, e.g sum(ai + aj), where i!=j
//find out the numbers


function generateNumberHelper(pairSums){
  let cardinalityAndSum = getSumOfNumbers(pairSums);
  let numberOfNumbers = cardinalityAndSum[0];
  let sumOfNumbers = cardinalityAndSum[1];
  let solution = [];
  let temporarySolution = [];

  generateNumbers(numberOfNumbers, 0, sumOfNumbers, pairSums, solution, temporarySolution);
  return solution;
}

function getSumOfNumbers(pairSumArray){
  let sum = 0;
  for(let i = 0; i < pairSumArray.length; ++i){
    sum = sum  + pairSumArray[i];
  }
  let arrayLength = pairSumArray.length;
  let numberOfPairs = arrayLength;
  let delta = 1 + 8 * numberOfPairs;
  let setCardinality = Math.floor( (1 + Math.floor(Math.sqrt(delta) ) )  / 2 ); 
  return [setCardinality ,sum / (setCardinality - 1)];
}



function testSumOfNumbers(){
  let test1 = [6, 105, 11, 101, 110, 15];
  let answer1 = getSumOfNumbers(test1)[1];
  console.assert(answer1 == 116, true);
}
testSumOfNumbers();


function generateNumbers(n, k, sumOfNumbers, pairSums, solution, temporarySolution){
  if(k == n){
    if( checkSum(temporarySolution, sumOfNumbers) ){ 
      solution.push(copyArray(temporarySolution));
    }         
  } else {
    let firstNumber = k == 0 ? 1 : temporarySolution[temporarySolution.length - 1];
    for(let i = firstNumber; i < sumOfNumbers; ++i){
      let allSumsAddUpOk = allSumsAddsUp(i, temporarySolution, pairSums);
      if(allSumsAddUpOk || k == 0){
        temporarySolution.push(i);
        generateNumbers(n, k + 1, sumOfNumbers, pairSums, solution, temporarySolution);
        
        temporarySolution.pop();
      }
    }
  }  
}

function checkSum(temporaryArray, targetSum){
  let temporarySum = 0;
  temporaryArray.forEach(element => {
    temporarySum += element;
  });
  return temporarySum == targetSum;
}

function allSumsAddsUp(newElement, temporarySolution, pairSums){
  let pairSumsTemp = [];
  for(let i = 0; i < pairSums.length; ++i)
    pairSumsTemp.push(pairSums[i]);
  
  for(let i = 0; i < temporarySolution.length; ++i){
    let searchElement = newElement + temporarySolution[i];
    let indexFound = pairSumsTemp.indexOf(searchElement); 
    if(indexFound < 0){
      return false;      
    } else {
      pairSumsTemp = removeAt(pairSumsTemp, indexFound);
    }
  }
  return true;  
}

function removeAt(array, index){
  let newArray = [];
  for(let i = 0; i < array.length; ++i){
    if(i != index){
      newArray.push(array[i]);      
    }
  }
  return newArray;
}

function copyArray(temp){
  let newSolution = [];
  for(let i = 0; i < temp.length; ++i)
    newSolution.push(temp[i]);
  return newSolution;
}

function test(){
  let test = [6, 105, 11, 101, 110, 15];
  let tentative =  generateNumberHelper(test);
  let answer = [1, 5, 10, 100];
  console.assert(tentative.length == 1);
  for(let i = 0; i < tentative[0].length; ++i){
    console.assert(tentative[0][i] == answer[i], true);    
  }
}

test();


