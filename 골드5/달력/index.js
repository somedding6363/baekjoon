const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const sche = new Array(366).fill(0);
for (let i = 0; i < n; i++) {
  let [start, end] = input[i + 1].split(" ").map(Number);
  for (let j = start; j <= end; j++) {
    sche[j]++;
  }
}
sche.push(0);

let answer = 0;
let start = 0;
end = 0;
let continued = false;
let max = 0;
for (let i = 1; i <= 366; i++) {
  if (sche[i] !== 0) {
    if (!continued) {
      start = i;
      end = i;
    } else {
      end++;
    }
    continued = true;
    max = Math.max(max, sche[i]);
  } else {
    answer += max * (end - start + 1);
    continued = false;
    max = 0;
  }
}

console.log(answer);
