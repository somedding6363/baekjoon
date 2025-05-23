const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

let answer = Infinity;
data.sort((a, b) => a - b);
// 서로 다른 한 쌍을 찾고, 투포인터로 나머지 한 쌍 탐색
// 엘사 : i, j
// 안나 : l, r
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    const elsa = data[i] + data[j];
    let l = 0,
      r = N - 1;
    while (l < r) {
      // l과 r이 i또는 j와 겹쳤을 때 패스
      if (l === i || l === j) {
        l++;
        continue;
      }
      if (r === i || r === j) {
        r--;
        continue;
      }
      const anna = data[l] + data[r];
      const diff = elsa - anna;
      answer = Math.min(answer, Math.abs(diff));
      if (diff === 0) {
        break;
      }
      // 엘사가 더 큰 경우
      if (diff > 0) {
        l++;
      }
      // 안나가 더 큰 경우
      else {
        r--;
      }
    }
    if (answer === 0) break;
  }
  if (answer === 0) break;
}

console.log(answer);
