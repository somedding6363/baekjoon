const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[n, m], ...word] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

word = word.flat();

const dp = new Array(n).fill(Infinity);
dp[n - 1] = 0;

const recursion = (idx) => {
  if (dp[idx] !== Infinity) return dp[idx];

  let remain = m - word[idx];
  for (let i = idx + 1; i <= n; i++) {
    if (i === n) {
      dp[idx] = 0;
      break;
    }
    dp[idx] = Math.min(dp[idx], remain * remain + recursion(i));
    remain -= word[i] + 1;
    if (remain < 0) break;
  }

  return dp[idx];
};

console.log(recursion(0));
