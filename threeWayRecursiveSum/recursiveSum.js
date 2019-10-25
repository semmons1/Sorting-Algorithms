// Stefan Emmons
// COSC-3020-01
// Lab 03
// 9-26-2019
// PART 1, Code:

function divideAndConquerSum(a) {
    /* We must include two base cases with this problem. One for if the array/subarrary is empty,
      and one for if no summing is actually needed, or we only have one element in an array.*/

    if (a.length == 0) {
        return 0;
    }

    else if (a.length == 1) {
        return a[0];
    }
        /* Since we must split our array into three subarrays, we must define three index point as to where we 
           wish to split. There are many ways of doing this, I went with the route of taking the array length,
           and multiplying it by 3rds. This, accompanied with the Math.floor function (rounds any remainders in case the length is 
           not divisible by three), encompasses all possible elements into three sub arrays.*/

        const leftIn = a.slice(0, Math.floor(a.length * 0.33)); 
        const midIn = a.slice(Math.floor(a.length * 0.33), Math.floor(a.length * 0.66));
        const rightIn = a.slice(Math.floor(a.length * 0.66), a.length);
        return divideAndConquerSum(leftIn) + divideAndConquerSum(midIn) + divideAndConquerSum(rightIn);
        
}

 /*Below is a VERY simple test function. It is not supposed to be elegant or efficient.
   Two reasons for this, I was pressed on time, and this only needs to showcase that the function
   does it's job. The jsverify function in a seperate file will handle serious testing.*/

function testDAQS() {
    var a = [3, 44, 1, -6, 9, 404, 809, -77];
    var b = [3, 44, 1, -6, 9, 404, 809, -77, 66, 454, 11, 4, 8];
    var c = [3, 6, 9];
    var d = [1, 1];

    if(divideAndConquerSum(a) === 1187) {
        console.log("First test passes! The output is " + divideAndConquerSum(a));
    }

    if(divideAndConquerSum(b) === 1730) {
        console.log("Second test passes! The output is " + divideAndConquerSum(b));
    }

    if(divideAndConquerSum(c) === 18) {
        console.log("Third test passes! The output is " + divideAndConquerSum(c));
    }

    if(divideAndConquerSum(d) === 2) {
        console.log("Fourth test passes! The output is " + divideAndConquerSum(d));
    }

    else {
        console.log("One of these tests has failed, please check recursive function.");
    }

}

testDAQS();

//Part 2, see PDF file.