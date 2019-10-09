<html>

<head>
</head>

<body>

<div id="solution">

</div>
</body>


<script type="text/javascript">

function generatePartitions(depth, tempSol, set, solutions) {
	//first we print the solution
  printSol(tempSol, solutions);  
  //
  if(depth >= set.length ) return;
    
  tempSol.push(set[depth]); 	  
  generatePartitions(depth + 1, tempSol, set, solutions);
  
  tempSol.pop();  
  generatePartitions(depth + 1, tempSol, set, solutions);  
}

//we can improve with a hash
function printSol(sol, solutions) {
	if(solutions.some(s => { 
  	if (s.length != sol.length) return false; 
    for(let i = 0; i < s.length; ++i) {
    	if(s[i] != sol[i]) return false;
    }
    return true;
  })) return ;
  
  const tempSol = [...sol]
  
  solutions.push(tempSol);
  
  let previousValue = document.getElementById("solution").innerHTML;
  document.getElementById("solution").innerHTML = previousValue + "<br>sol: " + sol.toString();	
}

let set = ["1", "2", "3"];
let solutions = [];

generatePartitions(0, [], set, solutions);
</script>

</html>


