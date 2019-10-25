// Stefan Emmons
// COSC-3020-01
// Lab 06
// 10-23-2019
// Rajiv Khadka
// PART 1, Code:

/* This lab is composed of two functions, this function here serves as the "brain" of the traversal.
   We begin by passing an adjacency matrix, the start node, and a boolean array for each of the nodes in the matrix/graph.
   This boolean array is continuously parsed and updated with true values as the matrix is traversed, so that no node is revisited.
   The remainder of the work that is done through recursion involves traversing the matrix/graph, each time searching for nodes 
   that have not been visited, and edges marked by a "1". A loop index is used to "mark" what node has been visited in the search,
   and is displayed during each cycle of the recursive sequence.
   All variable have reasonable names, so that this code remains relatively self-docmenting. 
*/

function depthFirstSearch(startNode, graph, isVisited) {   
    if(!isVisited[startNode]) {
        isVisited[startNode] = true;
        console.log((startNode + 1) + " -> ");

    for(let j = 0; j < graph.length; j++) {
        if(graph[startNode][j] == 1 && !isVisited[j]) {
            depthFirstSearch(j, graph, isVisited);
        }
    }
  }
}



/* This function serves to provide the DFS function with values to parse. We can start from any node, in this case, I choose to 
   always start from the root, to see how we traverse the entire graph. I then build a fixed graph or tree with a adjacency matrix,
   and finally, based on how many nodes are present, fill a boolean array with false values to represent the fact that none have been visited.
*/

function testDFS() {
    let node = 0;
    let graph1 = [
       /* 1  2  3  4  5  6  7  8  9  10 */
        [ 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ], // 1
        [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ], // 2
        [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 ], // 3
        [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ], // 4
        [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ], // 5
        [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ], // 6
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 7
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], // 8
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], // 9
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] // 10
    ];
    let verCount1 = graph1.length;
    let isVisited1 = [];
    for(let i = 0; i < verCount1; i++) {
        isVisited1.push(false);
    }
    console.log("\n Graph #1 traversal:")
    depthFirstSearch(node, graph1, isVisited1);
    
    let graph2 = [
        /* As seen in lecture, this graph is a direct copy of slide #29 */
       /* A  B  C  D  E  F  G */
        [ 0, 1, 1, 0, 0, 1, 0 ], // A 
        [ 0, 0, 0, 0, 1, 0, 0 ], // B
        [ 0, 0, 0, 1, 0, 1, 0 ], // C
        [ 0, 0, 0, 0, 1, 0, 0 ], // D
        [ 0, 0, 0, 0, 0, 0, 0 ], // E
        [ 0, 0, 0, 0, 0, 0, 1 ], // F
        [ 0, 0, 0, 0, 0, 0, 0 ]  // G
    ];
    
    let verCount2 = graph2.length;
    let isVisited2 = [];
    for(let i = 0; i < verCount2; i++) {
        isVisited2.push(false);
    }
    console.log("\nGraph #2 traversal:");
    depthFirstSearch(node, graph2, isVisited2);

    let graph3 = [
       /* 1  2  3  4  5  6  7 */
        [ 0, 1, 1, 0, 0, 0, 0 ], //1
        [ 0, 0, 0, 1, 0, 0, 0 ], //2
        [ 0, 0, 0, 0, 1, 1, 0 ], //3
        [ 0, 0, 0, 0, 0, 0, 1 ], //4
        [ 0, 0, 0, 0, 0, 0, 0 ], //5
        [ 0, 0, 0, 0, 0, 0, 0 ], //6
        [ 0, 0, 0, 0, 0, 0, 0 ]  //7
    ];
    let verCount3 = graph3.length;
    let isVisited3 = [];
    for(let i = 0; i < verCount3; i++) {
        isVisited3.push(false);
    }
    console.log("\nGraph #3 traversal:");
    depthFirstSearch(node, graph3, isVisited3);

}

testDFS();

//Part 2: See separate PDF file