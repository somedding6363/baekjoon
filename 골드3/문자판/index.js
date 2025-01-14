const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m, k] = input[0].split(" ").map(Number);
const map = new Array(n);
for (let i = 0; i < n; i++) {
  map[i] = input[i + 1].split("");
}
let answer = 0;
const word = input[n + 1].split("");
const dp = new Array(n)
  .fill(null)
  .map((_) =>
    new Array(m).fill(null).map((_) => new Array(word.length).fill(-1))
  );
const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

const dfs = (x, y, idx) => {
  if (dp[x][y][idx] !== -1) {
    return dp[x][y][idx];
  }

  if (idx === word.length - 1) {
    return 1;
  }

  let cnt = 0;
  for (let i = 1; i <= k; i++) {
    for (let j = 0; j < 4; j++) {
      const [lx, ly] = [x + dx[j] * i, y + dy[j] * i];
      if (lx < 0 || ly < 0 || lx >= n || ly >= m) continue;
      if (map[lx][ly] === word[idx + 1]) {
        cnt += dfs(lx, ly, idx + 1);
      }
    }
  }
  dp[x][y][idx] = cnt;

  return cnt;
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (word[0] === map[i][j]) {
      answer += dfs(i, j, 0);
    }
  }
}

console.log(answer);
