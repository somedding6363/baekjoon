const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
let map = new Array(n);
let startN = n,
  startM = m,
  endN = 0,
  endM = 0;
for (let i = 1; i < input.length; i++) {
  map[i - 1] = input[i].split(" ").map(Number);
  if (map[i - 1].indexOf(1) > -1) {
    startN = Math.min(startN, i - 1);
    endN = Math.max(endN, i - 1);
    startM = Math.min(startM, map[i - 1].indexOf(1));
    endM = Math.max(endM, map[i - 1].lastIndexOf(1));
  }
}
const dn = [-1, 1, 0, 0];
const dm = [0, 0, 1, -1];

const checkOut = () => {
  const queue = [[0, 0]];
  const visited = new Array(n).fill(null).map((_) => new Array(m).fill(false));
  while (queue.length) {
    let now = queue.shift();
    for (let i = 0; i < 4; i++) {
      let ln = now[0] + dn[i];
      let lm = now[1] + dm[i];
      if (
        ln < 0 ||
        lm < 0 ||
        ln > n - 1 ||
        lm > m - 1 ||
        visited[ln][lm] ||
        map[ln][lm] === 1
      )
        continue;
      visited[ln][lm] = true;
      map[ln][lm] = 2;
      queue.push([ln, lm]);
    }
  }
};
let count = 0;
while (1) {
  checkOut();
  let updateMap = map.map((v) => [...v]);
  let _startN = n,
    _startM = m,
    _endN = 0,
    _endM = 0;

  for (let i = startN; i <= endN; i++) {
    for (let j = startM; j <= endM; j++) {
      if (map[i][j] === 1) {
        let zeroCount = 0;
        for (let k = 0; k < 4; k++) {
          if (map[i + dn[k]][j + dm[k]] === 2) zeroCount++;
        }
        if (zeroCount >= 2) {
          updateMap[i][j] = 2;
        }
      }
    }
    if (updateMap[i].indexOf(1) > -1) {
      _startN = Math.min(_startN, i);
      _endN = Math.max(_endN, i);
      _startM = Math.min(_startM, updateMap[i].indexOf(1));
      _endM = Math.max(_endM, updateMap[i].lastIndexOf(1));
    }
  }
  map = updateMap.map((v) => [...v]);
  startN = _startN;
  startM = _startM;
  endN = _endN;
  endM = _endM;
  count++;

  if (startN === n) break;
}

console.log(count);
