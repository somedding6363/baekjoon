const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M], ...board] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const dxy = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const bfs = ([i, j]) => {
  const queue = [[i, j]];
  const zeroVisited = {};
  let cnt = 1,
    zero = 0;
  while (queue.length) {
    const [x, y] = queue.shift();
    for (let d = 0; d < 4; d++) {
      const [lx, ly] = [x + dxy[d][0], y + dxy[d][1]];
      if (lx < 0 || lx >= N || ly < 0 || ly >= M) continue;
      const value = board[lx][ly];
      if (value === 2) {
        queue.push([lx, ly]);
        board[lx][ly] = -1;
        cnt++;
      } else if (value === 0) {
        if (!zeroVisited[`${lx}-${ly}`]) {
          zeroVisited[`${lx}-${ly}`] = true;
          zero++;
        }
      }
    }
  }
  return [cnt, zero];
};

const answer = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 2) {
      board[i][j] = -1;
      const [cnt, zero] = bfs([i, j]);
      if (zero <= 2) {
        answer.push([cnt, zero]);
      }
    }
  }
}

answer.sort((a, b) => b[1] - a[1] || b[0] - a[0]);
if (answer.length === 0) {
  console.log(0);
} else if (answer[0][1] === 2) {
  console.log(answer[0][0]);
} else {
  console.log(answer[0][0] + answer[1][0]);
}
