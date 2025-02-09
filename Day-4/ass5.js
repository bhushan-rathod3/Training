// Task: Create a processData function that accepts an array of 
// numbers and a callback.
// If the callback is filterOdd, filter out even numbers.
// If the callback is doubleNumbers, double each number.
// If the callback is calculateSum, return the sum of all numbers. 
// Bonus Task: Implement a callback to find the maximum number in the array.


function processData(arr = [] , callback){
    return callback(arr);
}

function filterOdd(arr){
    return arr.filter(number => number%2 !== 0);
}

function doubleNumbers(arr){
    return arr.map(number => number * 2);
}

function calculateSum(arr){
    return arr.reduce((sum , number) => sum + number , 0);
}

function maxNumber(arr){
    return arr.length > 0 ? Math.max(...arr) : "Array Empty"
}


console.log("Filtered Odd Numbers : " ,processData([1,2,3,4,5,6,7,8,9,10] , filterOdd));
console.log("Doubled Odd Numbers : " , processData([1,2,3,4,5,6,7,8,9,10] , doubleNumbers));
console.log( "Sum of all numbers : " , processData([1,2,3,4,5,6,7,8,9,10] , calculateSum));
console.log("Max number in array : " , processData([1,2,3,4,5,6,7,8,9,10] , maxNumber));

/* OUTPUT - 
Filtered Odd Numbers :  [ 1, 3, 5, 7, 9 ]
Doubled Odd Numbers :  [
   2,  4,  6,  8, 10,
  12, 14, 16, 18, 20
]
Sum of all numbers :  55
Max number in array :  10
*/