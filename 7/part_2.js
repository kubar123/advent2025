/*--- Part Two ---

With your analysis of the manifold complete, you begin fixing the teleporter. However, as you open the side of the teleporter to replace the broken manifold, you are surprised to discover that it isn't a classical tachyon manifold - it's a quantum tachyon manifold.

With a quantum tachyon manifold, only a single tachyon particle is sent through the manifold. A tachyon particle takes both the left and right path of each splitter encountered.

Since this is impossible, the manual recommends the many-worlds interpretation of quantum tachyon splitting: each time a particle reaches a splitter, it's actually time itself which splits. In one timeline, the particle went left, and in the other timeline, the particle went right.

To fix the manifold, what you really need to know is the number of timelines active after a single particle completes all of its possible journeys through the manifold.

In the above example, there are many timelines. For instance, there's the timeline where the particle always went left:

.......S.......
.......|.......
......|^.......
......|........
.....|^.^......
.....|.........
....|^.^.^.....
....|..........
...|^.^...^....
...|...........
..|^.^...^.^...
..|............
.|^...^.....^..
.|.............
|^.^.^.^.^...^.
|..............

Or, there's the timeline where the particle alternated going left and right at each splitter:

.......S.......
.......|.......
......|^.......
......|........
......^|^......
.......|.......
.....^|^.^.....
......|........
....^.^|..^....
.......|.......
...^.^.|.^.^...
.......|.......
..^...^|....^..
.......|.......
.^.^.^|^.^...^.
......|........

Or, there's the timeline where the particle ends up at the same point as the alternating timeline, but takes a totally different path to get there:

.......S.......
.......|.......
......|^.......
......|........
.....|^.^......
.....|.........
....|^.^.^.....
....|..........
....^|^...^....
.....|.........
...^.^|..^.^...
......|........
..^..|^.....^..
.....|.........
.^.^.^|^.^...^.
......|........

In this example, in total, the particle ends up on 40 different timelines.

Apply the many-worlds interpretation of quantum tachyon splitting to your manifold diagram. In total, how many different timelines would a single tachyon particle end up on?

Your puzzle answer was 305999729392659.

*/

//read the file
const fs = require("fs");
const raw = fs.readFileSync("data.txt", "utf-8");
//convert into 2d array
const rawData = raw.split(/\r?\n/).map(line => line.split(""));

printMap();

let loc = {
	"row": 0,
	"col": rawData[0].indexOf("S")
};
let mainCounter = 0;
let visitedSet = new Map();
start();

function start() {
	//go down until it hits something
	goDownUntilHit(loc.row, loc.col);
	console.log(mainCounter);
	console.log(visitedSet.size);

}

function goDownUntilHit(row, col) {
	do {
		row++;

		try {//try block to exit if out of bounds
			if (rawData[row][col] === "^") {
				let key = row + "," + col;

				//use the previously calculated amount
				if (visitedSet.has(key)) {
					mainCounter += visitedSet.get(key);
					return;
				}

				//calc the before -> after of all possible paths below this point
				const before = mainCounter;
				goDownUntilHit(row, col - 1);
				goDownUntilHit(row, col + 1);
				const contributed = mainCounter - before;
				//add to map so we dont need to re-calc every step
				visitedSet.set(key, contributed);
				return;
			}
		} catch (e) {
			//it left the array - add to mainCounter
			mainCounter++;
			return;
		}
	} while (true);
}





function printMap() {
	rawData.forEach(element => {
		let str = "";
		element.forEach(item => {
			str += item;
		});
		console.log(str);
	});
}