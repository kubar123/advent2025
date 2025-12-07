/*--- Part Two ---

The big cephalopods come back to check on how things are going. When they see that your grand total doesn't match the one expected by the worksheet, they realize they forgot to explain how to read cephalopod math.

Cephalopod math is written right-to-left in columns. Each number is given in its own column, with the most significant digit at the top and the least significant digit at the bottom. (Problems are still separated with a column consisting only of spaces, and the symbol at the bottom of the problem is still the operator to use.)

Here's the example worksheet again:

123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  

Reading the problems right-to-left one column at a time, the problems are now quite different:

    The rightmost problem is 4 + 431 + 623 = 1058
    The second problem from the right is 175 * 581 * 32 = 3253600
    The third problem from the right is 8 + 248 + 369 = 625
    Finally, the leftmost problem is 356 * 24 * 1 = 8544

Now, the grand total is 1058 + 3253600 + 625 + 8544 = 3263827.

Solve the problems on the math worksheet again. What is the grand total found by adding together all of the answers to the individual problems?

Your puzzle answer was 11052310600986.

*/

//read the file
const { groupCollapsed } = require("console");
const fs = require("fs");
const { normalize } = require("path");
const raw = fs.readFileSync("data.txt", "utf-8");
//split it

let total = 0;

const rawData = raw.split(/\r?\n/);
//convert to int arrays
const dataNums = rawData.slice(0, -1);
const dataTags = rawData.slice(dataNums.length);
let dataTagsReversed = [...dataTags[0]].reverse().join("");
console.log(dataNums);
let dataNumsReversed = dataNums.slice()                       // copy                     // reverse outer array
    .map(s => [...s].reverse().join("")); // reverse each string

console.log(dataTagsReversed)

let fixedArray = new Array();
//Keep looking until we run out of operators
while (true) {
    console.log(dataNumsReversed);
    console.log(dataTagsReversed);

    //find first Operator / break if finished
    let numSize = dataTagsReversed.toString().search(/\S/);
    if (numSize === -1) break;


    getColumnDigits(numSize, [...dataTagsReversed][numSize])

    //remove what we just processed from vars
    //+2 to remove empty whitespace AFTER the ID of what we found
    dataTagsReversed = dataTagsReversed.slice(numSize + 2);
    dataNumsReversed = dataNumsReversed.map(str =>
        str.slice(numSize + 2)
    );
}
console.log("TOTAL: " + total)



function getColumnDigits(numSize, operator) {
    let line = "";
    //loop through each 0-3/4/5 full nums
    for (let currNumSize = 0; currNumSize <= numSize; currNumSize++) {

        //then loop through each row
        for (let row = 0; row < dataNumsReversed.length; row++) {

            let data = dataNumsReversed[row].substring(currNumSize, currNumSize + 1);
            //check if not empty
            if (data === " ")
                continue;

            line += data;
            console.log("Added_" + data + "_");
        }
        //only add operator tag if we need to do more loops
        if (currNumSize <= numSize)
            line += operator


    }
    //remove last trailing operator sign at end
    line = line.slice(0, -1);
    fixedArray.push(line);

    console.log(fixedArray);
    total += eval(line);
}