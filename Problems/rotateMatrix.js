//we have a matrix
//rotate it without aditional array or matrices

function QuadricMatrix(){
  constructor = function(n){
    this.n = n;
    this.array = [];
  }

  this.init = function(){
    for(let i = 0; i < n ;++i){
      this.array[i] = 0;
    }
  }

  this.set = function(x,y, value){
    this.array[x * n + y] = value;  
  }
  this.get = function(x,y){
    return this.array[x * n + y];
  }
}

function rotateMatrix(matrix){
  let n = matrix.length;
  for(let i = 0; i < Math.floor(n / 2); ++i){
    for(let j = 0; j < Math.floor(n / 2); ++j){
      let first = matrix[i][j];
      let second = matrix[j][n - i - 1];
      let third = matrix[n - i - 1][n - j - 1];
      let fourth = matrix[n - j - 1][i];
      matrix[i][j] = fourth;
      matrix[j][n - i - 1] = first;
      matrix[n - i - 1][n - j - 1] = second;
      matrix[n - j - 1][i] = third;
    }
  }
  return matrix;
}

function testRotateMatrix(){
  let test1 = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]];
  let tentative1 = rotateMatrix(test1);
  let answer1 = [[13,9,5,1], [14,10,6,2], [15,11,7,3], [16,12,8,4]];
  for(let i = 0; i < answer1.length; ++i){
    let array = answer1[i];
    let array2 = tentative1[i];
    for(let j = 0; j < array.length; ++j){
      console.assert(array[j] == array2[j], "equals elements");
    }
  }
}

testRotateMatrix();


