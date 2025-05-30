const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], data, [K]] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const dp = new Array(4).fill(null).map((_) => new Array(N + 1).fill(0));
let sum = 0;
for (let i = 0; i < K; i++) {
  sum += data[i];
}
const sumData = new Array(N + 1).fill(0);
sumData[K] = sum;
for (let i = K + 1; i <= N; i++) {
  sumData[i] = sumData[i - 1] - data[i - K - 1] + data[i - 1];
}

for (let i = 1; i < 4; i++) {
  for (let j = K; j <= N; j++) {
    dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j - K] + sumData[j]);
  }
}

console.log(dp[3][N]);
