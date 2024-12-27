// dp
const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, k] = input[0].split(" ").map(Number);
const room = new Array(n);
let total = 0;
for (let i = 0; i < n; i++) {
  room[i] = input[i + 1].split(" ").map(Number);
  total += room[i][0] + room[i][1];
}
const dp = new Array(n + 1)
  .fill(null)
  .map((_) =>
    new Array(k + 1).fill(null).map((_) => new Array(3).fill(Infinity))
  );
if (k !== 0) {
  dp[1][0][0] = 0;
  dp[1][1][1] = room[0][0];
  dp[1][1][2] = room[0][1];
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j <= k; j++) {
      if (i < j) continue;
      if (j === 0) {
        dp[i][j][0] = 0;
      } else {
        dp[i][j][0] = Math.min(
          dp[i - 1][j][0],
          dp[i - 1][j][1],
          dp[i - 1][j][2]
        );
        dp[i][j][1] =
          Math.min(dp[i - 1][j - 1][0], dp[i - 1][j - 1][1]) + room[i - 1][0];
        dp[i][j][2] =
          Math.min(dp[i - 1][j - 1][0], dp[i - 1][j - 1][2]) + room[i - 1][1];
      }
    }
  }

  console.log(total - Math.min(dp[n][k][0], dp[n][k][1], dp[n][k][2]));
} else {
  console.log(total);
}
