const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let min = Infinity;
let max = 0;
const [[N, M, K], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v, i) =>
    v.split(" ").map((v1) => {
      if (i !== 0) {
        max = Math.max(max, Number(v1));
        min = Math.min(min, Number(v1));
      }
      return Number(v1);
    })
  );

const dxy = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const mining = (a) => {
  let count = 0;
  const visited = new Array(N).fill(null).map((_) => new Array(M).fill(false));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (visited[i][j]) continue;
      if (data[i][j] <= a) {
        // 공기와 맞닿아 있을 때만 가능
        let isAirWith = false;
        if (i === 0 || j === 0 || j === M - 1) isAirWith = true;
        else {
          for (let d = 0; d < 4; d++) {
            const [di, dj] = [i + dxy[d][0], j + dxy[d][1]];
            if (di >= N) continue;
            if (visited[di][dj]) isAirWith = true;
          }
        }
        if (!isAirWith) continue;

        // bfs
        visited[i][j] = true;
        count++;
        const queue = [[i, j]];
        while (queue.length) {
          const [x, y] = queue.shift();
          for (let d = 0; d < 4; d++) {
            const [lx, ly] = [x + dxy[d][0], y + dxy[d][1]];
            if (lx < 0 || lx >= N || ly < 0 || ly >= M || visited[lx][ly])
              continue;
            if (data[lx][ly] <= a) {
              visited[lx][ly] = true;
              queue.push([lx, ly]);
              count++;
            }
          }
        }
      }
    }
  }
  return count >= K;
};

// 이분탐색
while (min <= max) {
  let mid = Math.floor((min + max) / 2);
  if (mining(mid)) {
    max = mid - 1;
  } else {
    min = mid + 1;
  }
}

console.log(min);
