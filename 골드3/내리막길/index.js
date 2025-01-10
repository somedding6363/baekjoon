const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const map = new Array(n);
for (let i = 0; i < n; i++) {
  map[i] = input[i + 1].split(" ").map(Number);
}

const dp = new Array(n).fill(null).map((_) => new Array(m).fill(-1));
const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];
const dfs = (x, y) => {
  if (x === 0 && y === 0) {
    return 1;
  }
  if (dp[x][y] > -1) {
    return dp[x][y];
  }
  let ways = 0;
  for (let i = 0; i < 4; i++) {
    const lx = x + dx[i];
    const ly = y + dy[i];
    if (lx < 0 || ly < 0 || lx >= n || ly >= m) continue;
    if (map[lx][ly] > map[x][y]) {
      ways += dfs(lx, ly);
    }
  }
  dp[x][y] = ways;
  return dp[x][y];
};

dfs(n - 1, m - 1);

console.log(dp[n - 1][m - 1]);
