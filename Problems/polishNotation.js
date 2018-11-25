function polishFormPostfix(expression){
  let polishForm = [];
  let stack = [];
  
  let isOperator = function(character){
    return "+-()*/".includes(character);
  }

  let operatorPriority = function(operator){
    if (operator == ")" || operator == "(")  return 0;
    if (operator == "*" || operator == "/")  return 1;
    if (operator == "+" || operator == "-")  return 2;    
  }

  for(let i = 0; i < expression.length; ++i){
    let current = expression[i];
    if(!isOperator(current)){
      polishForm.push(current);
      continue;
    }
    
    stack.push(current);

    if(operatorPriority(current) == 2){
      let topStack = stack.pop();
      while( stack.length > 0 && operatorPriority(stack[stack.length - 1]) == 1 ) {
        polishForm.push(stack.pop());       
      }
      stack.push(topStack);      
    }

    if(current == ")"){
      stack.pop();
      while(stack.length > 0 && stack[stack.length - 1] != "(") {
        polishForm.push(stack.pop());
      }
      if(stack.length > 0 && stack[stack.length - 1] == "(") {
        stack.pop();
      }
    }
  }
  return polishForm;
}

function testPolishForm(form){
  let test1 = "(a*(b-c)+d/(e+f*h)-i))";
  let answer1 = polishFormPostfix(test1);
  console.log(answer1.toString());
}

//testPolishForm();

function evaluateExpression(expression){
  let polishPostfixForm = polishFormPostfix(expression);
  let stack = [];
  for(let i = 0; i < polishPostfixForm.length; ++i){
    let current = polishPostfixForm[i];
    if("+-*/".includes(current)){
      let operator1 = Number(stack.pop());
      let operator2 = Number(stack.pop());
      if(current == "+"){
        stack.push(operator1 + operator2);
      } else if(current == "-"){
        stack.push(operator1 - operator2);
      } else if(current == "*"){
        stack.push(operator1 * operator2);
      } else if(current == "/") {
        stack.push(operator1 / operator2);
      }
    }
    else{
      stack.push(current);
    }
  }
  return stack.pop();  
}

function testExpressionEvaluation(){
  let expression1 = "(5+3*2)";
  let answer1 = evaluateExpression(expression1);
  console.log(answer1);
}

//testExpressionEvaluation();

function createExpressionTree(expression){
  let expressionPolishForm = polishFormPostfix(expression);
  let expressionTreeObject = expressionTree(expressionPolishForm);
  return expressionTreeObject;
}

let Node = function(value, left, right){
  this.left = left;
  this.right = right;
  this.value = value;
}

function expressionTree(polishForm){  
  let stack = [];

  for(let i = 0; i < polishForm.length; ++i){
    let current = polishForm[i];
    if("+-*/".includes(current)){
      let newNode = new Node(current, stack.pop(), stack.pop());
      stack.push(newNode);
    } else {
      stack.push(current);
    }
  }
  return stack.pop();
}

function treePostOrderTraversal(node){
  if(!(node instanceof Node))
    return node;
  else {
    let leftSubtree = treePostOrderTraversal(node.left);
    let rightSubtree = treePostOrderTraversal(node.right);
    return rightSubtree + leftSubtree + node.value;
  }  
}


function polishFormExpressionTreeTest(){
  let test1 = "(a*(b-c)+d/(e+f*h)-i))";
  let answer1 = createExpressionTree(test1);
  
  console.assert(treePostOrderTraversal(answer1) == "abc-*defh*+/i-+");
}


polishFormExpressionTreeTest();