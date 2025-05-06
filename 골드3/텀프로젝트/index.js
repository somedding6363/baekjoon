const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[T], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const answer = [];
for (let t = 0; t < T; t++) {
  let number = 0; // 팀에 속하지 못한 학생들의 수
  const idx = t * 2; // data의 실제 인덱스
  const visited = new Array(data[idx][0]).fill(false);
  let stack = []; // 현재 dfs로 연결되는 학생
  const dfs = (now) => {
    if (visited[now]) {
      const target = stack.indexOf(now);
      if (target !== -1) {
        number += target; // 앞에 인원수만큼 팀을 못짬
      } else {
        number += stack.length; // 현재 연결된 인원수만큼 팀을 못짬
      }
      return;
    } else {
      visited[now] = true;
      stack.push(now);
      dfs(data[idx + 1][now] - 1);
    }
  };
  for (let i = 0; i < data[idx][0]; i++) {
    stack = []; // 스택 초기화
    const now = data[idx + 1][i] - 1;
    if (visited[i]) continue;
    visited[i] = true;
    stack.push(i);
    dfs(now);
  }
  answer.push(number);
}

console.log(answer.join("\n"));
