//we have a rectangle dimension n x m
//what is the minimum number of squares to cover it?

function coverRectangleWithSquares(n,m){
  if(n < m) 
    return coverRectangleWithSquares(m,n);
  if(m == 1) 
    return n;
  return 1 + coverRectangleWithSquares(m, n-m);    
}

function test(){
  let test1 = coverRectangleWithSquares(5,3);
  console.assert(test1 == 4, true);
}

test();