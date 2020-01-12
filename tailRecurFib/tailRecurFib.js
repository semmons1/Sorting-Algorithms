// Stefan Emmons
// COSC-3020-01
// Lab 09
// 11-21-2019
// Rajiv Khadka
// PART 1, Code:

function tailFib(n, startStack, endStack) {
    if(n==0) {
        return startStack;
    }
    if(n==1) {
        return endStack;
    }
    return tailFib(n-1, endStack, startStack + endStack);
}

function main() {
    var n = 9;
    console.log("The fibonacci number when n = " + n +" is " + tailFib(n,0,1));

    var n = 12;
    console.log("The fibonacci number when n = " + n +" is " + tailFib(n,0,1));
    
    var n = 2;
    console.log("The fibonacci number when n = " + n +" is " + tailFib(n,0,1));

    var n = 100;
    console.log("The fibonacci number when n = " + n +" is " + tailFib(n,0,1));
}
main();

//Part 2, analysis
/*
The asymptotic complexity of this function, in the worst case in O(N), which is better 
then the non-tail recursive solution for the Fibonacci function, O(2^n). This is because in 
the tail recursive case, the amount of work being done is always directly proportional to the value 
of "n". Say the value of n is 9, this Fibonacci function must carry out and keep track of, nine executions. 
In addition, less stack space is being used in this version to store temporary results, making it more
efficient in terms of memory consumption, and asymptotic complexity.
*/