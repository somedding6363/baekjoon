const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N, Q], ...A] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const len = Math.pow(2, N);
const LArr = A.pop();

// 0,0 -> 0,1  0,1 -> 1,1  1,1 -> 1,0  1,0 -> 0,0
// 0,2 -> 0,3  0,3 -> 1,3  1,3 -> 1,2  1,2 -> 0,2
// ...
// 2,0 -> 2,1  2,1 -> 3,1  3,1 -> 3,0  3,0 -> 3,0
// ...
//
const rotate = (l) => {
  if (l === 0) return;
  const num = Math.pow(2, N - l);
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let _i = Math.pow(2, l) * i;
      let _j = Math.pow(2, l) * j;
      let diff = Math.pow(2, l - 1);
      for (let r = 0; r < diff; r++) {
        for (let c = 0; c < diff; c++) {
          [A[_i + r][_j + c], A[_i + r][_j + diff + c]] = [
            A[_i + r][_j + diff + c],
            A[_i + r][_j + c],
          ];
          [A[_i + r][_j + c], A[_i + diff + r][_j + c]] = [
            A[_i + diff + r][_j + c],
            A[_i + r][_j + c],
          ];
          [A[_i + diff + r][_j + c], A[_i + diff + r][_j + diff + c]] = [
            A[_i + diff + r][_j + diff + c],
            A[_i + diff + r][_j + c],
          ];
        }
      }
    }
  }
};

const dxy = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let remain = 0;
const melt = () => {
  remain = 0;
  const _A = new Array(len).fill(null).map((_) => new Array(len).fill(0));
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (A[i][j] === 0) continue;
      let cnt = 0;
      for (let k = 0; k < 4; k++) {
        const li = i + dxy[k][0];
        const lj = j + dxy[k][1];
        if (li < 0 || lj < 0 || li >= len || lj >= len) continue;
        if (A[li][lj] > 0) cnt++;
      }

      if (cnt < 3) _A[i][j] = A[i][j] - 1;
      else _A[i][j] = A[i][j];

      if (_A[i][j] > 0) remain += _A[i][j];
    }
  }
  A = _A;
};

let max = 0;
const find = () => {
  let visited = new Array(len)
    .fill(null)
    .map((_) => new Array(len).fill(false));
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (A[i][j] === 0) continue;
      if (visited[i][j]) continue;
      visited[i][j] = true;
      let cnt = 0;
      let queue = [[i, j]];
      while (queue.length) {
        cnt++;
        const [x, y] = queue.shift();
        for (let k = 0; k < 4; k++) {
          const [lx, ly] = [x + dxy[k][0], y + dxy[k][1]];
          if (lx < 0 || ly < 0 || lx >= len || ly >= len || visited[lx][ly])
            continue;
          if (A[lx][ly] > 0) {
            visited[lx][ly] = true;
            queue.push([lx, ly]);
          }
        }
      }
      max = Math.max(cnt, max);
    }
  }
};

for (let i = 0; i < Q; i++) {
  let num = LArr[i];
  for (let j = 1; j <= num; j++) {
    rotate(j);
  }
  melt();
}
find();

console.log(remain);
console.log(max);
