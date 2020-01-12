/* Chance McCormick: W03460977
      Stefan Emmons: W09667541
      Brent Pearce: W08407961
      COSC 3020
      Assigment #3
      12-06-2019
      Problem #1
      Dr. KottHoff
*/

/* This Hamiltonian path problem utilizes bitmasking to represent sets of cities, this is what the 
   power function is used for, in an effort to create a cache designed for masked city sets. An end condition, in this case
   our target, is also assigned a bitmasked value. Start is always set to zero (so no, I couldn't figure out a way to have
   any city be the start). This approach appears to allow for slightly greater values of "n" to be computed before
   memory overflow occurs, although not by much. As can be seen in our comparison file, the memory limit for this
   particular function in javascript is 26 cities. This script appears to run exceptionally well, up until about 22 cities.

*/


// Set up source and target node, cache, cache key, and establish catches for edge cases.
function tsp_hk(distance_matrix) {
    var n = distance_matrix.length;
    var cache = createMatrix(Math.pow(2, n), n);
    var end = (Math.pow(2, n)) - 1;
    var key = 1;
    var start = 0;

    console.time("Time for this round is ")
    

    if(distance_matrix.length < 2) {
        return "Cannot calculate path for one or less cities!";
    }

    if(distance_matrix.length == 2) {
        var firstPath = distance_matrix[0][1];
        var secondPath = distance_matrix[1][0];
        if(firstPath > secondPath){
            return "Only one path: " + secondPath;
        }
        if(firstPath < secondPath) {
            return "Only one path: " + firstPath;
        }
    }


    var minCost = (heldKarp(key, start, cache, distance_matrix, end));
    return "Optimal path is " + minCost;
}

// This is technically a Hamiltonian path problem, and so this function uses memoization paired with the pseudocode given in the instruction file.
// The only difference, is that it has been slightly modified to accomodate for bitmasked city sets. 
function heldKarp(key, start, cache, distance_matrix, end)
{

    // Return condition for when target has been reached, do not add the path back to start.
    if(key == end) {
        return 0;
    }
    // Return cached answer if previously calculated
    if(cache[key][start] != undefined) {
        return cache[key][start];
    }
    
    var optimalDist = Infinity;
    
   
    for(var i = 0; i < distance_matrix.length; i++)
    {
        // If the next node has not been visited, carry out another recursive call, and perform a comparison
        // on the distance calculated by this call. 
        if((key & (Math.pow(2, i))) == 0)
        {
            var thisDist = (heldKarp((key | Math.pow(2, i)), i, cache, distance_matrix, end) + distance_matrix[start][i]);
            if(thisDist < optimalDist) {
                optimalDist = thisDist;
            }
        }
    }
    // Update cache, as was seen in the Knapsack Problem
    return cache[key][start] = optimalDist;
}

// This implementation has a worst case time complexity of O(2^n * n), with a worst case memory complexity of O(2^n)

// Simple function used to create a cache matrix.
function createMatrix(row, col) {
    var matrix = new Array(row);

    for(var i = 0; i < row; i++)
    {
        matrix[i] = new Array(col);
    }
    return matrix;
}

// Handy matrix generator for really big n values.
function adjMatrixGenerator(n)
{
    //var numOfVertices = n;
    var adjMatrix = [];
   
    for(var i = 0; i < n; i++)
    {
        adjMatrix[i]=[]; 
        for(var k = 0; k < n; k++)
        {
            adjMatrix[i][k]=Math.floor(Math.random()*10)+1; // generates a random weight from 1 to 10
            if (i == k)
            {
                adjMatrix[i][k] = 0;  
            }
        }
    }
    return adjMatrix;
}

function passGraph() {
    
    var weightedGraph3 = adjMatrixGenerator(20);
    console.log(tsp_hk(weightedGraph3));

}
passGraph();

console.timeEnd("Time for this round is ")
