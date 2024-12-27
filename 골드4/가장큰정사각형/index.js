const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = [];
for (let i = 1; i < input.length; i++) {
  board.push(input[i].split("").map(Number));
}

let max = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (i === 0 || j === 0) {
      if (board[i][j] > max) max = board[i][j];
    } else if (board[i][j] > 0) {
      board[i][j] =
        Math.min(board[i - 1][j - 1], board[i - 1][j], board[i][j - 1]) + 1;
      if (board[i][j] > max) max = board[i][j];
    }
  }
}

console.log(max * max);
