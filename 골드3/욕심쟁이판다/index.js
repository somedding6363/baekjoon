// dfs + dp

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], ...forest] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const dp = new Array(N).fill(null).map((_) => new Array(N).fill(-1));
const dxy = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const dfs = (x, y) => {
  if (dp[x][y] !== -1) {
    return dp[x][y];
  }
  dp[x][y] = 1;
  for (let i = 0; i < 4; i++) {
    const [lx, ly] = [x + dxy[i][0], y + dxy[i][1]];
    if (lx < 0 || lx >= N || ly < 0 || ly >= N) continue;
    if (forest[lx][ly] > forest[x][y]) {
      dp[x][y] = Math.max(dp[x][y], dfs(lx, ly) + 1);
    }
  }
  return dp[x][y];
};
let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    answer = Math.max(answer, dfs(i, j));
  }
}

console.log(answer);

// const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const input = require("fs").readFileSync(file).toString().trim().split("\n");
// const n = Number(input[0]);
// const forest = new Array(n);
// for (let i = 1; i < input.length; i++) {
//   forest[i - 1] = input[i].split(" ").map(Number);
// }

// const dx = [1, -1, 0, 0];
// const dy = [0, 0, 1, -1];
// const dp = new Array(n).fill(null).map((_) => new Array(n).fill(-1));

// const dfs = (x, y) => {
//   if (dp[x][y] !== -1) return dp[x][y];

//   dp[x][y] = 1;
//   for (let i = 0; i < 4; i++) {
//     const lx = x + dx[i];
//     const ly = y + dy[i];
//     if (lx < 0 || ly < 0 || lx > n - 1 || ly > n - 1) continue;
//     if (forest[lx][ly] > forest[x][y]) {
//       dp[x][y] = Math.max(dp[x][y], dfs(lx, ly) + 1);
//     }
//   }
//   return dp[x][y];
// };

// let maxLen = 0;
// for (let i = 0; i < n; i++) {
//   for (let j = 0; j < n; j++) {
//     maxLen = Math.max(maxLen, dfs(i, j));
//   }
// }

// console.log(maxLen);
