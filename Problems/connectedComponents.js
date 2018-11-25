class ConnectedComponents{
//input - matrix with 0 and 1
//walk only oizontal and vertical
//get the number of connected components

    constructor(matrix){
        this.matrix    = matrix;
        this.nrColumns = matrix[0].length;
        this.nrRows    = matrix.length / matrix[0].length;
    }

    solveDfs(){
        var nrIslands = 0;
        var visited   = [];
        
        for(var i = 0; i < this.nrRows; ++i){
            var linie = [];
            for(var j = 0; j < this.nrColumns; ++j){
                linie.push(0);
            }
            visited.push(linie);
        }

        for(var i = 0; i < this.nrRows; ++i){
            for(var j = 0; j < this.nrColumns; ++j){
                if(this.matrix[i,j] == 1 && visited[i,j] == 0){
                    this.dfs(this.matrix, visited, i, j);
                    ++nrIslands;
                }
            }
        }
        return nrIslands;
    }

    eValid(matrix, visited, x,y){
        if(x < 0 || y < 0 || x >= this.nrRows || y >= this.nrColumns){
            return false;
        }
        if(visited[x,y] == 1 || this.matrix[x,y] == 0){
            return false;
        }
        return true;
    }

    dfs(matrix, visited, x, y){
        visited[x,y] = 1;
        if(this.eValid(matrix, visited, x + 1, y)){
            dfs(matrix, visited, x + 1, y    );
        }
        if(this.eValid(matrix, visited, x - 1, y)){
            dfs(matrix, visited, x - 1, y    );
        }
        if(this.eValid(matrix, visited, x, y - 1)){
            dfs(matrix, visited, x    , y - 1);
        }
        if(this.eValid(matrix, visited, x, y + 1)){
            dfs(matrix, visited, x    , y + 1);
        }
    }
    

}