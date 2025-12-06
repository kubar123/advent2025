/*--- Day 5: Cafeteria ---

As the forklifts break through the wall, the Elves are delighted to discover that there was a cafeteria on the other side after all.

You can hear a commotion coming from the kitchen. "At this rate, we won't have any time left to put the wreaths up in the dining hall!" Resolute in your quest, you investigate.

"If only we hadn't switched to the new inventory management system right before Christmas!" another Elf exclaims. You ask what's going on.

The Elves in the kitchen explain the situation: because of their complicated new inventory management system, they can't figure out which of their ingredients are fresh and which are spoiled. When you ask how it works, they give you a copy of their database (your puzzle input).

The database operates on ingredient IDs. It consists of a list of fresh ingredient ID ranges, a blank line, and a list of available ingredient IDs. For example:

3-5
10-14
16-20
12-18

1
5
8
11
17
32

The fresh ID ranges are inclusive: the range 3-5 means that ingredient IDs 3, 4, and 5 are all fresh. The ranges can also overlap; an ingredient ID is fresh if it is in any range.

The Elves are trying to determine which of the available ingredient IDs are fresh. In this example, this is done as follows:

    Ingredient ID 1 is spoiled because it does not fall into any range.
    Ingredient ID 5 is fresh because it falls into range 3-5.
    Ingredient ID 8 is spoiled.
    Ingredient ID 11 is fresh because it falls into range 10-14.
    Ingredient ID 17 is fresh because it falls into range 16-20 as well as range 12-18.
    Ingredient ID 32 is spoiled.

So, in this example, 3 of the available ingredient IDs are fresh.

Process the database file from the new inventory management system. How many of the available ingredient IDs are fresh?

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
            console.log(rangeEnd + ' in true ' + dataRanges[x][0]);
            rangeEnd = Math.max(dataRanges[x][1], rangeEnd)
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
