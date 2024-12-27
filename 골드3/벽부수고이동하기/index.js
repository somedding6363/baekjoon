const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const map = new Array(n).fill(null);
for (let i = 0; i < n; i++) {
  map[i] = input[i + 1].split("").map(Number);
}

let answer = [-1, -1];
let queue = [];
queue.push([0, 0, 0]);
let stack = [];
const countArr = new Array(n)
  .fill(null)
  .map((_) => new Array(m).fill(null).map((_) => new Array(2).fill(Infinity)));
countArr[0][0] = [1, 1];
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
while (queue.length) {
  stack = queue;
  queue = [];
  while (stack.length) {
    const [x, y, wall] = stack.pop();
    const count = countArr[x][y][wall];
    if (x === n - 1 && y === m - 1) {
      answer = countArr[x][y];
      break;
    }

    for (let i = 0; i < 4; i++) {
      const [lx, ly] = [x + dx[i], y + dy[i]];
      if (lx < 0 || lx > n - 1 || ly < 0 || ly > m - 1) continue;
      if (map[lx][ly] === 1) {
        if (wall) continue;
        else {
          if (countArr[lx][ly][1] > count + 1) {
            countArr[lx][ly][1] = count + 1;
            queue.push([lx, ly, 1]);
          }
        }
      } else {
        if (countArr[lx][ly][wall] > count + 1) {
          countArr[lx][ly][wall] = count + 1;
          queue.push([lx, ly, wall]);
        }
      }
    }
  }
}

console.log(Math.min(...answer));
