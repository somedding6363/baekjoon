const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N, M, T, D], ...map] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v, i) => (i === 0 ? v.split(" ").map(Number) : v));

map = map.map((v) =>
  v
    .split("")
    .map((v2) =>
      v2.charCodeAt() - "A".charCodeAt() > 25
        ? v2.charCodeAt() - "A".charCodeAt() - 6
        : v2.charCodeAt() - "A".charCodeAt()
    )
);

// 노드는 (i * M + j)번, 총 N * M개씩
const NM = N * M;
const arr = new Array(NM).fill(null).map((_) => new Array(NM).fill(Infinity));

// 초기 인접 거리 저장
const dxy = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];
for (let x = 0; x < N; x++) {
  for (let y = 0; y < M; y++) {
    for (let d = 0; d < 4; d++) {
      const [lx, ly] = [x + dxy[d][0], y + dxy[d][1]];
      if (lx < 0 || lx >= N || ly < 0 || ly >= M) continue;
      const diff = map[lx][ly] - map[x][y];
      if (Math.abs(diff) > T) continue;
      const [a, b] = [x * M + y, lx * M + ly];
      if (diff >= 0) arr[a][b] = Math.pow(diff, 2);
      else arr[a][b] = 1;
    }
  }
}

for (let k = 0; k < NM; k++) {
  for (let i = 0; i < NM; i++) {
    for (let j = 0; j < NM; j++) {
      arr[i][j] = Math.min(arr[i][j], arr[i][k] + arr[k][j]);
    }
  }
}

let answer = 0;
for (let i = 1; i < NM; i++) {
  if (arr[0][i] + arr[i][0] <= D) {
    const [x, y] = [Math.floor(i / M), i % M];
    answer = Math.max(answer, map[x][y]);
  }
}
console.log(answer);
