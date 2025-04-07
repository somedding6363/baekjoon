const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [N, K] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

if (K > N / 2) console.log(0);
else {
  // dp[i][j] = i개의 색 중 인접하지 않고 j개 만큼 선택한 경우의 수
  const dp = new Array(N + 1).fill(null).map((_) => new Array(K + 1).fill(0));
  for (let i = 0; i <= N; i++) {
    dp[i][1] = i;
    dp[i][0] = 1;
  }
  for (let i = 2; i <= N; i++) {
    for (let j = 2; j <= K; j++) {
      dp[i][j] = (dp[i - 1][j] + dp[i - 2][j - 1]) % 1000000003;
    }
  }

  console.log((dp[N - 3][K - 1] + dp[N - 1][K]) % 1000000003);
}
