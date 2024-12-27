const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const board = new Array(n);
for (let i = 0; i < n; i++) {
  board[i] = input[i + 1].split(" ").map(Number);
}

const upDp = new Array(n).fill(null).map((_) => new Array(m).fill(-Infinity));
const downDp = new Array(n).fill(null).map((_) => new Array(m).fill(-Infinity));
const dx = [0, 1, 0];
const dy = [-1, 0, 1];
for (let i = n - 1; i >= 0; i--) {
  for (let j = 0; j < m; j++) {
    for (let k = 0; k < 2; k++) {
      const [lx, ly] = [i + dx[k], j + dy[k]];
      if (lx > n - 1 || ly < 0) continue;

      upDp[i][j] = Math.max(upDp[i][j], upDp[lx][ly] + board[i][j]);
    }
    if (upDp[i][j] === -Infinity) upDp[i][j] = board[i][j];
  }
}

for (let i = n - 1; i >= 0; i--) {
  for (let j = m - 1; j >= 0; j--) {
    for (let k = 1; k < 3; k++) {
      const [lx, ly] = [i + dx[k], j + dy[k]];
      if (lx > n - 1 || ly > m - 1) continue;

      downDp[i][j] = Math.max(downDp[i][j], downDp[lx][ly] + board[i][j]);
    }
    if (downDp[i][j] === -Infinity) downDp[i][j] = board[i][j];
  }
}

let answer = -Infinity;
upDp.map((v, i) =>
  v.map((v2, i2) => (answer = Math.max(v2 + downDp[i][i2], answer)))
);
console.log(answer);
