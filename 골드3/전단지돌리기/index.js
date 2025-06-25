const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, S, D], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

// 연결 생성
const connection = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < N - 1; i++) {
  const [a, b] = data[i];
  connection[a].push(b);
  connection[b].push(a);
}
// dfs
const visited = new Array(N + 1).fill(false);
visited[S] = true;
let answer = 0;
const dfs = (node) => {
  visited[node] = true;
  const conArr = connection[node];
  let cnt = 0;
  for (let i = 0; i < conArr.length; i++) {
    if (!visited[conArr[i]]) {
      let result = dfs(conArr[i]);
      // 리프노드가 D보다 크면 왔다갔다 -> +2
      if (result >= D) {
        answer += 2;
      }
      // 리프노트까지 가장 먼 거리로 판단
      cnt = Math.max(cnt, result + 1);
    }
  }
  return cnt;
};

dfs(S);
console.log(answer);
