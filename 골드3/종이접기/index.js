const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const k = Number(input[0]);
const order = input[1].split(" ");
const punch = Number(input[2]);
const dp = new Array(2 * k + 1).fill(null);

dp[2 * k] = [[punch]];
for (let i = 2 * k - 1; i >= 0; i--) {
  let str = order[i];
  const prev = dp[i + 1];
  if (str === "D") {
    dp[i] = new Array(prev.length * 2).fill(null);
    for (let j = 0; j < prev.length; j++) {
      dp[i][j] = prev[prev.length - j - 1].map((p) => (p + 2) % 4);
      dp[i][j + prev.length] = prev[j].map((p) => p);
    }
  } else if (str === "U") {
    dp[i] = new Array(prev.length * 2).fill(null);
    for (let j = 0; j < prev.length; j++) {
      dp[i][j] = prev[j].map((p) => p);
      dp[i][j + prev.length] = prev[prev.length - j - 1].map(
        (p) => (p + 2) % 4
      );
    }
  } else if (str === "R") {
    dp[i] = prev.map((row) => [...row]);
    for (let j = 0; j < prev.length; j++) {
      dp[i][j] = [...dp[i][j]]
        .reverse()
        .map((v) => (v % 2 ? v - 1 : v + 1))
        .concat(dp[i][j]);
    }
  } else if (str === "L") {
    dp[i] = prev.map((row) => [...row]);
    for (let j = 0; j < prev.length; j++) {
      dp[i][j] = [...dp[i][j]].concat(
        dp[i][j].reverse().map((v) => (v % 2 ? v - 1 : v + 1))
      );
    }
  }
}

for (let i = 0; i < Math.pow(2, k); i++) {
  console.log(dp[0][i].join(" "));
}
