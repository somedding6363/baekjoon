const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], ...matrix] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const dp = new Array(N).fill(null).map((_) => new Array(N).fill(Infinity));

for (let i = 0; i < N; i++) {
  dp[i][i] = 0;
}

let count = 0;
while (count < N) {
  for (let i = 0; i + count < N; i++) {
    let j = i + count;
    for (let k = i; k < j; k++) {
      const sum =
        dp[i][k] + dp[k + 1][j] + matrix[i][0] * matrix[k][1] * matrix[j][1];
      dp[i][j] = Math.min(dp[i][j], sum);
    }
  }
  count++;
}

console.log(dp[0][N - 1]);
