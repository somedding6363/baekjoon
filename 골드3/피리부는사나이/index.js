const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [NM, ...map] = require("fs")
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
]; // 상, 하, 좌, 우
const visited = new Array(N).fill(null).map((_) => new Array(M).fill(false));
const dfs1 = (x, y) => {
  if (map[x][y] === "U") {
    x -= 1;
  }
  if (map[x][y] === "D") {
    x += 1;
  }
  if (map[x][y] === "L") {
    y -= 1;
  }
  if (map[x][y] === "R") {
    y += 1;
  }

  if (!visited[x][y]) {
    visited[x][y] = true;
    dfs1(x, y);
    dfs2(x, y);
  }
};
const dfs2 = (x, y) => {
  for (let d = 0; d < 4; d++) {
    const [lx, ly] = [x + dxy[d][0], y + dxy[d][1]];
    if (lx < 0 || lx >= N || ly < 0 || ly >= M || visited[lx][ly]) continue;

    if (
      (d === 0 && map[lx][ly] === "D") ||
      (d === 1 && map[lx][ly] === "U") ||
      (d === 2 && map[lx][ly] === "R") ||
      (d === 3 && map[lx][ly] === "L")
    ) {
      visited[lx][ly] = true;
      dfs2(lx, ly);
    }
  }
};
let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visited[i][j]) {
      answer++;
      visited[i][j] = true;
      dfs1(i, j);
      dfs2(i, j);
    }
  }
}

console.log(answer);
