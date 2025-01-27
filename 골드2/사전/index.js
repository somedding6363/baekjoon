const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [N, M, K] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const dp = new Array(N + 1).fill(null).map((_) => new Array(M + 1).fill(0));

const dfs = (n, m) => {
  if (n === 0 || m === 0) {
    return (dp[n][m] = 1);
  }
  if (dp[n][m]) return dp[n][m];

  return (dp[n][m] = dfs(n - 1, m) + dfs(n, m - 1));
};

let str = "";
const dfs2 = (n, m, k) => {
  if (n === 0) {
    str += "z".repeat(m);
  } else if (m === 0) {
    str += "a".repeat(n);
  } else {
    if (dp[n - 1][m] < k) {
      str += "z";
      dfs2(n, m - 1, k - dp[n - 1][m]);
    } else {
      str += "a";
      dfs2(n - 1, m, k);
    }
  }
};

dfs(N, M);

if (dp[N][M] < K) {
  console.log(-1);
} else {
  dfs2(N, M, K);
  console.log(str);
}
