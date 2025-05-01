const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, K], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const weight = [];
for (let i = 0; i < K; i++) {
  weight.push(data.pop()[0]);
}

data.sort((a, b) => b[1] - a[1] || b[0] - a[0]);
weight.sort((a, b) => b - a);

let answer = 0;
let index = 0;
while (index < N && weight.length) {
  const [M, V] = data[index];
  // 남은 배낭 중 가장 큰 배낭에도 안들어가는 경우
  if (M > weight[0]) {
    index++;
    continue;
  }

  // 이진 탐색
  let s = 0,
    e = weight.length - 1;
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);
    const nowWeight = weight[mid];
    if (nowWeight < M) {
      e = mid - 1;
    } else {
      s = mid + 1;
    }
  }
  weight.splice(s - 1, 1);
  answer += V;
  index++;
}
console.log(answer);
