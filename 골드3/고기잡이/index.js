const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, I, M], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

// 각 좌표의 row와 col을 따로 set으로 저장
const rows = new Set();
const cols = new Set();
for (let i = 0; i < M; i++) {
  rows.add(data[i][0]);
  cols.add(data[i][1]);
}

let answer = 0;
// 각 row와 col이 만나는 지점을 좌측 상단으로 처리하고 그물치기
for (let r of rows) {
  for (let c of cols) {
    for (let i = 1; i < I / 2; i++) {
      let cnt = 0;
      // min : r, c / max : r + i, c + (I / 2 - i)
      for (let d of data) {
        if (d[0] >= r && d[0] <= r + i && d[1] >= c && d[1] <= c + I / 2 - i)
          cnt++;
      }
      answer = Math.max(answer, cnt);
    }
  }
}

console.log(answer);
