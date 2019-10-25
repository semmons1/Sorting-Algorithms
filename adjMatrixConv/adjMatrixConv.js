// Stefan Emmons
// COSC-3020-01
// Lab 05
// 10-16-2019
// Rajiv Khadka
// PART 1, Code:

/*
   In the following function, we have two "for" loops that seemingly use the same check conditions for execution. However, to clarify what is actually taking place,
   it can be observed that these two loops are used to iterate and parse individual elements per row of our adjacency matrix. The first loop is used to segment rows of the matrix,
   along with creating a separate sublist for each node. The second is used to identify the elements in a segmented row. The two loop indices are then used to parse individual elements of the entire matrix. 
   If a one is identified (which indicates an edge), then the index for this node is recorded and pushed into the sublist. After the iterations of the second loop have completed, the sublist is appended to the 
   result list, which holds results for all vertices/nodes that are identified in the matrix. This process repeats until we have completely converted our adjacency matrix. 
   which i 
*/

function convertToAdjList(adjMatrix) {
    var adjList = [];
    for(var i = 0; i < adjMatrix.length; i++) {
        verInd = [];
        for(var j = 0; j < adjMatrix.length; j++) {
            if(adjMatrix[i][j] == 1)
            {
                verInd.push(" -> " + [j]);
            }
            adjList["vertex " + i] = verInd;
        }
    }
    return adjList;
}


function testConvertToAdjList() {
    matrix1 = [[1,0,0,0], 
               [1,1,1,0],
               [1,1,0,0],
               [0,0,0,0]];

    matrix2 = [[1,0,0,0,1,1,1], 
               [1,1,1,0,0,0,1],
               [1,1,0,0,1,0,1],
               [0,0,0,0,1,1,1],
               [0,0,0,0,0,0,0],
               [0,0,1,1,0,0,1],
               [1,1,1,1,1,1,0]];
    
    matrix3 = [[0,1,1,1,0],
               [1,0,0,1,1],
               [1,1,0,1,1],
               [0,0,0,0,1],
               [0,1,0,1,0]];
    

    console.log("\nMatrix #1");
    console.log(matrix1);
    console.log(convertToAdjList(matrix1));
    console.log("\nMatrix #2");
    console.log(matrix2);
    console.log(convertToAdjList(matrix2));
    console.log("\nMatrix #3");
    console.log(matrix3);
    console.log(convertToAdjList(matrix3)); 
}
testConvertToAdjList();