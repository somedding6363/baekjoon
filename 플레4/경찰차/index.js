const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], [W], ...accidents] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const dp = new Array(W + 1).fill(null).map((_) => new Array(W + 1).fill(0));
const pick = new Array(W + 1).fill(null).map((_) => new Array(W + 1).fill(0));
const recursion = (a, b) => {
  const next = Math.max(a, b) + 1;
  if (next === W + 1) {
    return 0;
  }

  if (dp[a][b]) return dp[a][b];

  const [x, y] = accidents[next - 1];
  const getA =
    recursion(next, b) +
    (a - 1 >= 0
      ? Math.abs(x - accidents[a - 1][0]) + Math.abs(y - accidents[a - 1][1])
      : x + y - 2);
  const getB =
    recursion(a, next) +
    (b - 1 >= 0
      ? Math.abs(x - accidents[b - 1][0]) + Math.abs(y - accidents[b - 1][1])
      : N * 2 - (x + y));
  if (getA <= getB) {
    dp[a][b] = getA;
    pick[a][b] = 1;
  } else {
    dp[a][b] = getB;
    pick[a][b] = 2;
  }

  return dp[a][b];
};

recursion(0, 0);

const answer = [];
answer.push(dp[0][0]);
let a = 0,
  b = 0;
for (let i = 0; i < W; i++) {
  const next = Math.max(a, b) + 1;
  const choice = pick[a][b];
  answer.push(choice);
  if (choice === 1) {
    a = next;
  } else {
    b = next;
  }
}

console.log(answer.join("\n"));
