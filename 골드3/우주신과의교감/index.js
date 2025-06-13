const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

// edge 저장
const edges = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (i < j) {
      const d = Math.sqrt(
        (data[i][0] - data[j][0]) ** 2 + (data[i][1] - data[j][1]) ** 2
      );
      edges.push([d, i, j]);
    }
  }
}
// edges를 크기 순으로 오름차순
edges.sort((a, b) => a[0] - b[0]);

// 각 노드의 루트를 저장
const parent = Array.from({ length: N }, (_, i) => i);
// 루트 탐색
const findParent = (v) => {
  if (v !== parent[v]) {
    parent[v] = findParent(parent[v]);
  }

  return parent[v];
};
// 루트 병합
const mergeParent = (v1, v2) => {
  v1 = findParent(v1);
  v2 = findParent(v2);

  if (v1 < v2) parent[v2] = v1;
  else parent[v1] = v2;
};

// 이미 연결된 노드
for (let i = 0; i < M; i++) {
  const [a, b] = data[i + N];
  mergeParent(a - 1, b - 1);
}

let answer = 0;
for (let i = 0; i < edges.length; i++) {
  const [d, a, b] = edges[i];
  // 순환
  if (findParent(a) === findParent(b)) continue;
  // 연결 가능
  mergeParent(a, b);
  answer += d;
}

console.log(answer.toFixed(2));
