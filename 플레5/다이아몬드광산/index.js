const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[R, C], ...mine] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v, i) =>
    i === 0 ? v.split(" ").map(Number) : v.split("").map(Number)
  );

// 왼쪽 위, 오른쪽 위, 왼쪽 아래, 오른쪽 아래
const dp = new Array(R)
  .fill(null)
  .map((_) => new Array(C).fill(null).map((_) => new Array(4).fill(0)));

// 순차적으로 왼쪽 위, 오른쪽 위를 dp에 저장 -> 0, 1
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (mine[i][j] === 1) {
      if (i === 0) {
        dp[i][j][0] = 1;
        dp[i][j][1] = 1;
      } else {
        dp[i][j][0] = j === 0 ? 1 : dp[i - 1][j - 1][0] + 1;
        dp[i][j][1] = j === C - 1 ? 1 : dp[i - 1][j + 1][1] + 1;
      }
    }
  }
}

// 역으로 왼쪽 아래, 오른쪽 아래를 dp에 저장 -> 2, 3
for (let i = R - 1; i >= 0; i--) {
  for (let j = C - 1; j >= 0; j--) {
    if (mine[i][j] === 1) {
      if (i === R - 1) {
        dp[i][j][2] = 1;
        dp[i][j][3] = 1;
      } else {
        dp[i][j][2] = j === 0 ? 1 : dp[i + 1][j - 1][2] + 1;
        dp[i][j][3] = j === C - 1 ? 1 : dp[i + 1][j + 1][3] + 1;
      }
    }
  }
}

// (왼쪽 아래, 오른쪽 아래) 중 더 작은 값(n) 계산
// 1 ~ (n - 1) * 2만큼 아래로 이동한 위치에서 (왼쪽 위, 오른쪽 위)가 각각 n보다 크거나 같은지 계산
let answer = 0;
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (mine[i][j] === 1) {
      let n = Math.min(dp[i][j][2], dp[i][j][3]);
      // 다이아몬드를 만들 수 없거나 || 지금까지 찾은 최대 크기보다 작으면 패스
      if (n === 0 || n <= answer) continue;
      for (let _n = 1; _n <= n; _n++) {
        let next = (_n - 1) * 2;
        if (i + next >= R) continue;
        if (dp[i + next][j][0] >= _n && dp[i + next][j][1] >= _n)
          answer = Math.max(answer, _n);
      }
    }
  }
}

console.log(answer);
