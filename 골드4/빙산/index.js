const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
let map = new Array(n);
const ice = [];
for (let i = 0; i < n; i++) {
  map[i] = input[i + 1].split(" ").map((val, idx) => {
    if (Number(val) !== 0) ice.push([i, idx]);
    return Number(val);
  });
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
let answer = 0;
while (1) {
  const _map = new Array(n).fill(null).map((_) => new Array(m).fill(0));
  for (let i = ice.length - 1; i >= 0; i--) {
    const [x, y] = ice[i];
    let num = 0;
    for (let j = 0; j < 4; j++) {
      const [lx, ly] = [x + dx[j], y + dy[j]];
      if (lx < 0 || lx > n - 1 || ly < 0 || ly > m - 1) continue;
      if (map[lx][ly] === 0) num++;
    }

    if (map[x][y] > 0) {
      _map[x][y] = map[x][y] - num;
      if (_map[x][y] <= 0) {
        _map[x][y] = 0;
        ice.splice(i, 1);
      }
    }
  }

  map = _map;

  if (ice.length === 0) {
    answer = 0;
    break;
  }

  let count = 0;
  let queue = [ice[0]];
  const visited = new Array(n).fill(null).map((_) => new Array(m).fill(false));
  visited[ice[0][0]][ice[0][1]] = true;
  while (queue.length) {
    const now = queue.shift();
    count++;
    for (let i = 0; i < 4; i++) {
      const [nlx, nly] = [now[0] + dx[i], now[1] + dy[i]];
      if (nlx < 0 || nlx > n - 1 || nly < 0 || nly > m - 1 || visited[nlx][nly])
        continue;
      if (map[nlx][nly] > 0) {
        visited[nlx][nly] = true;
        queue.push([nlx, nly]);
      }
    }
  }
  answer++;
  if (count !== ice.length) break;
}

console.log(answer);
