// Stefan Emmons
// COSC-3020-01
// Lab 08
// 11-6-2019
// Rajiv Khadka
// PART 1, Code:

/*
  Much like Dijkstras Algorithm, this algorithm must begin with a matrix filled with infinite values as elements. This time, there is no 
  source node, and so each vertex in it's respective row must be marked as "0". An interesting feature to note with this program, 
  is that even if you supply a vertex that has an edge to itself, it will be ignored and still marked as a unique vertex. 
  The psuedocode for this lab was very helpful, and as we can see below, we begin be creating a |V| * |V| matrix of elements (infinity),
  and then mark all valid vertices as "0". We then take the valid weights of each edge, and compare the paths between node pairs, as 
  described in the psuedocode instructions. 
  The "dist" matrix is then passed off to a comprehensive print function that gives readable results between vertex pairs. 
*/

function floydWarshallAlgo(weightedGraph) {
    var verCount = weightedGraph.length;
    var distance = [];
    var dist = [];

    for(let i = 0; i < verCount * verCount; i++)
    {
        distance.push(Infinity);
    }

    for(let j = 0; j < verCount * verCount; j += verCount) {
        dist.push(distance.slice(j, j + verCount));
    }

    for(let v = 0; v < verCount; v++) {
        dist[v][v] = 0;
        for(let u = 0; u < verCount; u++) {
            if (weightedGraph[v][u] != -1 && dist[v][u] != 0) {
                dist[v][u] = weightedGraph[v][u];
            }
        }
    }

    for(let k = 0; k < verCount; k++) {
        for(let i = 0; i < verCount; i++) {
            for(let j = 0; j < verCount; j++) {
                if(dist[i][k] + dist[k][j] < dist[i][j] ) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    
    }
    betterConsoleLog(dist, verCount);
}


function betterConsoleLog(dist, verCount) {
    for (let i = 0; i < verCount; i++) {
        for(let j = 0; j <verCount; j++) {
            if(dist[i][j] == Infinity)
            console.log("G [" + i + "," + j + "]" + ": Never");
            else {
                console.log("G [" + i + "," + j + "]: " + dist[i][j]);
            }
        }
    }
}

/* 
   Before getting into this function, it should be noted that "-1" it meant to denote that a vertex either has an edge going into it,
   or has no edge to or from another vertex. This can be fixed to show "0", or "Infinity", or whatever works for you.
*/ 
function passGraph() {
    var graph1 = [
        [ 0,5, -1, 10 ],
        [ -1, 0, 3, -1 ],
        [ -1, -1, 0, 1 ],
        [ -1, -1, -1, 0 ]
    ];
    console.log("\nGraph #1:");
    floydWarshallAlgo(graph1);
    
   var graph2 = [
        [ 0, 3, -1, 7 ],
        [ 8, 0, 2, -1 ],
        [ 5, -1, 0, 1 ],
        [ 2, -1, -1, 0]
    ];
    console.log("\nGraph #2:");
    floydWarshallAlgo(graph2);

    // What happens when a node points to itself with a weighted edge? This algorithm should be structured such that this doesn't matter.
    var graph3 = [
        [ 2, 10, -1, 7, -1],
        [ -1, 3, -1, -1, 3 ],
        [ 6, 1, 0, -1, -1 ],
        [ -1, -1, 5, 2, 4 ],
        [-1, -1, 1, -1, 0 ]
    ];
    console.log("\nGraph #3:");
    floydWarshallAlgo(graph3);

    
}
passGraph();

/* 
  Unlike Dijkstras Algorithm, even if we have a matrix that is fully connected, the worst case runtime will not be Theta(|V|^2).
  Since we are using three iterative loops to analyze relationships between vertex pairs, we must consider the fact that we could have a 
  fully connected matrix, AND will require full iteration through all three loops. This will gives us a worst case runtime of Theta(|V|^3).
*/