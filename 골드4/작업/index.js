const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const task = new Array(n);
for (let i = 1; i < input.length; i++) {
  task[i - 1] = input[i].split(" ").map(Number);
}

const dp = new Array(n);
let answer = 0;
for (let i = 0; i < n; i++) {
  const [time, prevCnt, ...prev] = task[i];
  if (prevCnt === 0) dp[i] = time;
  else {
    let max = 0;
    for (let j = 0; j < prevCnt; j++) {
      max = max > dp[prev[j] - 1] ? max : dp[prev[j] - 1];
    }
    dp[i] = max + time;
  }
  answer = answer > dp[i] ? answer : dp[i];
}

console.log(answer);
