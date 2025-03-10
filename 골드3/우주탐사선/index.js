const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, K], ...T] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

// 플로이드 와샬을 통해 한 행성으로부터 다른 행성까지 최단 경로 보장
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < N; k++) {
      T[i][j] = Math.min(T[i][j], T[i][k] + T[k][j]);
    }
  }
}

const visited = new Array(N).fill(false);
let sum = 0;
let answer = Infinity;
visited[K] = true;
// 모든 행성을 돌면서 가장 짧은 거리 구하기
const dfs = (s, c) => {
  if (c === N) {
    answer = Math.min(answer, sum);
    return;
  }
  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    sum += T[s][i];
    visited[i] = true;
    dfs(i, c + 1);
    sum -= T[s][i];
    visited[i] = false;
  }
};

dfs(K, 1);

console.log(answer);
