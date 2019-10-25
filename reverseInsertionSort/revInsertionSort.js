// Stefan Emmons
// COSC-3020-01
// Lab 01
// 9-11-2019
// PART 1, Code:

function insertionSort(arr) { 
    for(var i = 1; i < arr.length; i++) { 
      var val = arr[i];
      var j;
      for(j = i; j > 0 && arr[j-1] > val; j--) { 
        arr[j] = arr[j-1];
      } 
      arr[j] = val;
    } 
    return arr;
}

// For the sake of being able to check if sorting has been 
// carried out properly, I will only be using arrays with ten
// elements. Not realistic, but easy for this exercise.

function checkInsertionSort(testArray, checkArray) {
    var testArray = [99, 83, 32, 101, 66, 1, 4, 202, 12, 10];
    var checkArray = [ 1, 4, 10, 12, 32, 66, 83, 99, 101, 202 ];
    // Basic test that will print the result of the insertion sort function,
    // assuming that it works as it should.

    console.log("Calling the insertion sort function:\n", insertionSort(testArray));

    // Compare output array with a human sorted array to ensure that 
    // sorting is done correctly. Check each individual element, as checking length alone will do
    // nothing for us.

    for(var k = 0; k < testArray.length; k++) {
        if(insertionSort(testArray[k]) != checkArray[k]) {
            console.error("Element", insertionSort(testArray[k]), "does not match, check sorting algorithm.\n");
        } else {
            console.log("Element", insertionSort(testArray[k]), "matches!\n");
        }
    }
}


function insertionSortReverse(arr2) {
    for(var i = arr2.length - 1; i >= 0; i--) { 
        var val = arr2[i];
        var j;
        // After much struggling, I have understood that since we are moving in the opposite
        // direction on the array, we must use directly opposite swap logic. Hence the changes made here.
        for(j = i; j < arr2.length && arr2[j+1] < val; j++) { 
          arr2[j] = arr2[j+1];
        } 
        arr2[j] = val;
      } 
      return arr2;
}


function checkInsertionSortReverse(testArray2, checkArray2) {
    var testArray2 = [22, 6, -1, 404, 99, 0, 4, 33, 12, 7];
    var checkArray2 = [ -1, 0, 4, 6, 7, 12, 22, 33, 99, 404 ];
    // Basic test that will print the result of the insertion sort function,
    // assuming that it works as it should.

    console.log("Calling the reverse insertion sort function:\n", insertionSortReverse(testArray2));

    // Compare output array with a human sorted array to ensure that 
    // sorting is done correctly. Check each individual element, as checking length alone will do
    // nothing for us.

    for(var k = 0; k < testArray2.length; k++) {
        if(insertionSortReverse(testArray2[k]) != checkArray2[k]) {
            console.error("Element", insertionSortReverse(testArray2[k]), "does not match, check sorting algorithm.\n");
        } else {
            console.log("Element", insertionSortReverse(testArray2[k]), "matches!\n");
        }
    }
}

// Call test functions
checkInsertionSort();
checkInsertionSortReverse();

// PART 2, Time complexity: 
// Best case => O(n), everything is already sorted, and no swapping is needed, time complexity is linear.
// Average and worst case => O(n^2)
// Focusing just on the average case, we are assuming that approximately half of our elements in an array
// need to be sorted, and this means that both loop bodies will need to be executed. A time complexity of n^2
// is usually synonymous to nested loop iterators. In this average case With half of the data sorted,
// the first loop will run for n, while the second loop will run for n/2. The complexity of this is n*n/2 = n^2
// (ignoring constants).
// Delving deeper into this, each element of the array must be inspected through one iteration via the 
// first loop, and then half must be swapped to it's neighboring element in a second loop iteration. 
// This sorting process grows quadratically the larger a data set gets, which is why insertion 
// sort is likely good for very small data sets, but for medium and large data sets, it's execution
// is likely highly undesirable. 

