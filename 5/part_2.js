/*--- Part Two ---

The Elves start bringing their spoiled inventory to the trash chute at the back of the kitchen.

So that they can stop bugging you when they get new inventory, the Elves would like to know all of the IDs that the fresh ingredient ID ranges consider to be fresh. An ingredient ID is still considered fresh if it is in any range.

Now, the second section of the database (the available ingredient IDs) is irrelevant. Here are the fresh ingredient ID ranges from the above example:

3-5
10-14
16-20
12-18

The ingredient IDs that these ranges consider to be fresh are 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, and 20. So, in this example, the fresh ingredient ID ranges consider a total of 14 ingredient IDs to be fresh.

Process the database file again. How many ingredient IDs are considered to be fresh according to the fresh ingredient ID ranges?

Your puzzle answer was 344306344403172.
*/

//read the file
const fs = require("fs");
const raw = fs.readFileSync("data.txt", "utf-8");
//split it

const rawData = raw.split(/\r?\n/);
const splitIndex = rawData.indexOf("");

//convert to int arrays
const dataRanges = rawData.slice(0, splitIndex).map(item => item.split("-").map(Number));
const dataAvailable = rawData.slice(splitIndex + 1).map(v => parseInt(v, 10));
//sort small -> large via first num
dataRanges.sort((a, b) => a[0] - b[0]);

//array for normalized (no overlapping) ranges
let dataRangesNormalized = new Array;
console.log(dataRanges);

let totalRanges = 0;
//store current range
let rangeStart;
let rangeEnd;
for (let i = 0; i < dataRanges.length; i++) {
    rangeStart = dataRanges[i][0];
    rangeEnd = dataRanges[i][1];
    //search to end of indexes
    let x;
    for (x = i + 1; x < dataRanges.length; x++) {
        console.log(rangeStart + " " + rangeEnd + " : " + dataRanges[x])
        if (rangeEnd >= dataRanges[x][0]) {
            console.log(rangeEnd + ' in true' + dataRanges[x][0]);
            rangeEnd = Math.max(dataRanges[x][1], rangeEnd)
        } else {
            console.log("in break")
            break;
        }
    }
    i = x - 1;


    console.log("Added: " + rangeStart + " " + rangeEnd)
    dataRangesNormalized.push([rangeStart, rangeEnd]);
    //add 1 (inclusive)
    totalRanges++;
    totalRanges += rangeEnd - rangeStart
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
console.log(totalRanges);

function isInRange(num) {
    for (const [start, end] of dataRangesNormalized) {
        if (num >= start && num <= end)
            return true;
        if (num < start)
            break;
    }
    return false
}
