const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, K, Q], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const answer = [];
for (let i = 0; i < Q; i++) {
  let [x, y] = data[i];
  if (K === 1) {
    answer.push(Math.abs(y - x));
    continue;
  }
  let _answer = 0;
  while (x !== y) {
    if (x < y) {
      // K로 나눠서 부모를 찾을 수 있도록 초기값에 K - 2를 더함
      y = Math.floor((y + K - 2) / K);
    } else {
      x = Math.floor((x + K - 2) / K);
    }
    _answer++;
  }
  answer.push(_answer);
}

console.log(answer.join("\n"));
