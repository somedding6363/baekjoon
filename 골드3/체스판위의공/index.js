const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M], ...board] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const dp = new Array(N).fill(null).map((_) => new Array(M).fill(null));
const answer = new Array(N).fill(null).map((_) => new Array(M).fill(0));
const dxy = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const move = (x, y) => {
  if (dp[x][y]) return dp[x][y];
  let minx = x,
    miny = y;
  let min = board[x][y];
  for (let i = 0; i < 8; i++) {
    const [lx, ly] = [x + dxy[i][0], y + dxy[i][1]];
    if (lx < 0 || lx >= N || ly < 0 || ly >= M) continue;
    if (board[lx][ly] < min) {
      minx = lx;
      miny = ly;
      min = board[lx][ly];
    }
  }

  if (min === board[x][y]) {
    dp[minx][miny] = [minx, miny];
    return dp[minx][miny];
  } else {
    dp[x][y] = move(minx, miny);
    return dp[x][y];
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const [x, y] = move(i, j);
    answer[x][y]++;
  }
}

console.log(answer.map((v) => v.join(" ")).join("\n"));
