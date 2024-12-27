const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const k = Number(input[0]);
const [w, h] = input[1].split(" ").map(Number);
if (w === 1 && h === 1) {
  console.log(0);
  process.exit();
}
const map = new Array(h).fill(null);
for (let i = 0; i < h; i++) {
  map[i] = input[2 + i].split(" ").map(Number);
}

const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
];

let answer = -1;
const visited = new Array(h)
  .fill(null)
  .map((_) => new Array(w).fill(null).map((_) => new Array(k + 1).fill(0)));

let queue = [[0, 0, 0]];
visited[0][0][0] = 0;
while (queue.length) {
  const [x, y, kcount] = queue.shift();
  for (let i = 0; i < 12; i++) {
    if (i >= 4 && kcount === k) continue;

    const [lx, ly] = [x + dir[i][0], y + dir[i][1]];
    if (lx < 0 || lx >= h || ly < 0 || ly >= w || map[lx][ly]) continue;

    if (i < 4) {
      if (visited[lx][ly][kcount]) continue;
      queue.push([lx, ly, kcount]);
      visited[lx][ly][kcount] = visited[x][y][kcount] + 1;
    } else {
      if (visited[lx][ly][kcount + 1]) continue;
      queue.push([lx, ly, kcount + 1]);
      visited[lx][ly][kcount + 1] = visited[x][y][kcount] + 1;
    }

    if (lx === h - 1 && ly === w - 1) {
      console.log(visited[lx][ly][kcount + 1] || visited[lx][ly][kcount]);
      process.exit();
    }
  }
}

console.log(answer);
