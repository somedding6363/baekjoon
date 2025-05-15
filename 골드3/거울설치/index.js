const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [_N, ...home] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n");

const N = +_N;
const door = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (home[i][j] === "#") {
      door.push([i, j]);
    }
  }
}
const dxy = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
let answer = 0;
let queue = [door[0]];
const visited = {};
while (queue.length) {
  let stack = [...queue];
  queue = [];
  while (stack.length) {
    const [x, y] = stack.pop();
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < N; j++) {
        const [lx, ly] = [x + dxy[i][0] * j, y + dxy[i][1] * j];
        if (lx < 0 || lx >= N || ly < 0 || ly >= N || home[lx][ly] === "*")
          break;
        if (door[1][0] === lx && door[1][1] === ly) {
          console.log(answer);
          process.exit();
        }
        if (visited[`${lx}-${ly}`] || home[lx][ly] !== "!") continue;
        visited[`${lx}-${ly}`] = 1;
        queue.push([lx, ly]);
      }
    }
  }
  answer++;
}
console.log(answer);
