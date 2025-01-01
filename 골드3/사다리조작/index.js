const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m, h] = input[0].split(" ").map(Number);
let answer = Infinity;
const ladder = new Array(h)
  .fill(null)
  .map((_) => new Array(n).fill(null).map((_, i) => i));

for (let i = 0; i < m; i++) {
  const [a, b] = input[i + 1].split(" ").map(Number);
  ladder[a - 1][b - 1] = b;
  ladder[a - 1][b] = b - 1;
}
let possible = [];
for (let i = 0; i < h; i++) {
  for (let j = 0; j < n - 1; j++) {
    if (ladder[i][j] === j && ladder[i][j + 1] === j + 1) {
      possible.push([i, j]);
    }
  }
}

const go = () => {
  for (let i = 0; i < n; i++) {
    let now = i;
    for (let j = 0; j < h; j++) {
      now = ladder[j][now];
    }
    if (now !== i) {
      return false;
    }
  }
  return true;
};

const dfs = (indexs) => {
  if (indexs.length >= 3) return;
  for (let i = indexs[indexs.length - 1] + 1; i < possible.length; i++) {
    const [x, y] = possible[i];
    if (ladder[x][y] !== y || ladder[x][y + 1] !== y + 1) continue;
    ladder[x][y] = y + 1;
    ladder[x][y + 1] = y;
    if (go()) {
      answer = Math.min(indexs.length + 1, answer);
    }
    dfs([...indexs, i]);
    ladder[x][y] = y;
    ladder[x][y + 1] = y + 1;
  }
};

if (go()) {
  answer = 0;
} else {
  for (let i = 0; i < possible.length; i++) {
    const [x, y] = possible[i];
    ladder[x][y] = y + 1;
    ladder[x][y + 1] = y;
    if (go()) {
      answer = 1;
      break;
    }
    dfs([i]);
    ladder[x][y] = y;
    ladder[x][y + 1] = y + 1;
  }
}

console.log(answer === Infinity ? -1 : answer);
