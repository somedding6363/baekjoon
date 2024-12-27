const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, k] = [Number(input[0]), Number(input[1])];
const board = new Array(n).fill(null).map((_) => new Array(n).fill(0));
board[0][0] = 1;
for (let i = 0; i < k; i++) {
  const apple = input[2 + i].split(" ").map(Number);
  board[apple[0] - 1][apple[1] - 1] = 2;
}
const m = Number(input[k + 2]);
const move = [];
let lastSec = 0;
for (let i = 0; i < m; i++) {
  const [sec, dir] = input[k + 2 + i + 1].split(" ");
  move.push([Number(sec) - lastSec, dir]);
  lastSec = Number(sec);
}

const snake = [[0, 0]];
const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];
let nowDir = 0;
let result = 0;
let end = false;
while (!end) {
  const [dur, nextDir] = move.shift();
  for (let i = 0; i < dur; i++) {
    const nextHead = [snake[0][0] + dx[nowDir], snake[0][1] + dy[nowDir]];
    if (
      nextHead[0] < 0 ||
      nextHead[0] > n - 1 ||
      nextHead[1] < 0 ||
      nextHead[1] > n - 1 ||
      board[nextHead[0]][nextHead[1]] === 1
    ) {
      end = true;
      break;
    } else {
      snake.unshift(nextHead);
      if (board[nextHead[0]][nextHead[1]] !== 2) {
        const out = snake.pop();
        board[out[0]][out[1]] = 0;
      }
      board[nextHead[0]][nextHead[1]] = 1;
    }
    result++;
  }
  if (!end) {
    if (nextDir === "L") nowDir = (nowDir + 1) % 4;
    else nowDir = (nowDir + 3) % 4;

    if (move.length === 0) move.push([Infinity, null]);
  }
}

if (!end) {
  if (nowDir === 0) result += n - 1 - snake[0][1];
  else if (nowDir === 1) result += snake[0][0];
  else if (nowDir === 2) result += snake[0][1];
  else result += n - 1 - snake[0][0];
}
console.log(result + 1);
