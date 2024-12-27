const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const map = new Array(n).fill(null);
const land = [];
for (let i = 0; i < n; i++) {
  map[i] = input[i + 1].split(" ").map((val, idx) => {
    if (Number(val) === 1) land.push([i, idx]);
    return Number(val);
  });
}

const landBorder = [];
const visited = new Array(n).fill(null).map((_) => new Array(n).fill(false));
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
for (let i = 0; i < land.length; i++) {
  const [x, y] = land[i];
  if (!visited[x][y]) {
    if (map[x][y] === 1) {
      const queue = [[x, y]];
      const border = [];
      visited[x][y] = true;
      while (queue.length) {
        const [startX, startY] = queue.shift();
        let isEnd = false;
        for (let j = 0; j < 4; j++) {
          const [lx, ly] = [startX + dx[j], startY + dy[j]];
          if (lx < 0 || lx >= n || ly < 0 || ly >= n || visited[lx][ly])
            continue;
          if (map[lx][ly] === 0) {
            isEnd = true;
            continue;
          }
          queue.push([lx, ly]);
          visited[lx][ly] = true;
        }
        if (isEnd) border.push([startX, startY]);
      }
      landBorder.push(border);
    }
  }
}

let min = Infinity;
for (let i = 0; i < landBorder.length; i++) {
  for (let j = i + 1; j < landBorder.length; j++) {
    for (let k = 0; k < landBorder[i].length; k++) {
      for (let l = 0; l < landBorder[j].length; l++) {
        min = Math.min(
          min,
          Math.abs(landBorder[i][k][0] - landBorder[j][l][0]) +
            Math.abs(landBorder[i][k][1] - landBorder[j][l][1]) -
            1
        );
      }
    }
  }
}

console.log(min);
