// 위상정렬

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const compare = Array.from({ length: n }, () => []);
const degree = Array.from({ length: n }, () => 0);
for (let i = 0; i < m; i++) {
  const [a, b] = input[i + 1].split(" ").map(Number);
  compare[a - 1].push(b);
  degree[b - 1]++;
}
const queue = [];
degree.forEach((v, i) => (v === 0 ? queue.push(i + 1) : null));

const answer = [];
while (queue.length) {
  const now = queue.shift();
  answer.push(now);
  for (let v of compare[now - 1]) {
    degree[v - 1]--;
    if (degree[v - 1] === 0) queue.push(v);
  }
}
const set = new Set();
for (let i = 0; i < answer.length; i++) {
  set.add(answer[i]);
}
for (let i = 1; i <= n; i++) {
  set.add(i);
}

const arr = Array.from(set);
console.log(arr.join(" "));
