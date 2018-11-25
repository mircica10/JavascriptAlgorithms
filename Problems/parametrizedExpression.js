//check if an expression is correctly parametrized, e.g. the paranthesis are in right number and place

function parametrizedExpression(array){
  let openParanthesis = [];
  let matchParanthesis = {")":"(", "]":"[", "}":"{"};
  for(let i = 0; i < array.length; ++i){
    if("({[".includes(array[i])){
      openParanthesis.push(array[i]);
    } else if (")}]".includes(array[i])) {
      if(openParanthesis.length == 0 || 
         matchParanthesis[array[i]] != openParanthesis[openParanthesis.length - 1]) { 
        return false;   
      }  
      openParanthesis.pop();      
    }      
  }
  return openParanthesis.length == 0;
}

function test(){
  let test1 = "1+(20*3-(-1))";
  let answer1 = parametrizedExpression(test1);
  console.assert(answer1 == true, true);
  
  let test2 = "1+(20*3-(-1)";
  let answer2 = parametrizedExpression(test2);
  console.assert(answer2 == false, false);
  
  let test3 = "1+20*3-({[(-1)]})";
  let answer3 = parametrizedExpression(test3);
  console.assert(answer3 == true, true);
  
  let test4 = "1+20*3-(-1}";
  let answer4 = parametrizedExpression(test4);
  console.assert(answer4 == false, false); 

}

test();