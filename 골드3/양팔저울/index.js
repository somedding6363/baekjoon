const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N], [...weight], [M], [...ball]] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const max = N * 500;
const dp = new Array(N + 1).fill(null).map((_) => new Array(max + 1).fill(0));

const recursion = (idx, sum) => {
  if (idx === N + 1) {
    return;
  }
  if (dp[idx][sum] === 1) {
    return;
  }
  dp[idx][sum] = 1;

  recursion(idx + 1, sum);
  recursion(idx + 1, sum + weight[idx]);
  recursion(idx + 1, Math.abs(sum - weight[idx]));
};

recursion(0, 0);

const ans = [];
for (let b of ball) {
  if (b > max) {
    ans.push("N");
  } else if (dp[N][b] === 1) {
    ans.push("Y");
  } else {
    ans.push("N");
  }
}

console.log(ans.join(" "));
