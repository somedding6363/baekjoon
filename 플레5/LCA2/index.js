const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

let adj = new Array(N + 1).fill(null).map((_) => []);
for (let i = 0; i < N - 1; i++) {
  adj[data[i][0]].push(data[i][1]);
  adj[data[i][1]].push(data[i][0]);
}
const M = data[N - 1];
let MArr = [];
for (let i = 0; i < M; i++) {
  MArr.push(data[N + i]);
}

let maxlog = Math.floor(Math.log2(N));
let depth = new Array(N + 1).fill(0);
let dp = new Array(N + 1).fill(null).map((_) => new Array(maxlog + 1).fill(-1));
const dfs = (node, root, dep) => {
  dp[node][0] = root;
  depth[node] = dep;

  for (let i = 1; i < maxlog + 1; i++) {
    if (dp[node][i - 1] !== -1) {
      dp[node][i] = dp[dp[node][i - 1]][i - 1];
    }
  }

  for (let i in adj[node]) {
    if (adj[node][i] !== root) {
      dfs(adj[node][i], node, dep + 1);
    }
  }
};
dfs(1, -1, 0);

let answer = [];
for (let i = 0; i < M; i++) {
  let [a, b] = MArr[i];
  if (depth[a] > depth[b]) [a, b] = [b, a];

  for (let i = maxlog; i >= 0; i--) {
    if (Math.pow(2, i) <= depth[b] - depth[a]) {
      b = dp[b][i];
    }
  }
  if (a === b) answer.push(a);
  else {
    for (let i = maxlog; i >= 0; i--) {
      if (dp[a][i] !== dp[b][i]) {
        a = dp[a][i];
        b = dp[b][i];
      }
    }
    answer.push(dp[a][0]);
  }
}

console.log(answer.join("\n"));
