const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
let max = 0; // 최대 점수
const scores = input[1].split(" ").map((v) => {
  max += Number(v);
  return Number(v);
});
let answer = 0;

let s = 0,
  e = max;
while (s <= e) {
  const mid = Math.floor((s + e) / 2);
  let group = 0;
  let score = 0;
  for (let s of scores) {
    score += s;
    if (score >= mid) {
      group++;
      score = 0;
    }
  }

  if (group >= K) {
    answer = mid;
    s = mid + 1;
  } else {
    e = mid - 1;
  }
}

console.log(answer);
