//we have a matrix representing a park
//we have squares of 1 m in the park
//some squares have trees
//find out the minimum road between 2 points

function Square(x,y){
  this.x = x;
  this.y = y;
  return {
    x : this.x,
    y : this.y
  }
}

function getMinimumRoad(matrix, start, end){
  let queue = [];
  //let nextPositionArray = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
  let nextPositionArray = [[-1,0], [0,1], [1,0], [0,-1]];
  
  queue.push(new Square(start.x, start.y));
  while(queue.length > 0){
      let currentPosition = queue.shift();
      if(currentPosition.x == end.x && currentPosition.y == end.y){
      return matrix[currentPosition.x][currentPosition.y];
    }
    for(let i = 0; i < nextPositionArray.length;++i){
      let next = nextPositionArray[i];
      let currentValue = matrix[currentPosition.x][currentPosition.y];
      let nextPosition = new Square(currentPosition.x + next[0], currentPosition.y + next[1]);

      if( nextPosition.x >= 0 && nextPosition.x < matrix.length &&
          nextPosition.y >= 0 && nextPosition.y < matrix.length &&
          matrix[nextPosition.x][nextPosition.y] == 0 ){
            matrix[nextPosition.x][nextPosition.y] = currentValue + 1;
            queue.push(nextPosition); 
        }  
    }
  }
  return -1;
}

function testParkRoad(){
  let matrix = [ [1,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,-1,0],
                 [0,0,-1,0,0,0,0,0],
                 [0,0,0,0,0,-1,0,0],
                 [0,0,0,-1,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,-1,0,-1,0,0,0],
                 [0,0,0,0,0,-1,0,0] ];
  
  let start = {x:0, y:0};
  let end = {x:7, y:7};
  let answer = getMinimumRoad(matrix, start, end);
  console.assert(answer == 15);
  
 //printMatrix(matrix);               
}

function printMatrix(matrix){
  console.log("#############################");
  for(let i = 0; i < matrix.length; ++i){
    let row = matrix[i];
    console.log(row);
  }
}


testParkRoad();

