/*--- Part Two ---

The escalator doesn't move. The Elf explains that it probably needs more joltage to overcome the static friction of the system and hits the big red "joltage limit safety override" button. You lose count of the number of times she needs to confirm "yes, I'm sure" and decorate the lobby a bit while you wait.

Now, you need to make the largest joltage by turning on exactly twelve batteries within each bank.

The joltage output for the bank is still the number formed by the digits of the batteries you've turned on; the only difference is that now there will be 12 digits in each bank's joltage output instead of two.

Consider again the example from before:

987654321111111
811111111111119
234234234234278
818181911112111

Now, the joltages are much larger:

    In 987654321111111, the largest joltage can be found by turning on everything except some 1s at the end to produce 987654321111.
    In the digit sequence 811111111111119, the largest joltage can be found by turning on everything except some 1s, producing 811111111119.
    In 234234234234278, the largest joltage can be found by turning on everything except a 2 battery, a 3 battery, and another 2 battery near the start to produce 434234234278.
    In 818181911112111, the joltage 888911112111 is produced by turning on everything except some 1s near the front.

The total output joltage is now much larger: 987654321111 + 811111111119 + 434234234278 + 888911112111 = 3121910778619.

What is the new total output joltage?

Your puzzle answer was 167384358365132.


*/

//read the file
const fs = require("fs");
const raw = fs.readFileSync("data.txt", "utf-8");
//split it
const allbatteries = raw.split(/\r?\n/);

//total max power of all batteries
let maxPower = 0;

allbatteries.forEach(batteryBank => {
    findMaxNum(batteryBank);
});

//final output
console.log("MAX PWR:" + maxPower);



function findMaxNum(bank) {
    //string array for indexOf calcs
    let bankArrayStr = String(bank).split("");
    //array of nums
    let bankArray = bankArrayStr.map(Number);
    //find max num index 0-12 nums from the end
    let neededNums = 12;


    let foundMaxNums = "";

    //find the max num
    for (let i = 1; i <= neededNums; ++i) {
        //if bankArray size is same as amount of nums we need to add - add everything 1 by 1 (no need for checks)
        if (neededNums - foundMaxNums.length == bankArray.length) {
            foundMaxNums += bankArray[0];
            bankArray.splice(0, 1); //remove item we added
            continue;
        }

        //get the first x- (12-i) nums
        //-1* to ensure number is negative for slice (x from end)
        let toFindSize = -1 * (neededNums - i);
        let searchNumArray;
        // if i is 12 and neededNums is 12 we can copy the rest of array
        if (i == 12)
            searchNumArray = bankArray;
        else
            searchNumArray = bankArray.slice(0, toFindSize);

        //get index and values
        let foundData = getMaxNumIndex(searchNumArray);
        let maxNum = foundData[1];
        let maxNumIndex = foundData[0];

        //remove everything before index (cant pick a number to the left later)
        bankArray.splice(0, maxNumIndex + 1);

        foundMaxNums += maxNum;
    }
    console.log("FOUND MAX NUMS: " + foundMaxNums);
    maxPower += parseInt(foundMaxNums);
    console.log("_________________________________")
}


function getMaxNumIndex(numArray) {
    //find max num 
    let maxNum = Math.max(...numArray)
    let numIndex = numArray.indexOf(maxNum);
    console.log(numIndex)
    return [numIndex, maxNum];
}



