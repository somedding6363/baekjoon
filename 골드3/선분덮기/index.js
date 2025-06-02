const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[M], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

data.pop();
// L을 기준으로 오름차순 정렬
data.sort((a, b) => a[0] - b[0]);

let answer = 0;
// 현재 덮인 마지막 좌표
let last = 0;
// 현재 좌표가 덮였을 때 가장 큰 R
let max = 0;

// data 순회
for (let i = 0; i < data.length; i++) {
  const [L, R] = data[i];
  // 덮어야 하는 좌표를 덮을 수 없을 때
  if (last < L) {
    // 가장 큰 좌표로 갱신
    last = max;
    answer++;
  }

  // 덮어야 하는 좌표를 덮일 수 있을 때
  if (L <= last) {
    // max 갱신
    max = Math.max(max, R);
    // [0, M]이 덮였을 때
    if (max >= M) {
      last = max;
      answer++;
      break;
    }
  }
}

// 다 못 덮었으면 0
if (last < M) answer = 0;

console.log(answer);
