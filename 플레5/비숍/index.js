const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], ...board] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const whitePossible = [];
const blackPossible = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 1) {
      (i + j) % 2 ? blackPossible.push([i, j]) : whitePossible.push([i, j]);
    }
  }
}
const dxy = [
  [1, -1],
  [1, 1],
];
const visited = new Array(N).fill(null).map((_) => new Array(N).fill(false));
const check = (possible) => {
  let answer = 0;

  const dfs = (idx, cnt) => {
    if (idx === possible.length) {
      answer = Math.max(answer, cnt);
      return;
    }
    const [x, y] = possible[idx];
    if (visited[x][y]) {
      dfs(idx + 1, cnt);
    } else {
      const arr = [];
      for (let i = 0; i < 2; i++) {
        for (let j = 1; j <= N; j++) {
          const [lx, ly] = [x + dxy[i][0] * j, y + dxy[i][1] * j];
          if (lx < 0 || lx >= N || ly < 0 || ly >= N) break;
          if (!visited[lx][ly]) {
            arr.push([lx, ly]);
          }
        }
      }
      visited[x][y] = true;
      for (let i = 0; i < arr.length; i++) {
        visited[arr[i][0]][arr[i][1]] = true;
      }
      for (let i = idx + 1; i <= possible.length; i++) {
        if (i === possible.length || !visited[possible[i][0]][possible[i][1]]) {
          dfs(i, cnt + 1);
        }
      }
      visited[x][y] = false;
      for (let i = 0; i < arr.length; i++) {
        visited[arr[i][0]][arr[i][1]] = false;
      }
    }
  };
  for (let i = 0; i < possible.length; i++) {
    dfs(i, 0);
  }
  return answer;
};

const blackAnswer = check(blackPossible);
const whiteAnswer = check(whitePossible);

console.log(blackAnswer + whiteAnswer);
