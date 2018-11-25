//calculate n power k modulo p in O(log k), n,p,k < 1.000.000.000

//the idea is to keep just the last 10 digits

function calculateModulo(n, k, p){
  if(k == 1) 
    return n;
  let half = calculateModulo(n, Math.floor(k / 2), p) % p;
  return ( k % 2 == 1) ? (n * half * half) % p : (half * half) % p;  
}

function testCalculateModulo(){
  let n = 13;
  let k = 11;
  let p = 99999;
  let answer1 = calculateModulo(n,k,p);
  console.assert(answer1 == 15820);
}
testCalculateModulo();
