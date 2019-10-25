   /* Chance McCormick: W03460977
      Stefan Emmons: W09667541
      COSC 3020
      Assigment #1
      10-9-2019
      Problem #4
      Dr. KottHoff
   */
    
   
   /*
     A detailed account of this modified algorithm will be provided in a step by step manner:
     1. Say we have a list of [7, 2, 3, 10, 0, 88]
     2. Initialize all variables, and perform the first check for the outer-most "for" loop.
     3. @outerFind = 1
     4. Perform the first check for the second "for" loop
     5. @leftInd = 0
     6. @rightInd = 0 + 1 = 1
     7. @secEnd = 1 + 1 = 2
     8. Shift these values to variables that are deliberately named in convention with loop variables.
        So, i = 0, j = 1
     9. Fall back into selection sort procedure, allows use to take divided indices/chunks/sections, and compare elements.
     10. We have effectively, segmented the original array into [7,2]
     11. val = 7, 0th index
     12. j = 0
     13. Nothing is swapped, because j-1 is non-existent 
     14. i = 1, val = 2 1st index, j = 1
     15. [7,7], j = 0, 0th index is 2, which is less than 7
     16. [2,7], i = 2
     17. Go back to second-most outer "for" loop
     18. @leftInd = 2
     19. @rightInd = 2 + 1 = 3
     20. @secEnd = 3 + 1 = 4
     21. Shift loop values again, so i = 2, j = 3 
     22. Fall back into selection sort again, now with [2,7,3,10]
     23. val = 3, 2nd index
     24. j = 2
     25. [2,7,7,10]
     26. val = 3
     27. j = 1
     28. [2,3,7,10]
     29. i = 3
     30. val = 10 
     31. j = 3
     32. All elements are currently sorted, nothing changes.
     33. i = 4
     34. Go back to second outer-most loop
     35. @leftInd = 4
     36. @rightInd = 4 + 1 = 5
     37. @secEnd = 5 + 1 = 6
     38. Shift loop values again, so i = 4, j = 5
     39. Fall back into selection sort again, now with [2,7,3,10,0,88]
     40. val = 0, 4th element
     41. j  = 4
     42. [2,3,7,10,10,88]
     43. val = 0
     44. shift this value all the way back until 0th index is identified, as it the smallest.
     45. [0,2,3,7,10,88]
     46. val = 88, 5th index, and so on

     The outermost loop is then used to check the entire reformed array, and ensure that all elements are sorted. This
     is done by modifying @"outerFInd" so that insertion sort may work on the newly formed array as a whole. It also
     accomodates for arrays that are not easily divisible by two. It works in conjuction with the "if" statment
     that compares @secEnd with the length of the list. This ensures that we never check undefined slots, and we never miss
     a slot in an odd numbered array. 
     By the strictest definitions of mergesort, this is an iterative, in-place version. A divide and conquer tactic
     is used on a single array (the partitioning/segmentation of indices), and all elements 
     comparisons are done in-place, with a single array. New segments/partitions are then merged with the 
     previously compared elements, and the new merged segment is analyzed as a whole. This repeats until the entire
     array is sorted.
    */
   
   
   function mergesort(list) {
    var rightInd, secEnd;
    var i, j;
    for(var outerFInd = 1; outerFInd < list.length; outerFInd = outerFInd * 2) {
        for(var leftInd = 0; leftInd+outerFInd < list.length; leftInd += outerFInd * 2) {
            rightInd = leftInd + outerFInd;
            secEnd = rightInd + outerFInd;
            if(secEnd > list.length) {
                secEnd = list.length;
            }
            i = leftInd;
            j = rightInd;
            for(i; i < secEnd; i++) {
                var val = list[i];
                for(j = i; j > 0 && list[j-1] > val; j--)
                {
                    list[j] = list[j-1];
                }
                list[j] = val;
            }
        }
    }
    return list;
}

/* Since this is an in-place, non recursive merge sort, we only need to consider the execution times of each loop body.
   Looking at the code above, the sorting algorithm uses four loops, three of which are nested. The outer most 
   loop works on log_2(n) time, while the other, second-outermost loop works on linear time. The sorting loops work on
   n^2. This means that our overall time complexity will be (log_2(n))n^3
   in the worst case, when we are given an array that is completely unsorted, our worst case runtime will be theta((log_2(n))n^3)).
*/

console.log(mergesort([7,2,3,10,0,88,99]));
console.log(mergesort([1,2,3,4]))

//Majority of the testing for this function will be done by jsverify.