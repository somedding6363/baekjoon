const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [N, ...plain] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v, i) => (i > 0 ? v.split("") : Number(v)));
const log = [];
const end = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (plain[i][j] === "B") {
      log.push([i, j]);
    }
    if (plain[i][j] === "E") {
      end.push([i, j]);
    }
  }
}

const lc = log[1]; // 통나무 중심
const ec = end[1]; // 도착지 중심
let ld = log[0][0] - log[1][0] === 0 ? 0 : 1; // 통나무 가로0 or 세로1
let ed = end[0][0] - end[1][0] === 0 ? 0 : 1; // 도착지 가로0 or 세로1

const visited = new Array(N)
  .fill(null)
  .map((_) => new Array(N).fill(null).map((_) => new Array(2)));
visited[lc[0]][lc[1]][ld] = true;
const queue = [[...lc, ld, 0]];
const dxy = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
  [0, 0],
];
while (queue.length) {
  let [x, y, d, cnt] = queue.shift();
  for (let i = 0; i < 5; i++) {
    const [dx, dy] = [x + dxy[i][0], y + dxy[i][1]];
    if (i < 4) {
      if (d === 0) {
        if (dx < 0 || dx >= N || dy < 1 || dy >= N - 1) continue;
        if (
          plain[dx][dy - 1] === "1" ||
          plain[dx][dy] === "1" ||
          plain[dx][dy + 1] === "1"
        )
          continue;
      }
      if (d === 1) {
        if (dx < 1 || dx >= N - 1 || dy < 0 || dy >= N) continue;
        if (
          plain[dx - 1][dy] === "1" ||
          plain[dx][dy] === "1" ||
          plain[dx + 1][dy] === "1"
        )
          continue;
      }
    } else {
      if (dx < 1 || dx >= N - 1 || dy < 1 || dy >= N - 1) continue;
      if (
        plain[dx - 1][dy - 1] === "1" ||
        plain[dx - 1][dy] === "1" ||
        plain[dx - 1][dy + 1] === "1" ||
        plain[dx][dy - 1] === "1" ||
        plain[dx][dy] === "1" ||
        plain[dx][dy + 1] === "1" ||
        plain[dx + 1][dy - 1] === "1" ||
        plain[dx + 1][dy] === "1" ||
        plain[dx + 1][dy + 1] === "1"
      )
        continue;
      d = (d + 1) % 2;
    }

    if (visited[dx][dy][d]) continue;
    if (dx === ec[0] && dy === ec[1] && d === ed) {
      console.log(cnt + 1);
      process.exit();
    }

    queue.push([dx, dy, d, cnt + 1]);
    visited[dx][dy][d] = true;
  }
}
console.log(0);
