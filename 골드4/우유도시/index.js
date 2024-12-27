const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const map = new Array(n).fill(null);
for (let i = 0; i < n; i++) {
  map[i] = input[i + 1].split(" ").map(Number);
}

const dp = new Array(n).fill(null).map((_) => new Array(n).fill(null));
if (map[0][0] === 0) dp[0][0] = [0, 1];
else {
  dp[0][0] = [2, 0];
}
const nextMilk = [1, 2, 0];
const [upx, upy] = [-1, 0];
const [leftx, lefty] = [0, -1];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const now = map[i][j];
    if (i + upx >= 0) {
      const from = dp[i + upx][j + upy];
      if (nextMilk[from[0]] === now) {
        dp[i][j] = [now, from[1] + 1];
      } else {
        dp[i][j] = [...from];
      }
    }
    if (j + lefty >= 0) {
      const from = dp[i + leftx][j + lefty];
      if (nextMilk[from[0]] === now) {
        if (dp[i][j] === null) {
          dp[i][j] = [now, from[1] + 1];
        } else {
          dp[i][j] = from[1] + 1 > dp[i][j][1] ? [now, from[1] + 1] : dp[i][j];
        }
      } else {
        if (dp[i][j] === null) {
          dp[i][j] = [...from];
        } else {
          dp[i][j] = from[1] > dp[i][j][1] ? [...from] : dp[i][j];
        }
      }
    }
  }
}

console.log(dp[n - 1][n - 1][1]);
