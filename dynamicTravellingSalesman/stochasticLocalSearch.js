/*    Chance McCormick: W03460977
      Stefan Emmons: W09667541
      Brent Pearce: W08407961
      COSC 3020
      Assignment #3
      11-11-2019
      Problem #1
      Dr. Kotthoff
*/


"use strict"


function twoOptReverse(route, i, k){
  var toReverse = route.slice(i, k+1);
  toReverse = toReverse.reverse();
  var newRoute =route.slice(0,i);
  newRoute = newRoute.concat(toReverse, route.slice(k+1))
  return newRoute;
}

function calculateRouteLength(route, citiesGraph){
  var lengthSum =0;
  if (route[0] >= citiesGraph.length) {
    console.log("Can't calculate route length!")
    console.log("route city: ",route[0]," is outside the numbers of cities!")
    return;
  }

  for (let i = 0; i < route.length  - 1; i++) {
    if (route[i+1] >= citiesGraph.length) {
      console.log("Can't calculate route length!")
    console.log("route city: ",route[i+1]," is outside the numbers of cities!")
    return;
    }
    lengthSum = lengthSum + citiesGraph[route[i]][route[i+1]];
    }
  return lengthSum;
}


function genRandomPath(nCities)
{
  var num = nCities;
  var nums = [];
  var randomElement;
  var route = [];
  var next;
  for (let i = 0; i < nCities; i++) {
    nums.push(i);
  }

  for (let i = 0; i < nCities; i++) {
    randomElement = Math.floor(Math.random()*num)
    next = nums.splice(randomElement,1);
    next = next[0];
    route.push(next);
    num--;
  }
  return route;
}


 //The tsp_ls(), via two nested for loops, systematically checks ALL 
 //currently possible reverses. While this is a very aggressive approach, 
 //it is curbed by the the do while's stopping condition. 
 //See loop invariant below.

function tsp_ls(distance_matrix){
  var incumbentRoute = genRandomPath(distance_matrix.length);
  var incumbentDistance = calculateRouteLength(incumbentRoute,distance_matrix )
  var newRoute = [];
  var newDistance = undefined;
  var swapped;
  
  // Loop INV: A better solution was found in the last iteration.
  // Loop INV Corollary: loop ends when no better solution is found.
  do{
    swapped = false; // boolean var set to true only if a swap occurs

    //loop to increment length of chain to reverse
    for (let reverseSize = 2; reverseSize < incumbentRoute.length; 
          reverseSize++) 
    {
      for (let reversePosition=0; //loop to increment starting position of chain
        reversePosition<(incumbentRoute.length-reverseSize); reversePosition++) 
      {
        newRoute = twoOptReverse(incumbentRoute, reversePosition, reverseSize);
        newDistance = calculateRouteLength(newRoute, distance_matrix)
        
        if(newDistance < incumbentDistance){
          swappedCount++;
          incumbentDistance = newDistance;
          incumbentRoute = newRoute;
          swapped = true;
          break;
        }
        
      }
      if (swapped === true) {
        break;
      }
    }
    
  } while (swapped === true); 

 
  return incumbentDistance;
}
//==============================================================================
/*                                                                            *
 *                                    TESTS                                   *
 *                                                                            */
//==============================================================================



function toReverseTest(){
  var arr = [0,1,2,3,4,5];
  console.log("Original array :", arr)
  
  console.log("i = 2, k = 4: ",twoOptRevers(arr, 2, 4));
  
  console.log("i = 4, k = 4: ",twoOptRevers(arr, 4, 4));
  
  console.log("i = 3, k = 4: ",twoOptRevers(arr, 3, 4));
  
  console.log("i = 0, k = 5: ",twoOptRevers(arr, 0, 5));
  
} //passing

function calculateRouteLengthTEST(){
  var passed = true
  var testGraph = [[0, 6, 2, 11],
                   [6, 0, 5, 8],
                   [2, 5, 0, 3],
                   [11, 8, 3, 0]];

  var route1 = [0,1,2,3];

  var route2 = [3,1, 2,0];

  var route3 = [1,3,2,5];

  var routes = [route1,route2, route3];

  var routesExpectedDistances = [14, 15, undefined]

  for (let i = 0; i< routes.length; i++) {
    if(routesExpectedDistances[i] !== calculateRouteLength(routes[i],testGraph))  
    {
      console.log("Test ", i, " failed!");
      passed = false;
    }
  }
  
  if (passed === true) {
    console.log("All the tests passed.")
  }
  
  console.log()
} //passing

function genRandomPathTest(){
  for (let i = 3; i < 10; i++) {
    for (let j =0 ; j < 10; j++) {
      console.log(genRandomPath(i));
    }
  }
}//passing

//The tests below, commented out, are broader proof of concept using a path with
// a known optimal length, the perimeter of an N sided polygon. 

//var polyTestObj= generatePolygonTest(120);
//var testGraph = polyTestObj.distMat;
//var testBestDist = polyTestObj.minCost;

//var bestLocalDist = tsp_ls(testGraph);

console.log("The distance for the best local route found was: ", bestLocalDist);
console.log("The min distance should be: ", testBestDist);

// function takes an int n and returns a list of points(x and y coords)
// of a n sided polygon centered inside the unit circle,
// in the form [[point0x, point0y], [point1x, point1 y], [point2x, point2y],...]
function calculatePositions(n){
  var pi = Math.acos(-1);
  var xyCoordinates =[];
  var radians = 2*pi/n;
  for (let i = 0; i < n; i++) {
    var xCoordinate = Math.cos(i*radians);
    var yCoordinate = Math.sin(i*radians);
    var position = [xCoordinate, yCoordinate];
    xyCoordinates.push(position);
  }
  return xyCoordinates;
}

function calcDistance(point1, point2){
  var dxSqrd = (point1[0] - point2[0])**2;
  var dySqrd = (point1[1] - point2[1])**2;
  var dist = Math.sqrt(dxSqrd + dySqrd);
  return dist;
}

function calcDistancesRow(points, n, m) {
  // Calculate the distance for one point and all other points(including itself)
  var distanceRow = [];
  for (let i = 0; i < n; i++) {
    var nextDist = calcDistance(points[m],points[i]);
    distanceRow.push(nextDist);
  }
  return distanceRow;
}

/*function calculates the perimeter of an n sided polygon minus one side.
  This length is the same as the shortest route visiting each corner once*/
function calcPolygonShortPerimeter(n, coordinatesArray){
var sideLength = calcDistance(coordinatesArray[0], coordinatesArray[1]);
return (n-1) * sideLength;
}


// function takes an int n and returns a JS object literal containing
// distMat and minCost where the minCost is the minimum cost of any 
// shortest trip around the sides of a regular n sided polygon (not 
// returning to the start node).

function generatePolygonTest(n){
  var polygonTestGraph = [];
  var coordinatesArray = calculatePositions(n);
  var openPerimeter = calcPolygonShortPerimeter(n, coordinatesArray);
  
  // calc all the distance entries for a row and push it to the graph matrix
  for (let i = 0; i < n; i++) {
    var distancesRow = calcDistancesRow(coordinatesArray,n,i);
    polygonTestGraph.push(distancesRow);
  }

  var polyTestObj = {
    distMat: polygonTestGraph,
    minCost: openPerimeter
  };
  return polyTestObj
}
