//we have a set n of n points
//find out the closest pair

(function(){

  function Point(x,y)
  {
    return {x: x, y: y};
  }
  
  function smallesDistanceBetweenTwoPointsBruteForce(arrayWithPoints)
  {
    let smallestDistance = Infinity;
    for(let i = 0; i < arrayWithPoints.length; ++i)
    {
      for(let j = i + 1; j < arrayWithPoints.length; ++j)
      {
        let distance = distanceBetweenPoints(arrayWithPoints[i], arrayWithPoints[j]);
        if(distance < smallestDistance) smallestDistance = distance;
      }
    }
    return smallestDistance;
  }
  
  function distanceBetweenPoints(pointA, pointB){
    let x = pointA.x - pointB.x;
    let y = pointA.y - pointB.y;
    return Math.sqrt(x*x + y*y);
  }

  function smallestDistanceRecursiveHelper(array){
    array.sort((a,b) => a.x - b.x);
    let start = 0;
    let end = array.length - 1;
    return smallestDistanceRecursive(start, end, array);
  }

  function smallestDistanceRecursive(a, b, array){
    if ( a >= b ) return Infinity;

    if ( (b - a) == 1) return distanceBetweenPoints(array[a], array[b]);

    let middle = a + Math.floor((b - a) / 2);
    let middleX = array[middle].x + (array[middle + 1].x - array[middle].x) / 2;

    let firstSet = smallestDistanceRecursive(a, middle, array);
    let secondSet = smallestDistanceRecursive(middle + 1, b, array);
    
    let minDist = Math.min(firstSet, secondSet);
    
    let stripLeft = BuildStrip(array, minDist, a, middle, middleX);
    let stripRight = BuildStrip(array, minDist, middle + 1, b, middleX);
    
    for(let i = 0; i < stripLeft.length; ++i){
      for(let  j = 0; j < stripRight.length; ++j){
        let currentDistance = distanceBetweenPoints(stripLeft[i], stripRight[j]);
        if (minDist > currentDistance) { minDist = currentDistance; }  
      }
    }
    return minDist;      
  }

  function BuildStrip(array, minimumDistance, startIndex, endIndex, middleX){
    let stripe = [];
    for(let i = startIndex; i <= endIndex; ++i){
      if(Math.abs(array[i].x - middleX) <= minimumDistance )
        stripe.push(array[i]);
    }
    return stripe;
  }

  function test(){
    let generatePoints = function(n, limit){
      let points = [];
      for(let i = 0; i < n; ++i){
        let x = Math.ceil(Math.random() * limit);
        let y = Math.ceil(Math.random() * limit);
        let point = new Point(x, y);
        points.push(point);
      }
      return points;
    };

    let points = generatePoints(10,40);
    
    let solveBruteForce = smallesDistanceBetweenTwoPointsBruteForce(points);
    console.log(solveBruteForce);
    let solveDivideEtImpera = smallestDistanceRecursiveHelper(points);
    console.log(solveDivideEtImpera);
    console.assert(solveBruteForce == solveDivideEtImpera);
  };
  test();
})();