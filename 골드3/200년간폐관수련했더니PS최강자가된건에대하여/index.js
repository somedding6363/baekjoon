const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

// 누적 상금
let prize = 0;
// 가장 큰 상금
let maxPrize = 0;
// 빠질 수 있는 대회 수
let count = 1;
let answer = "Kkeo-eok";
for (let i = 0; i < N; i++) {
  const [m, p] = data[i];

  if (prize <= m) {
    prize += p;
    // 가장 큰 상금 기록
    if (count) maxPrize = Math.max(maxPrize, p);
  } else {
    if (count) {
      // // 만약 이전까지의 상금보다 현재 상금이 작다면
      // if (p < maxPrize) {
      //   prize = prize - maxPrize;
      //   i--;
      // }
      // count--;
      // maxPrize = 0; // 이제 maxPrize는 필요 없음
      count--;
      if (p >= maxPrize) continue;
      prize -= maxPrize;
      if (prize <= m) {
        prize += p;
      } else {
        prize += maxPrize;
      }
    } else {
      answer = "Zzz";
    }
  }
}

console.log(answer);
