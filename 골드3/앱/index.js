const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const am = input[1].split(" ").map(Number);
const ac = input[2].split(" ").map(Number);
const arr = [];
let sum = 0;
for (let i = 0; i < n; i++) {
  arr[i] = [am[i], ac[i]];
  sum += ac[i];
}

arr.sort((a, b) => a[1] - b[1]);

const dp = new Array(n + 1).fill(null).map((_) => new Array(sum + 1).fill(0));
for (let i = 1; i <= n; i++) {
  for (let j = 0; j <= sum; j++) {
    if (j >= arr[i - 1][1]) {
      dp[i][j] = Math.max(
        dp[i - 1][j - arr[i - 1][1]] + arr[i - 1][0],
        dp[i - 1][j]
      );
    } else {
      dp[i][j] = dp[i - 1][j];
    }
  }
}

let min = Infinity;
for (let i = 0; i <= n; i++) {
  for (let j = 0; j <= sum; j++) {
    if (dp[i][j] >= m) {
      min = Math.min(j, min);
    }
  }
}

console.log(min);
