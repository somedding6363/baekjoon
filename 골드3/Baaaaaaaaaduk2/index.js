const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

let answer = 0;
const white = [];
const black = [];
const empty = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (data[i][j] === 0) {
      empty.push([i, j]);
    } else if (data[i][j] === 1) {
      white.push([i, j]);
    } else if (data[i][j] === 2) {
      black.push([i, j]);
    }
  }
}

const dxy = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const BFS = () => {
  let totalCount = 0;
  const visited = new Array(N).fill(null).map((_) => new Array(M).fill(false));
  for (let i = 0; i < black.length; i++) {
    let isGet = true;
    let count = 0;
    if (!visited[black[i][0]][black[i][1]]) {
      const queue = [black[i]];
      visited[queue[0][0]][queue[0][1]] = true;
      while (queue.length) {
        const [x, y] = queue.shift();
        count++;
        for (let d = 0; d < 4; d++) {
          const [dx, dy] = [x + dxy[d][0], y + dxy[d][1]];
          if (dx < 0 || dx >= N || dy < 0 || dy >= M || visited[dx][dy])
            continue;
          if (data[dx][dy] === 0) isGet = false;
          else if (data[dx][dy] === 2) {
            queue.push([dx, dy]);
            visited[dx][dy] = true;
          }
        }
      }
    }

    if (isGet) {
      totalCount += count;
    }
  }

  return totalCount;
};

for (let i = 0; i < empty.length; i++) {
  for (let j = i + 1; j < empty.length; j++) {
    const [r1, c1] = empty[i];
    const [r2, c2] = empty[j];

    data[r1][c1] = 1;
    data[r2][c2] = 1;
    answer = Math.max(answer, BFS());
    data[r1][c1] = 0;
    data[r2][c2] = 0;
  }
}

console.log(answer);
