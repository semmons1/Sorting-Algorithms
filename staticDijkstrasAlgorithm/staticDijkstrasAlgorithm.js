// Stefan Emmons
// COSC-3020-01
// Lab 07
// 10-31-2019
// Rajiv Khadka
// PART 1, Code:


/* 
This program has been split into three functions. @shortestPath for finding the individual index of the nodes that follow the shortest 
path of weights, and another containing the "work" done by Dijkstra's algorithm, @dijkstrasAlgo. This work is primarily traversing through all 
immediate nodes and calling upon the @shortestPath function to find the shortest path between them. Hence it's greedy nature.
We can see that this is the case because if @shortestPath is called only once, it will only determine the paths that are immediately
visible from our source node, which in this case is always node #0.
Our third and final function, @betterConsoleLog, serves to give a structed output of our nodes, and their shortest distance from source.

In the TL;DR format, pertaining to the psuedocode given in class:
@shortestPath initializes the dist to each vertex as infinity, and the dist to source is passed to this function as zero.
Based on the iteration cycle of Dijkstras Algorithm, all neighboring nodes have their weights analyzed, and updated in a "dist" tree 
(shortestPathTree array). Select the unmarked vertex "v" (visited == false), and return the index. 
Do this repeatedly until the BFS sequence of Dijkstras algorithm has finished, and no nodes are left unmarked.

@dijkstrasAlgo will take in the weighted graph, along with creating arrays for node distances and visitation flags. Use the number of nodes in the graph
to size these arrays (a global variable is used to do this, I know, bad). Initialize source node to zero, and perform a BFS-like iterative sequence.
Each execution of this sequence will call upon the @shortestPath function to update the shortest distances between nodes. 
Then, for each edge (x,j), dist(j) =  dist(x) + weight of (x,j).
*/

function pathTraversal(dist, shortestPathTree) {
    // Initialize node values, everything that is not the source will start at infinity. 
    var min = Infinity;
    var minIndex = 0;
    // Based on the results of the BFS iteration, determine shortest path between nodes, and update dist table. 
    for (let v = 0; v < verCount; v++)
    {
        if(shortestPathTree[v] == false && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;

}

function dijkstrasAlgo(weightedGraph, sourceNode) {
    // This variable is relied upon in all three functions, but the weighted graph is only passed to this one, hence why it is global.
    verCount = weightedGraph.length
    // Create dist array, and an array to mark nodes visted, pulled some old code here from other labs.
    var dist = [];
    var shortestPathTree = [];
    for(let i = 0; i < verCount; i++) {
        dist[i] = Infinity;
        shortestPathTree.push(false);
    }
    // Source node distance
    dist[sourceNode] = 0;

    for(let outerInd = 0; outerInd < verCount - 1; outerInd++) {
        var x = pathTraversal(dist, shortestPathTree);
        shortestPathTree[x] = true;
        // Shortest path has been calculated for node(s), mark them as visited
        for(let j = 0; j < verCount; j++) {
            // If node has not been visited, and the edge exists, and dist has been updated, and the dist is the shortest is can possibily be,
            // update distance.
            if(!shortestPathTree[j] && weightedGraph[x][j] != 0 && dist[x] != Infinity && dist[x] + weightedGraph[x][j] < dist[j]) {
                dist[j] = dist[x] + weightedGraph[x][j];
            }
        }

    }
    betterConsoleLog(dist);
}

function betterConsoleLog(dist)
{
    console.log("Node \t\t Distance from source node");
    for(let i = 0; i < verCount; i++)
    {
        console.log(i + " \t\t " + dist[i]);
    }
}

function passGraph() {
    var weightedGraph1 = [
        /* s  a  b  c  d  e  f  g  h */
         [ 0, 5, 0, 0, 0, 0, 0, 0, 2 ], // s
         [ 0, 0, 7, 0, 0, 0, 3, 0, 0 ], // a
         [ 0, 0, 0, 8, 0, 5, 0, 7, 0 ], // b
         [ 0, 0, 0, 0, 4, 0, 0, 0, 0 ], // c
         [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // d
         [ 0, 0, 0, 0, 0, 0, 0, 2, 0 ], // e
         [ 0, 0, 2, 0, 0, 6, 0, 0, -2 ], // f
         [ 0, 0, 0, 3, 0, 0, 0, 0, 0 ], // g
         [ 0, 2, 0, 0, 0, 9, 0, 0, 0 ] // h
     ];
     dijkstrasAlgo(weightedGraph1, 0);

    var weightedGraph2 = [
      /* 1  2  3  4  5*/
        [0, 2, 7, 0, 0], // 1
        [0, 0, 3, 8, 5], // 2
        [0, 2, 0, 1, 0], // 3
        [0, 0, 0, 0, 4], // 4
        [0, 0, 0, 5, 0]  // 5
     ];
     dijkstrasAlgo(weightedGraph2, 0);

     var weightedGraph3 = [
       /* 1  2  3  4  5  6  7 */
         [0, 3, 5, 6, 0, 0, 0], // 1
         [3, 0, 0, 2, 0, 0, 0], // 2
         [5, 0, 0, 2, 6, 3, 7], // 3
         [6, 2, 2, 0, 0, 9, 0], // 4
         [0, 0, 6, 0, 0, 5, 2], // 5
         [0, 0, 3, 9, 5, 0, 1], //6
         [0, 0, 7, 0, 2, 1, 0] // 7
     ];
     dijkstrasAlgo(weightedGraph3, 0);
}

passGraph();


// Part 2:
/* As with last lab, I am using an adjacency matrix, which means that in my worst-case scenario, every single vertex is connected 
   by a weighted edge. However, when concerned with finding the Big Theta value here, we can have a look at slide #43 from lecture, which 
   this program follows quite closely. We can see that the bulk of our work here is done by "for" loops that mark visited nodes, and 
   update distance tables. Similar to lecture, I have a runtime equation of Big Theta(|V|+|V| * (|V|+|V|)), which equals Big Theta(|V|^2).
   This leads to a Big Theta complexity of (|V|^2).
*/ 
