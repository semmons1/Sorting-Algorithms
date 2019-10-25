// Stefan Emmons
// COSC-3020-01
// Lab 04
// 10-4-2019
// PART 1, Code:

/*
   Our main function here, "permutationSort" makes use of two nested helper functions:
   @"discover" to calculate/discover all possible, UNIQUE, permutations of a given array.
   @"isSorted" to inspect the permutation results, and find the one that happens to be sorted.
   Something to note here, "discover" returns all possible results, but also as a 2D array. @"a" is obviously assigned this 2D array.
   @"convArr" is a variable that takes broken down sub arrays of this 2D result array, and passes them
   through "isSorted". Not efficient, but it works!
*/
      function permutationSort(a) {
        var discoverCount = 0;
        a = discover(a);
        for(var i = 0; i < a.length; i++) {
            var convArr = a[i];
            if(isSorted(convArr) == false) {
                discoverCount++
                continue;
            }
            else {
                break;
            }
        }
         
        /* This great function takes each sub array passed down to it, and compares the individual elements.
           If the previous element with respect to the loop index is found to be larger than the current index, this 
           array is marked as not sorted, and the sequence repeats. If all elements pass this check, then the array is
           clearly sorted. The boolean value is modified, and the sequence is broken.
        */

           function isSorted(a) {
               for(var i = 1; i < a.length; i++) {
                   if(a[i - 1] > a[i]) {
                       console.log("Permutated, but not sorted array:");
                       console.log(a);
                       return false;
                    }
                }
            console.log("Permutated, and correctly sorted array:")
            console.log(a);
            return true;
            }

        /* This function is where all of the work is done. It can also be hard to follow, and so I tried to name variables with self documenting values,
           so that others who are trying to follow along may understand more beyond these comments.
           Essentially, this function relies on both recursion, and nested iterators. 
           Recursion is used to identify an "anchor" for each function sequence. This anchor is meant to serve
           as an excluded value that is never changed, while the rest of the array is. This anchor is moved by one element
           each time the function recurses upon itself. This anchor is then used in conjunction with two for loops. Simplified greatly,
           these loops "swap" everything around the predefined anchor, over and over again, until all unique permutations have been exhausted.
           This provides this algorithm variant an upper bound, or a guarantee that it will stop at SOME point, (n! in this case).
           With the randomized "Shotgun sort" counterpart of this algorithm, there is no upper bound, and it does have the theoretical potential
           to run forever. We have eliminated this potential here. 
           A huge inspiration for this came from github.com/trekhleb/javascript-algorithms.
           I encourage anyone who is curious about algorithms in general to visit this Github. It is absolutely fantastic.
        */

           function discover(a) {
               // Base case for recursive calls.
               if(a.length <= 1) {
                   return [a];
                }
                // Initiate array to hold results.
                var permArray = [];
                // Anchor that is adjusted per recursive sequence.
                const excludedAnchor = discover(a.slice(1));
                // This is the element that will be swapped into all possible positions used in the following smaller permutations. 
                const firstOption = a[0];
                
                for(var i = 0; i < excludedAnchor.length; i++) {
                    // Establish an iteration anchor.
                    const excludedAnchors = excludedAnchor[i];
                    
                    // Swap the predefined first option into all possible positions within the iteration anchor.
                    for(var j = 0; j <= excludedAnchors.length; j++) {
                        const permutationPrefix = excludedAnchors.slice(0, j);
                        const permutationSuffix = excludedAnchors.slice(j);
                        permArray.push(permutationPrefix.concat([firstOption], permutationSuffix));
                    }
                }
                // 2D array with all possible permutations of an array is returned. 
                return permArray;
            }
        // Break out of nested helper functions, and return the number of permutations tried until the correctly sorted version was found.
        return (discoverCount + " permutations have been tried for the sorted solution.");
    }


    function testPerm() {
        // Most of the testing for this function is done through native text and array output. Just give the function
        // different arrays to work with, and you will get plenty of output on what is happening. 
        
        console.log(permutationSort([]));
        console.log(permutationSort([1]));
        console.log(permutationSort([4,4,4,4]));
        console.log(permutationSort([1,2,3]));
        console.log(permutationSort([3,1,2]));
        console.log(permutationSort([99, 33, 98, 1]));
        console.log(permutationSort([99, 33, -1, 1, -1]));
        a = Array.from({length: 7}, () => Math.floor(Math.random() * 40));
        console.log(permutationSort(a));

        // Make sure that return value is exactly what you would expect, for example, use an array that is one permutation away from being sorted:

        var a = [2,1];
        if(permutationSort(a) == "1 permutations have been tried for the sorted solution.") {
            console.log("Conditional test has passed.");

        } else {
            console.log("Conditional test has not passed.");
        }
    }
    
   testPerm();

   // Part 2: See PDF file.