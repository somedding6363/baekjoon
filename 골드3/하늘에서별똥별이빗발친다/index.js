const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M, L, K], ...stars] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

let answer = 0;
for (let i = 0; i < K; i++) {
  for (let j = 0; j < K; j++) {
    const [r, c] = [stars[i][0], stars[j][1]];
    let cnt = 0;
    for (let k = 0; k < K; k++) {
      if (
        r <= stars[k][0] &&
        stars[k][0] <= r + L &&
        c <= stars[k][1] &&
        stars[k][1] <= c + L
      ) {
        cnt++;
      }
    }
    answer = Math.max(cnt, answer);
  }
}

console.log(K - answer);
