//compute n power k , O(log n)

function calculateNumberToPower(n, k){
  if( k == 1){
    return n;
  }
  let newK = Math.floor(k / 2);
  let intermediate = calculateNumberToPower(n, newK); 
  if (k % 2 == 0) {
    return intermediate * intermediate;
  } else {
    return intermediate * intermediate * n;  
  }
}

function testPower() {
  let test1 = calculateNumberToPower(3,4);
  let test2 = calculateNumberToPower(3,3);
  console.assert(test2 == 27);
  console.assert(test1 == 81);
}
testPower();