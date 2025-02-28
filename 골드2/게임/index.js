const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [NM, ...board] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n");

const [N, M] = NM.split(" ").map(Number);
const dxy = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const visited = new Array(N).fill(null).map((_) => new Array(M).fill(false));
const dp = new Array(N).fill(null).map((_) => new Array(M).fill(0));
visited[0][0] = true;

let answer = 0;
const dfs = (x, y) => {
  if (board[x][y] === "H") return 0;
  if (dp[x][y]) return dp[x][y];

  for (let i = 0; i < 4; i++) {
    const temp = +board[x][y];
    const [lx, ly] = [x + dxy[i][0] * temp, y + dxy[i][1] * temp];

    if (lx < 0 || lx >= N || ly < 0 || ly >= M) continue;
    if (visited[lx][ly]) {
      console.log(-1);
      process.exit();
    }
    visited[lx][ly] = true;
    dp[x][y] = Math.max(dfs(lx, ly) + 1, dp[x][y]);
    visited[lx][ly] = false;
  }

  return (dp[x][y] = dp[x][y] ? dp[x][y] : 1);
};

dfs(0, 0);

console.log(dp[0][0]);
