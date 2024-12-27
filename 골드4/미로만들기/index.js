const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const maze = new Array(n);
const visited = new Array(n).fill(null).map((_) => new Array(n).fill(false));
const black = new Array(n).fill(null).map((_) => new Array(n).fill(0));
for (let i = 0; i < n; i++) {
  maze[i] = input[i + 1].split("").map(Number);
}

const queue = [];
queue.push([0, 0]);
visited[0][0] = true;
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
while (queue.length) {
  const [x, y] = queue.shift();
  for (let i = 0; i < 4; i++) {
    const [lx, ly] = [x + dx[i], y + dy[i]];
    if (lx < 0 || lx > n - 1 || ly < 0 || ly > n - 1) continue;
    if (visited[lx][ly]) {
      if (black[x][y] + (1 - maze[lx][ly]) >= black[lx][ly]) continue;
    }

    visited[lx][ly] = true;
    black[lx][ly] = black[x][y] + (1 - maze[lx][ly]);
    queue.push([lx, ly]);
  }
}

console.log(black[n - 1][n - 1]);
