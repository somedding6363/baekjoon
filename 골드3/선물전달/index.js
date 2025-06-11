const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [N] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const mod = 1000000000;
const dp = new Array(N + 1).fill(0);
dp[1] = 0;
dp[2] = 1;
for (let i = 3; i <= N; i++) {
  dp[i] = ((i - 1) * (dp[i - 2] + dp[i - 1])) % mod;
}

console.log(dp[N] % mod);
