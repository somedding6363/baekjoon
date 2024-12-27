const input = require("fs").readFileSync("example.txt").toString().split("\n");

const n = Number(input[0]);
const building = input[1].split(" ").map(Number);
let canSee = {};

for (let i = 0; i < n - 1; i++) {
  let gradient = -1000000001;
  for (let j = i + 1; j < n; j++) {
    let newGradient = (building[j] - building[i]) / (j - i);
    if (gradient < newGradient) {
      gradient = newGradient;
      canSee[i] ? canSee[i].push(j) : (canSee[i] = [j]);
      canSee[j] ? canSee[j].push(i) : (canSee[j] = [i]);
    }
  }
}

let max = 0;
for (let i in canSee) {
  max = max < canSee[i].length ? canSee[i].length : max;
}

console.log(max);
