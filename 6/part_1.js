/*--- Day 6: Trash Compactor ---

After helping the Elves in the kitchen, you were taking a break and helping them re-enact a movie scene when you over-enthusiastically jumped into the garbage chute!

A brief fall later, you find yourself in a garbage smasher. Unfortunately, the door's been magnetically sealed.

As you try to find a way out, you are approached by a family of cephalopods! They're pretty sure they can get the door open, but it will take some time. While you wait, they're curious if you can help the youngest cephalopod with her math homework.

Cephalopod math doesn't look that different from normal math. The math worksheet (your puzzle input) consists of a list of problems; each problem has a group of numbers that need to be either added (+) or multiplied (*) together.

However, the problems are arranged a little strangely; they seem to be presented next to each other in a very long horizontal list. For example:

123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  

Each problem's numbers are arranged vertically; at the bottom of the problem is the symbol for the operation that needs to be performed. Problems are separated by a full column of only spaces. The left/right alignment of numbers within each problem can be ignored.

So, this worksheet contains four problems:

    123 * 45 * 6 = 33210
    328 + 64 + 98 = 490
    51 * 387 * 215 = 4243455
    64 + 23 + 314 = 401

To check their work, cephalopod students are given the grand total of adding together all of the answers to the individual problems. In this worksheet, the grand total is 33210 + 490 + 4243455 + 401 = 4277556.

Of course, the actual worksheet is much wider. You'll need to make sure to unroll it completely so that you can read the problems clearly.

Solve the problems on the math worksheet. What is the grand total found by adding together all of the answers to the individual problems?

Your puzzle answer was 6605396225322.

*/

//read the file
const fs = require("fs");
const raw = fs.readFileSync("data.txt", "utf-8");
//split it

//trim multiple spaces
const rawData = raw.replace(/  +/g, ' ').replace(/^ +| +$/gm, '').split(/\r?\n/);
//convert to int arrays
const dataNums = rawData.slice(0, -1).map(item => item.split(" ").map(Number));
const dataTags = rawData.slice(dataNums.length).flatMap(item => item.split(" "));

let mainCounter = 0;
//go through each array, and grabs its first num
//then 2nd, 3rd...
//do calc on it
//loop through again, and do it for 2nd num, etc
console.log(dataTags[0])
dataTags.forEach((operator, opIndex) => {
    let oneLineString = "";
    for (let i = 0; i < dataNums.length; i++) {
        console.log("+++" + dataNums[i][opIndex])
        oneLineString += dataNums[i][opIndex];
        oneLineString += operator;
    }
    //remove last operator
    oneLineString = oneLineString.slice(0, -1);
    mainCounter += eval(oneLineString);
    console.log('operator ' + oneLineString)
});
console.log(raw);
console.log(dataNums);
console.log(dataTags);
console.log("ANS: " + mainCounter)


return


const dataAvailable = rawData.slice(splitIndex + 1).map(v => parseInt(v, 10));
//sort small -> large via first num
dataNums.sort((a, b) => a[0] - b[0]);

//array for normalized (no overlapping) ranges
let dataRangesNormalized = new Array;
console.log(dataNums);

//store current range
let rangeStart;
let rangeEnd;
for (let i = 0; i < dataNums.length; i++) {
    rangeStart = dataNums[i][0];
    rangeEnd = dataNums[i][1];
    //search to end of indexes
    let x;
    for (x = i + 1; x < dataNums.length; x++) {
        console.log(rangeStart + " " + rangeEnd + " : " + dataNums[x])
        if (rangeEnd >= dataNums[x][0]) {
            console.log(rangeEnd + ' in true ' + dataNums[x][0]);
            rangeEnd = Math.max(dataNums[x][1], rangeEnd)
        } else {
            console.log("in break")
            break;
        }
    }
    i = x - 1;


    console.log("Added: " + rangeStart + " " + rangeEnd)
    dataRangesNormalized.push([rangeStart, rangeEnd]);
}
let total = 0;
//look through the normalized Array
dataAvailable.forEach(element => {
    if (isInRange(element)) {
        total++;
        console.log("found item fresh" + element)
    }
});
console.log(dataRangesNormalized)
console.log(total);


function isInRange(num) {
    for (const [start, end] of dataRangesNormalized) {
        if (num >= start && num <= end)
            return true;
        if (num < start)
            break;
    }
    return false
}
