const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

let [r, c] = input[0].split(" ").map(Number);
let board = new Array(r);
for (let i = 1; i < input.length; i++) {
  board[i - 1] = input[i].split("");
}

let max = 0;
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const visited = new Array(26).fill(false);
let first = board[0][0];
visited[first.charCodeAt() - 65] = true;

const dfs = (x, y, dist) => {
  max = max > dist ? max : dist;
  for (let i = 0; i < 4; i++) {
    if (x + dx[i] >= 0 && y + dy[i] >= 0 && x + dx[i] < r && y + dy[i] < c) {
      const letter = board[x + dx[i]][y + dy[i]];
      if (!visited[letter.charCodeAt() - 65]) {
        visited[letter.charCodeAt() - 65] = true;
        dfs(x + dx[i], y + dy[i], dist + 1);
        visited[letter.charCodeAt() - 65] = false;
      }
    }
  }
};

dfs(0, 0, 1);

console.log(max);
