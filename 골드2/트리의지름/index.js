const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const N = Number(input[0]);
const data = new Array(N + 1).fill(null).map((_) => []);
for (let i = 0; i < N; i++) {
  const [n, ...arr] = input[i + 1].split(" ").map(Number);
  arr.pop();
  let temp = [];
  arr.forEach((val, idx) => {
    if (idx % 2 === 0) {
      temp = [val];
    } else {
      temp.push(val);
      data[n].push(temp);
    }
  });
}

let visited = new Array(N + 1).fill(false);
visited[1] = true;
let maxSum = 0;
let maxNode = 0;
const dfs = (node, sum) => {
  if (sum > maxSum) {
    maxNode = node;
    maxSum = sum;
  }
  data[node].forEach((v) => {
    if (!visited[v[0]]) {
      visited[v[0]] = true;
      dfs(v[0], sum + v[1]);
    }
  });
};

dfs(1, 0);
visited = new Array(N + 1).fill(false);
visited[maxNode] = true;
maxSum = 0;
dfs(maxNode, 0);

console.log(maxSum);
