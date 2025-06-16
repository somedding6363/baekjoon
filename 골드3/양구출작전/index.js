const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[_N], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v1, i1) => (i1 >= 1 ? Number(v1) : v1)));

const N = Number(_N);
// 들어오는 간선의 수
const indegree = new Array(N + 1).fill(0);
// data 순회
for (let i = 0; i <= N - 2; i++) {
  indegree[Number(data[i][2])]++;
}

const queue = [];
for (let i = 2; i <= N; i++) {
  // 들어오는 간선이 하나도 없으면 리프 노드
  if (indegree[i] === 0) {
    queue.push(i);
  }
}

let answer = 0;
while (queue.length) {
  const now = queue.shift();
  const next = data[now - 2][2];

  // 양이면 다음 섬으로 이동시키기
  if (data[now - 2][0] === "S") {
    if (next === 1) answer += data[now - 2][1];
    else {
      const nowNum = data[now - 2][1];
      const nextNum = data[next - 2][1];
      // 다음 노드에 늑대가 있으면
      if (data[next - 2][0] === "W") {
        // 늑대의 수보다 양의 수가 많으면 양으로 변경
        if (nowNum >= nextNum) {
          data[next - 2][0] = "S";
          data[next - 2][1] = nowNum - nextNum;
        }
        // 늑대의 수가 양의 수보다 많으면 그대로 늑대
        else {
          data[next - 2][1] = nextNum - nowNum;
        }
      }
      // 다음 노드에 양이 있으면
      else {
        data[next - 2][1] = nowNum + nextNum;
      }
      if (--indegree[next] === 0) {
        queue.push(next);
      }
    }
  }
  // 늑대면 바로 다음 섬으로 이동시키기
  else {
    if (next === 1) continue;
    else {
      if (--indegree[next] === 0) {
        queue.push(next);
      }
    }
  }
}

console.log(answer);
