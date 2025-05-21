const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

input.pop();
const N = input.length;
const dp = new Array(N + 1)
  .fill(0)
  .map((_) => new Array(5).fill(null).map((_) => new Array(5).fill(Infinity)));

dp[0][0][0] = 0;
const weight = (a, b) => {
  if (a === 0) return 2;
  if (Math.abs(a - b) === 1) return 3;
  if (Math.abs(a - b) === 3) return 3;
  if (Math.abs(a - b) === 2) return 4;
  if (a === b) return 1;
};
for (let s = 0; s < N; s++) {
  const now = input[s];
  for (let l = 0; l < 5; l++) {
    for (let r = 0; r < 5; r++) {
      // 왼발로 가는 경우(기존 오른발 위치 제외)
      if (now !== r) {
        dp[s + 1][now][r] = Math.min(
          dp[s + 1][now][r],
          dp[s][l][r] + weight(l, now)
        );
      }
      // 오른발로 가는 경우(기존 왼발 위치 제외)
      if (now !== l) {
        dp[s + 1][l][now] = Math.min(
          dp[s + 1][l][now],
          dp[s][l][r] + weight(r, now)
        );
      }
    }
  }
}
let answer = Infinity;
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    answer = Math.min(answer, dp[N][i][j]);
  }
}

console.log(answer);
