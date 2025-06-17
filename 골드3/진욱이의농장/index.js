const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const farm = new Array(N).fill(null).map((_) => new Array(N).fill(0));
// 씨앗 종류 집합
const fSet = new Set();
for (let i = 0; i < M; i++) {
  const [X, Y, L, F] = data[i];
  for (let j = 0; j < L; j++) {
    for (let k = 0; k < L; k++) {
      farm[X + j][Y + k] = F;
    }
  }
  fSet.add(F);
}

// 씨앗 종류 0인 것은 삭제
fSet.delete(0);
const fArr = Array.from(fSet);
// 씨앗 종류 2개씩 비교하여 가장 큰 정사각형 찾기
let max = 0;
for (let f1 = 0; f1 < fArr.length; f1++) {
  for (let f2 = f1; f2 < fArr.length; f2++) {
    // dp 초기화
    const dp = new Array(N).fill(null).map((_) => new Array(N).fill(0));
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (fArr[f1] === farm[i][j] || fArr[f2] === farm[i][j]) dp[i][j] = 1;
      }
    }

    // (i, j)에서 끝나는 최대 정사각형 찾기
    for (let i = 1; i < N; i++) {
      for (let j = 1; j < N; j++) {
        if (dp[i][j]) {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
          max = Math.max(max, dp[i][j] ** 2);
        }
      }
    }
  }
}

console.log(max);
