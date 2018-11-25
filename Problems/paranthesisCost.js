//implement the cost of the paranthesis in an expression
//the cost is defined as the sum of all costs of pair of paranthesis
//the cost of a pair of paranthesis is defined as the index difference between closed and open paranthesis
//we assume the expression is in the right format

function paranthesisCost(expression){
  let totalCostOfParanthesis = 0;
  let arrayIndexOpenParanthesis = [];
  for(let i = 0; i < expression.length; ++i){
    let current = expression[i];
    if("([{".includes(current)){
      arrayIndexOpenParanthesis.push(i);
    } else if (")}]".includes(current)){
      let openParanthesisIndex = arrayIndexOpenParanthesis.pop();
      totalCostOfParanthesis = totalCostOfParanthesis + (i - openParanthesisIndex);
    }
  }
  return totalCostOfParanthesis;
}

function test(){
  let test1 = "1+(2)";
  let answer1 = 2;
  console.assert(answer1 == paranthesisCost(test1));

  let test2 = "1+(2000)()";
  let answer2 = 6;
  console.assert(answer2 == paranthesisCost(test2));
  
  let test3 = "1+(2)*([3])";
  let answer3 = 8;
  console.assert(answer3 == paranthesisCost(test3));
  
}

test();