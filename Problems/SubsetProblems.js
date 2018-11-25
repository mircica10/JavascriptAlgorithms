/*
Problem - es gibt ein array of Int
es wird  gefragt, ob die summer einer Untermenge des Arrays eine bestimmte Zahl ist
Beispiel - [4, -5, 7,2]
Zahl - -1
Antwort - Ja : 4 + (-5)
Input - ein Int Array
Output - eine Boolean Werte

*/


class SubsetProblem{
    constructor(inputArrayInt, target){
        this.arrayInt = inputArrayInt;
        this.target   = target;
    }
    sumSubarray(inputArray, inputIndexesInArray){
        var sum = 0;
        inputIndexesInArray.forEach(element => {
            sum += inputArray[element];
        });
        return sum;
    }
    eValid(subarrayIndices, indexToTry){
        if(subarrayIndices == 'undefined' || 
           subarrayIndices.length == 0 || 
           subarrayIndices[subarrayIndices.length - 1] < indexToTry){
            return true;
        }
        return false;
    }
    //klassic DFS
    solveBruteForce(inputArray, inputSubArray, target, k, n){
        if(this.sumSubarray(inputArray, inputSubArray) === target){
            return true;
        }
        if(k >= n){
            return false;
        }
        for(var i = 0; i < n; ++i){
            if (!this.eValid(inputSubArray, i)){
                continue;
            }
            inputSubArray.push(i);
            //return early, if solution found
            var response = this.solveBruteForce(inputArray, inputSubArray, target, k + 1, n);
            if(response){
                return true;
            }
            //backtrack
            inputSubArray.pop();            
        }    
        return false;
    }
    solveBruteForceHelper(){
        var subArray = [];
        var k = 0;
        var n = this.arrayInt.length;
        return this.solveBruteForce(this.arrayInt, subArray, this.target, k, n);
    }
    
    //afisare
    printMatrix(matrix, nrRows, nrCols){
        var line = ""; 
        for(var i = 0; i < nrRows; ++i){
            for(var j = 0; j < nrCols; ++j){
                if(matrix[i][j]){
                    line = line + " TRUE  ";
                } else {
                    line = line + " FALSE ";
                }
            }
            console.log(line);
            line = "";
        }
    }


    solveDP(){
        //DP formula
        //DP[i, s] = (current number == target) || 
        //           (DP[i - 1, s - current Number] == true ) || 
        //           (DP[i - 1, s] == true)  
        // s is sum and i is between min and max
        var sumMin    = 0;
        var sumMax    = 0;
        for(var i = 0; i < this.arrayInt.length; ++i){
            var elem = this.arrayInt[i];
            if(elem < 0){
                sumMin += elem;
            } else {
                sumMax += elem;
            }
        }

        var nrRows = this.arrayInt.length;
        var nrCols = sumMax - sumMin + 1;

        var offset = 0 - Math.min.apply(null, this.inputArray);
        var matrix = [];
        //init matrix
        for(var i = 0; i < nrRows; ++i){
            matrix[i] = [];
            for(var j = 0; j < nrCols; ++j){
                matrix[i][j] = false;
            }            
        }
        //DP
        for(var i = 1; i < nrRows; ++i){
            for(var j = 0; j < nrCols; ++j){
                var elem = this.arrayInt[i - 1] + offset;
                var elemPrecedent = matrix[i - 1][j];
                if( j - elem >= 0){
                    var elemPrecedentSumaPrecedenta = matrix[i - 1][j - elem - 1];
                    matrix[i][j] = elemPrecedent || elemPrecedentSumaPrecedenta;
                } else {
                    matrix[i][j] = elemPrecedent;
                }
            }   
        }   

        //this.printMatrix(matrix, nrRows, nrCols);
                
        //return what we look for
        var cond1 = (this.target >= sumMin);
        var cond2 = (this.target <= sumMax);
        var cond3 = matrix[nrRows - 1][this.target + offset - 1];
        return  cond1 && cond2 && cond3;
    }
}




class SubsetSumTest{
    constructor(){ }

    test1(){
        var test1 = [-7, -3, 1, 2, 5];
        var target1 = -8;
        var response1 = true;
        var s1 = new SubsetProblem(test1, target1);
        var try1 = s1.solveBruteForceHelper();
        if(try1 === response1){
            console.log("OK");
        } else {
            console.log("Not OK");
        }
        var try2 = s1.solveDP();
        if(try2 === response1){
            console.log("OK");
        } else {
            console.log("Not OK");
        }
                
    }
}

var test = new SubsetSumTest();
test.test1();
