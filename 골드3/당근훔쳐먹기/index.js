const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N, T], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

let answer = 0;
// p로 내림차순
data.sort((d1, d2) => d2[1] - d1[1]);
let t = T;
for (let carrot of data) {
  const [w, p] = carrot;
  // 최대한 아껴뒀다가 먹기
  answer += p * --t + w;
}

console.log(answer);
