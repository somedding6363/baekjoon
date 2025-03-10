const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M, T], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const testcase = [];
for (let i = 0; i < T; i++) {
  testcase.push(data.pop());
}

// 간선의 높이 2차원 배열 arr[i][j] : 정점 i에서 정점 j로 갈 때 마주하는 허들 높이
const arr = new Array(N).fill(null).map((_) => new Array(N).fill(Infinity));
// 간선의 높이 초기화
for (let i = 0; i < M; i++) {
  const [u, v, h] = data[i];
  arr[u - 1][v - 1] = h;
}

// 플로이드 와샬로 k를 거친 허들 중 가장 높은 허들이 최소가 될 수 있도록 설정
for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      arr[i][j] = Math.min(arr[i][j], Math.max(arr[i][k], arr[k][j]));
    }
  }
}

const answer = [];
for (let i = T - 1; i >= 0; i--) {
  const [s, e] = testcase[i];
  console.log(arr[s - 1][e - 1] === Infinity ? -1 : arr[s - 1][e - 1]);
}

console.log(answer.join("\n"));
