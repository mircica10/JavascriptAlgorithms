class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Vector{
    constructor(source, dest){
        this.source = source;
        this.dest   = dest;
        this.angle  = 0.0;
    }    
}

var helper = {
    //v1 = source - dest
    //v2 = source - point
    calculeazaUnghi = function (vector1, vector2){
        //shiftam vectorii la origine
        var v1 = new Vector(0, new Point(vector1.dest.x - vector1.source.x, vector1.dest.y - vector1.source.y));
        var v2 = new Vector(0, new Point(vector2.dest.x - vector2.source.x, vector2.dest.y - vector2.source.y));
        //x1*y2 - x2*y1
        var produsVectorial = v1.dest.x * v2.dest.y - v2.dest.x * v1.dest.y;
        //returnam cosinusul ca decimal
        return produsVectorial;
    },
    isLeftTurn = function(a,b,c){
        var v1    = new Vector(a,b);
        var v2    = new Vector(a,c);
        var unghi = calculeazaUnghi(v1, v2);
        return unghi > 0;
    },
    isRightTurn = function(a,b,c){
        return !isLeftTurn(a,b,c);
    }

}

class ConvexHull{
    constructor(points){
        this.points = points;    
    }
    
    solveGraham(){
        var puncte = this.points;
        var hull = [];
        
        var pivot    = puncte[0];
        var idxPivot = 0;

        for(var i = 0; i < puncte.length; ++i){   
            if(puncte[i].y < pivot.y){
               pivot    = puncte[i];
               idxPivot = i;
            } 
        }
        //ne trebuie o baza pentru calculul unghiului
        //avem pivotul, repsectiv cel mai sudic punct, deci cel mai mic y
        //acest vector va fi baza la care calculam unghiul dintre puncte
        //la final, salvam toti vectorii intr-un sir si ordonam sirul dupa unghiul facut cu vectorul mai sus mentionat
        //apoi aplicam algoritmul 
        var destLeftmost = idxPivot == 0 ? 1 : 0; 
        var vectorBaza = new Point(pivot, puncte[destLeftmost]); 
        
        var vectori = [];
        this.points.array.forEach(element => {
            var v   = new Vector(pivot, element);
            v.angle = helper.calculeazaUnghi(vectorBaza, v);
            vectori.push(v);
        }).sort( (v1, v2) => v1.angle - v2.angle );

        //avem in sirul vectori toti vectorii sortati dupa unghiul cu un vector ales intamplator
        //punctele primului vector sigur sunt parte a hull-ului        
        hull.push(vectori[0].source);
        hull.push(vectori[0].dest);

        for(var i = 1; i < vectori.length; ++i){
            //extragem cat timp se coteste la dreapta
            while(hull.length >= 2 &&
                helper.isRightTurn(hull[hull.length - 2], hull[hull.length - 1], vector1[i].dest)){
                    hull.pop();
            }
            //adaugam cand se coteste la stanga    
            hull.push(puncte[i]);
        }
        return hull;
    }

    solveBruteForce(){
        var puncte = this.points;
        var hullIndexes   = [];

        for(var i = 0; i < puncte.length; ++i){
            for(var j = i + 1; j < puncte.length; ++j){
                var leftPoints  = 0;
                var rightPoints = 0;
                
                for(var k = 0; k < points.length; ++k){
                    if(i != k && j != k){
                        if(helper.isLeftTurn(puncte[i], puncte[j], puncte[k])){
                            leftPoints++;
                        } else {
                            rightPoints++;
                        }
                    }
                }
                //if all points all on the left or right side, it means the vector ij is part of hull
                if(leftPoints == 0 || rightPoints == 0){
                    if(hullIndexes.indexOf(i) < 0){
                        hullIndexes.push(i);
                    }
                    if(hullIndexes.indexOf(j) < 0){
                        hullIndexes.push(j);
                    }
                }
            }
        }

        var hull = []
        hullIndexes.forEach(idx => hull.push(puncte[idx]));
        return hull;
    }

    solveDivideEtImperaHelper(points){
        var orderedPoints = points.sort((a,b) => a.x - b.x);
        return this.solveDivideEtImpera(orderedPoints);        
    }

    solveDivideEtImpera(orderedByxPoints){
        if(orderedByxPoints.length < 4){
            return orderedByxPoints;
        }
        var middle     = Math.floor(orderedByxPoints.length / 2);
        var firstHalf  = [];
        var secondHalf = [];
        for(var i = 0; i < middle; ++i){
            firstHalf.push(orderedByxPoints[i]);
        }  
        for(var j = middle; j < orderedByxPoints.length; ++j){
            secondHalf.push(orderedByxPoints[j]);
        }

        var hull1 = this.solveDivideEtImpera(firstHalf);
        var hull2 = this.solveDivideEtImpera(secondHalf);

        var merge = this.mergeHulls(hull1, hull2);
        return merge;
    }

