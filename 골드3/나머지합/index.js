const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N, M], [...data]] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

data = data.map((v) => v % M);
const acc = new Array(N).fill(0);
const rest = new Array(M).fill(0);
acc[0] = data[0];
rest[acc[0]]++;
for (let i = 1; i < N; i++) {
  acc[i] = (acc[i - 1] + data[i]) % M;
  rest[acc[i]]++;
}
let answer = 0;
for (let i = 0; i < M; i++) {
  if (rest[i] >= 2) {
    answer += (rest[i] * (rest[i] - 1)) / 2;
  }
}

console.log(rest[0] + answer);
