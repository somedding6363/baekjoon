const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
let wallx = [];
let wally = [];
let minx = Infinity;
let maxy = 0;
for (let i = 0; i < 8; i++) {
  input[i].split("").forEach((val, idx) => {
    if (val === "#") {
      wallx.push(i);
      wally.push(idx);
      minx = Math.min(minx, i);
      maxy = Math.max(maxy, idx);
    }
  });
}

const dir = [
  [0, 0],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];
let queue = [[7, 0]];
while (queue.length) {
  let stack = queue;
  queue = [];
  while (stack.length) {
    const [x, y] = stack.pop();

    if (minx >= x || maxy <= y) {
      console.log(1);
      process.exit();
    }

    for (let i = 0; i < 9; i++) {
      const [lx, ly] = [x + dir[i][0], y + dir[i][1]];
      if (lx < 0 || lx >= 8 || ly < 0 || ly >= 8) continue;
      let isCant = wally.some((val, idx) => {
        if (val === ly) {
          if (lx === wallx[idx] + 1 || lx === wallx[idx]) {
            return true;
          }
        }
      });
      if (!isCant) queue.push([lx, ly]);
    }
  }

  wallx = wallx
    .map((v, i) => {
      if (v + 1 < 8) return v + 1;
      else {
        wally[i] = null;
        return null;
      }
    })
    .filter((v) => v !== null);
  wally = wally.filter((v) => v !== null);

  if (wallx.length > 0) {
    minx++;
    maxy = Math.max(...wally);
  } else {
    console.log(1);
    process.exit();
  }
}

console.log(0);
