/*--- Day 4: Printing Department ---

You ride the escalator down to the printing department. They're clearly getting ready for Christmas; they have lots of large rolls of paper everywhere, and there's even a massive printer in the corner (to handle the really big print jobs).

Decorating here will be easy: they can make their own decorations. What you really need is a way to get further into the North Pole base while the elevators are offline.

"Actually, maybe we can help with that," one of the Elves replies when you ask for help. "We're pretty sure there's a cafeteria on the other side of the back wall. If we could break through the wall, you'd be able to keep moving. It's too bad all of our forklifts are so busy moving those big rolls of paper around."

If you can optimize the work the forklifts are doing, maybe they would have time to spare to break through the wall.

The rolls of paper (@) are arranged on a large grid; the Elves even have a helpful diagram (your puzzle input) indicating where everything is located.

For example:

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

The forklifts can only access a roll of paper if there are fewer than four rolls of paper in the eight adjacent positions. If you can figure out which rolls of paper the forklifts can access, they'll spend less time looking and more time breaking down the wall to the cafeteria.

In this example, there are 13 rolls of paper that can be accessed by a forklift (marked with x):

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

Consider your complete diagram of the paper roll locations. How many rolls of paper can be accessed by a forklift?

Your puzzle answer was 1502.
*/

//read the file
const fs = require("fs");
const raw = fs.readFileSync("data.txt", "utf-8");
//split it
const floorPlan = raw.split(/\r?\n/);

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
]

//loop through all items
for (let y = 0; y < floorPlan.length; y++) {
    for (let x = 0; x < floorPlan[y].length; x++) {
        if (floorPlan[y][x] === "@")//skip spots without @ paper
            checkIfValid(x, y);
    }
}

console.log("TOTAL: %d", total);


function checkIfValid(x, y) {
    let totalPaper = 0;
    //check around it.
    console.log(`Looking at %d and %d`, x, y);

    //loop for each directions
    for (const [dX, dY] of dirOffset) {
        let xPos = dX + x;
        let yPos = dY + y;
        let square;

        //not an object and undefined check
        try {
            square = floorPlan[yPos][xPos];
            if (square === undefined)
                continue;
            console.log(square);
        } catch (e) {
            continue;
        }

        //check if sq contains paper
        if (square === "@")
            totalPaper++;
    }
    console.log(`found %d paper`, totalPaper);
    if (totalPaper < 4) {
        total++;
    }
}