    mergeHulls(h1, h2){
        //aflam limita superioara, apoi pe cea inferioara
        
        var rightmost = 0;
        for(var i = 0; i < h1.length; ++i){
            if(h1[i].x > h1[rightmost].x){
                rightmost = i;
            }
        }

        var leftmost = 0;
        for(var i = 0; i < h2.length; ++i){
            if(h2[i].x < h2[leftmost].x){
                leftmost = i;
            }
        }
        var nrLeft  = hull1.length;
        var nrRight = hull2.length;

        var idxCurrLeft  = leftmost
        var idxNextLeft  = (leftmost - 1 + nrLeft) % nrLeft;
        var idxCurrRight = rightmost;
        var idxNextRight = (rightmost + 1) % nrRight;
        var repeat = true;
        //limita superioara
        while(repeat){
            repeat = false;
            while(helper.isLeftTurn(hull1[idxCurrLeft], hull2[idxCurrRight], hull2[idxNextRight])){
                idxCurrRight = idxNextRight;
                idxNextRight = (idxNextRight + 1) % nrRight;                
            }
            while(helper.isRightTurn(hull2[idxCurrRight], hull1[idxCurrLeft], hull1[idxNextLeft])){
                idxCurrLeft = idxNextLeft;
                idxNextLeft = (idxNextLeft - 1 + nrLeft) % nrLeft;
                repeat = true;
            }
        }

        var limitaSuperioaraStanga = idxCurrLeft;
        var limitaSuperioaraDreapta = idxCurrRight;

        //limita inferioara
        
        idxCurrLeft  = leftmost
        idxNextLeft  = (leftmost + 1) % nrLeft;
        idxCurrRight = rightmost;
        idxNextRight = (rightmost - 1 + nrRight) % nrRight;
        repeat = true;

        while(repeat){
            repeat = false;
            while(helper.isRightTurn(hull1[idxCurrLeft], hull2[idxCurrRight], hull2[idxNextRight])){
                idxCurrRight = idxNextRight;
                idxNextRight = (idxNextRight - 1 + nrRight) % nrRight;                
            }
            while(helper.isLeftTurn(hull2[idxCurrRight], hull1[idxCurrLeft], hull1[idxNextLeft])){
                idxCurrLeft = idxNextLeft;
                idxNextLeft = (idxNextLeft + 1 ) % nrLeft;
                repeat = true;
            }
        }
        var limitaInferioaraStanga  = idxCurrLeft;
        var limitaInferioaraDreapta = idxCurrRight;

        var mergedHull = [];
        //mai intai h2
        if(limitaSuperioaraDreapta > limitaInferioaraDreapta){
            for(var i = limitaSuperioaraDreapta; i >= limitaInferioaraDreapta; --i){
                mergedHull.push(h2[i]);
            }
        } else {
            for(var i = limitaSuperioaraDreapta; i < limitaInferioaraDreapta; ++i){
                mergedHull.push(h2[i]);
            }
        }
        //apoi h1
        if(limitaSuperioaraStanga > limitaInferioaraStanga){
            for(var i = limitaSuperioaraStanga; i >= limitaInferioaraStanga; --i){
                mergedHull.push(h2[i]);
            }
        } else {
            for(var i = limitaSuperioaraStanga; i < limitaInferioaraStanga; ++i){
                mergedHull.push(h2[i]);
            }
        }
        //punctele sunt salvate in ordinea acelor de ceasornic
        return mergedHull;

    }

    solveJarvis(){
        var puncte = this.points;
        var hull   = [];
        puncte.sort((a,b) => a.x - b.x);
        //cel mai la stanga punct face parte din hull
        var pointOnHull = puncte[0];
        var  j = 0;
        do{
            hull.push(pointOnHull);
            var endpoint = puncte[0];
            for(var i = 1; i < puncte.length; ++i){
                if ( (JSON.stringify(endpoint) === JSON.stringify(punctPeHull) ) || 
                      helper.isLeftTurn(punctPeHull, endpoint, puncte[i]) ){
                    //noul punct e mai la stanga
                    endpoint = puncte[i];
                }                
            }
            pointOnHull = endpoint;                 
            ++j;
        }while(JSON.stringify(endpoint) !== JSON.stringify(puncte[0]) )
  
        return hull;
    }



}

class ConvexHullTest{






}