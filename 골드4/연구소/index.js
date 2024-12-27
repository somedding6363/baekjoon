const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = new Array(n);
let safe = 0;
let answer = 0;
const virus = [];
for (let k = 1; k < input.length; k++) {
  board[k - 1] = input[k].split(" ").map(Number);
  board[k - 1].forEach((v, i) => {
    v === 0 && safe++;
    v === 2 && virus.push([k - 1, i]);
  });
}
safe -= 3;

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const bfs = (_board) => {
  const queue = virus.map((v) => [...v]);
  let nowSafe = safe;
  while (queue.length) {
    let [nowx, nowy] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const lx = nowx + dx[i];
      const ly = nowy + dy[i];
      if (lx < 0 || lx > n - 1 || ly < 0 || ly > m - 1) continue;
      if (_board[lx][ly] === 0) {
        _board[lx][ly] = 2;
        queue.push([lx, ly]);
        nowSafe--;
        if (nowSafe < answer) return nowSafe;
      }
    }
  }

  return nowSafe;
};

const spread = (wall) => {
  const _board = board.map((v) => [...v]);
  for (let i = 0; i < 3; i++) {
    _board[wall[i][0]][wall[i][1]] = 1;
  }

  let nowSafe = bfs(_board);
  answer = Math.max(answer, nowSafe);
};

const setWall = (row, col, num, wall) => {
  if (num === 1) {
    spread(wall);
  } else {
    for (let i = row; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (i === row && j <= col) continue;
        if (board[i][j] === 0) {
          setWall(i, j, num - 1, [...wall, [i, j]]);
        }
      }
    }
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === 0) {
      setWall(i, j, 3, [[i, j]]);
    }
  }
}

console.log(answer);
