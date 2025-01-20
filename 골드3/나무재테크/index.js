const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m, k] = input[0].split(" ").map(Number);
const A = new Array(n);
for (let i = 0; i < n; i++) {
  A[i] = input[i + 1].split(" ").map(Number);
}
let a = new Array(n).fill(null).map((_) => new Array(n).fill(5));
const tree = new Array(n)
  .fill(null)
  .map((_) => new Array(n).fill(null).map((_) => new Array(0)));
for (let i = 0; i < m; i++) {
  const [x, y, z] = input[i + n + 1].split(" ").map(Number);
  tree[x - 1][y - 1].push(z);
}

const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
for (let y = 0; y < k; y++) {
  let canSpread = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (tree[i][j].length) {
        let tArr = tree[i][j];
        let _a = a[i][j];
        tArr.sort((a, b) => a - b);
        let isDie = false;
        let _tArr = [];
        for (let t = 0; t < tArr.length; t++) {
          if (tArr[t] > _a) {
            isDie = true;
          }
          if (isDie) {
            _a += Math.floor(tArr[t] / 2);
          } else {
            _a -= tArr[t];
            _tArr.push(tArr[t] + 1);
            if ((tArr[t] + 1) % 5 === 0) {
              canSpread.push([i, j]);
            }
          }
        }
        tree[i][j] = _tArr;
        a[i][j] = _a;
      }
    }
  }

  for (let i = 0; i < canSpread.length; i++) {
    const [x, y] = canSpread[i];
    for (let j = 0; j < 8; j++) {
      const [lx, ly] = [x + dx[j], y + dy[j]];
      if (lx < 0 || ly < 0 || lx >= n || ly >= n) continue;
      tree[lx][ly].push(1);
    }
  }

  a = a.map((v, i) => v.map((v2, i2) => v2 + A[i][i2]));
}

let answer = 0;
tree.forEach((v) => v.forEach((v2) => (answer += v2.length)));
console.log(answer);
