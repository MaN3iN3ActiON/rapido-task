const readline = require("readline");
const commander = require("./commander");
const { BAT_ENUMS, BAT_LEN } = require("./constants");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function parseInput(input) {
  const arr = input.trim().split(",");
  const ans = new Array(BAT_LEN);
  if (arr.length !== BAT_LEN) {
    throw Error("Incorrect input length.");
  }
  for (let i = 0; i < BAT_LEN; i++) {
    const element = arr[i];
    const ba = element.trim().split(" ");
    const l = ba[0];
    const e = ba[1];
    if (
      typeof BAT_ENUMS[e] === "number" &&
      typeof ans[BAT_ENUMS[e]] !== "number"
    ) {
      ans[BAT_ENUMS[e]] = l;
    } else {
      throw Error("Incorrect input entries.");
    }
  }
  console.log(ans);
  return ans;
}

function displayOutput(output) {
  const { bat: lens, canWin } = output;
  let res = "";
  const batStrs = Object.keys(BAT_ENUMS);
  let i = 0;
  for (; i < BAT_LEN - 1; i++) {
    res += `${lens[i]} ${batStrs[i]}, `;
  }
  res += `${lens[i]} ${batStrs[i]} and ${canWin ? "wins" : "loses"}`;
  return res;
}

const case1 = [100, 101, 20, 5];
const case2 = [150, 96, 26, 8];
const case3 = [250, 50, 20, 15];

console.log("GIVEN CASES : ");
console.log(
  "case1 :  100 H, 101 E, 20 AT, 5 SG :: output is -> ",
  displayOutput(commander(case1))
);
console.log(
  "case2 :  150 H, 96 E, 26 AT, 8 SG :: output is -> ",
  displayOutput(commander(case2))
);
console.log(
  "case3 :  250 H, 50 E, 20 AT, 15 SG :: output is -> ",
  displayOutput(commander(case3))
);


rl.question(
  `
FOR CUSTOM INPUT ::
Input should look like this :  100 H, 101 E, 20 AT, 5 SG
Falicornia attacks with : `,
  answer => {
    try {
      const parsed = parseInput(answer);
      const output = commander(parsed);
      console.log(displayOutput(output));
    } catch (e) {
      console.error(e);
    }
    rl.close();
  }
);
