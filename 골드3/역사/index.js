const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, k] = input[0].split(" ").map(Number);
const relation = {};
const toCount = new Array(n + 1).fill(0);
for (let i = 0; i < k; i++) {
  const [prev, next] = input[i + 1].split(" ").map(Number);
  if (relation[prev]) {
    relation[prev].add(next);
  } else {
    relation[prev] = new Set([next]);
  }
  toCount[next]++;
}

const history = {};
let queue = [];
for (let i = 1; i <= n; i++) {
  if (toCount[i] === 0) {
    queue.push(i);
  }
}
while (queue.length) {
  const now = queue.shift();

  if (relation[now]) {
    for (let i of relation[now]) {
      if (!history[i]) {
        history[i] = new Set();
      }
      history[i].add(now);
      if (history[now]) {
        for (const item of history[now]) {
          history[i].add(item);
        }
      }
      toCount[i]--;
      if (toCount[i] === 0) {
        queue.push(i);
      }
    }
  }
}

const s = Number(input[1 + k]);
for (let i = 0; i < s; i++) {
  const [a, b] = input[2 + k + i].split(" ").map(Number);
  if (history[a] && history[a].has(b)) {
    console.log(1);
  } else if (history[b] && history[b].has(a)) {
    console.log(-1);
  } else {
    console.log(0);
  }
}
