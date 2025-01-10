const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const t = Number(input[0]);
const n = Number(input[1]);
const nArr = input[2].split(" ").map(Number);
const m = Number(input[3]);
const mArr = input[4].split(" ").map(Number);
const nSumCnt = {};
for (let i = 0; i < n; i++) {
  let sum = 0;
  for (let j = i; j < n; j++) {
    sum += nArr[j];
    nSumCnt[sum] = (nSumCnt[sum] || 0) + 1;
  }
}

let answer = 0;
for (let i = 0; i < m; i++) {
  let sum = 0;
  for (let j = i; j < m; j++) {
    sum += mArr[j];
    if (nSumCnt[t - sum]) {
      answer += nSumCnt[t - sum];
    }
  }
}

console.log(answer);
