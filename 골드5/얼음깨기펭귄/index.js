const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, S, P], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const connect = new Array(N + 1).fill(null).map(() => []);
for (let i = 0; i < N - 1; i++) {
  const [A, B] = data[i];
  connect[A].push(B);
  connect[B].push(A);
}

const visited = new Array(N + 1).fill(false);
const queue = [[P, 0]];
visited[P] = true;
const dep = [];
while (queue.length && dep.length < 2) {
  const [now, d] = queue.shift();
  for (let i = 0; i < connect[now].length; i++) {
    const next = connect[now][i];
    if (visited[next]) continue;
    visited[next] = true;
    if (next <= S) {
      dep.push(d + 1);
    }
    queue.push([next, d + 1]);
  }
}

console.log(N - dep[0] - dep[1] - 1);
