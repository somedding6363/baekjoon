const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, K], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const dp = new Array(N).fill(null).map((_) => new Array(K).fill(0));

let max = [0, 0];
let newMax = [0, 0];
let maxIdx = [-1, -1];
let newMaxIdx = [-1, -1];
const findMax = (val, idx) => {
  if (newMax[0] < val) {
    newMax[1] = newMax[0];
    newMax[0] = val;
    newMaxIdx[1] = newMaxIdx[0];
    newMaxIdx[0] = idx;
  } else if (newMax[1] < val) {
    newMax[1] = val;
    newMaxIdx[1] = idx;
  }
};
for (let i = 0; i < N; i++) {
  for (let j = 0; j < K; j++) {
    if (i === 0) {
      dp[i][j] = data[i][j];
    } else {
      if (j === maxIdx[0]) {
        dp[i][j] = max[1] + data[i][j];
      } else {
        dp[i][j] = max[0] + data[i][j];
      }
    }
    findMax(dp[i][j], j);
  }

  max = [...newMax];
  maxIdx = [...newMaxIdx];
}

console.log(Math.max(...dp[N - 1]));
