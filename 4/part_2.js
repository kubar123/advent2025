/*--- Part Two ---

Now, the Elves just need help accessing as much of the paper as they can.

Once a roll of paper can be accessed by a forklift, it can be removed. Once a roll of paper is removed, the forklifts might be able to access more rolls of paper, which they might also be able to remove. How many total rolls of paper could the Elves remove if they keep repeating this process?

Starting with the same example as above, here is one way you could remove as many rolls of paper as possible, using highlighted @ to indicate that a roll of paper is about to be removed, and using x to indicate that a roll of paper was just removed:

Initial state:
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.

Remove 13 rolls of paper:
..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.

Remove 12 rolls of paper:
.......x..
.@@.x.x.@x
x@@@@...@@
x.@@@@..x.
.@.@@@@.x.
.x@@@@@@.x
.x.@.@.@@@
..@@@.@@@@
.x@@@@@@@.
....@@@...

Remove 7 rolls of paper:
..........
.x@.....x.
.@@@@...xx
..@@@@....
.x.@@@@...
..@@@@@@..
...@.@.@@x
..@@@.@@@@
..x@@@@@@.
....@@@...

Remove 5 rolls of paper:
..........
..x.......
.x@@@.....
..@@@@....
...@@@@...
..x@@@@@..
...@.@.@@.
..x@@.@@@x
...@@@@@@.
....@@@...

Remove 2 rolls of paper:
..........
..........
..x@@.....
..@@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@x.
....@@@...

Remove 1 roll of paper:
..........
..........
...@@.....
..x@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
...x@.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
....x.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
..........
...x@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Stop once no more rolls of paper are accessible by a forklift. In this example, a total of 43 rolls of paper can be removed.

Start with your original diagram. How many rolls of paper in total can be removed by the Elves and their forklifts?

*/

//read the file
const fs = require("fs");
const raw = fs.readFileSync("data.txt", "utf-8");
//split it
let floorPlan = raw.split(/\r?\n/).map(row => row.split(""));

//total max power of all batteries
let total = 0;

//X Y
let dirOffset = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    //diags
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1]
];
//keep repeating until it passes with no chances once.
let hasChanged = false;
do {
    hasChanged = false;
    //format nicely
    floorPlan.forEach(row => {
        console.log(row.toString())
    });

    hasChanged = loopThroughAllItems();
} while (hasChanged);

console.log("TOTAL: %d", total);


function loopThroughAllItems() {
    let hasChanged = false;
    //loop through all items
    for (let y = 0; y < floorPlan.length; y++) {
        for (let x = 0; x < floorPlan[y].length; x++) {
            //skip spots without @ paper
            if (floorPlan[y][x] === "@") {
                let NewhasChanged = checkIfValid(x, y) === true;
                //dont override true -> false
                if (!hasChanged)
                    hasChanged = NewhasChanged
            }
        }
    }
    return hasChanged;
}




function checkIfValid(x, y) {
    let totalPaper = 0;
    //loop for each directions
    for (const [dX, dY] of dirOffset) {
        let xPos = dX + x;
        let yPos = dY + y;
        let square;

        //Out of bounds check
        try {
            square = floorPlan[yPos][xPos];
            if (square === undefined)
                continue;
        } catch (e) {
            continue;
        }

        //check if sq contains paper
        if (square === "@")
            totalPaper++;
    }

    if (totalPaper < 4) {
        total++;
        //replace paper with empty space
        floorPlan[y][x] = ".";
        return true;
    }
}