const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const graph = {};
for (let i = 1; i < input.length; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  if (graph[a]) {
    graph[a].push(b);
  } else {
    graph[a] = [b];
  }
  if (graph[b]) {
    graph[b].push(a);
  } else {
    graph[b] = [a];
  }
}

const root = Number(input[1].split(" ")[0]);
const dp = new Array(n + 1).fill(null).map((_) => new Array(2).fill(0));
const visited = new Array(n + 1).fill(false);
// dp[root][0] => root가 x일 때 => graph[root]가 모두 o => dp[graph[root][0]][1] + ...
// dp[root][1] => root가 o일 때 => graph[root]가 뭐든 상관없음 => min(dp[graph[root][0]][0], dp[graph[root][0]][1]) + ...

const dfs = (node) => {
  const arr = graph[node];
  visited[node] = true;
  dp[node][0] = 0;
  dp[node][1] = 1;

  for (let i = 0; i < arr.length; i++) {
    if (!visited[arr[i]]) {
      dfs(arr[i]);
      dp[node][0] += dp[arr[i]][1];
      dp[node][1] += Math.min(dp[arr[i]][0], dp[arr[i]][1]);
    }
  }
};

dfs(root);

console.log(Math.min(...dp[root]));
