const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], num] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

// l에서 r까지 팰린드롬 수열을 만들 때 필요한 개수
const dp = new Array(N).fill(null).map((_) => new Array(N).fill(-1));
const recursion = (l, r) => {
  if (l > r) return 0;
  if (dp[l][r] !== -1) return dp[l][r];

  if (num[l] !== num[r]) {
    // 양 끝 값이 다른 경우
    // (l + 1) ~ (r)까지 팰린드롬 만들 때 필요한 개수 + 1
    // (l) ~ (r + 1)까지 팰린드롬 만들 때 필요한 개수 + 1
    // 두 값 중 더 작은 값
    return (dp[l][r] = Math.min(recursion(l + 1, r), recursion(l, r - 1)) + 1);
  } else {
    // 양 끝 값이 같은 경우
    // (l + 1) ~ (r - 1)까지 팰린드롬 만들 때 필요한 개수랑 같음
    return (dp[l][r] = recursion(l + 1, r - 1));
  }
};

console.log(recursion(0, N - 1));
