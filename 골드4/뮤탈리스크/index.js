const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], arr] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

for (let i = N; i < 3; i++) {
  arr.push(0);
}

let queue = [[...arr, 0]];
dxy = [
  [9, 3, 1],
  [9, 1, 3],
  [3, 9, 1],
  [3, 1, 9],
  [1, 9, 3],
  [1, 3, 9],
];

const visited = new Array(61)
  .fill(null)
  .map((_) => new Array(61).fill(null).map((_) => new Array(61).fill(false)));
visited[arr[0]][arr[1]][arr[2]] = true;

while (queue.length) {
  let [v1, v2, v3, c] = queue.shift();
  for (let i = 0; i < 6; i++) {
    let _v1 = v1 - dxy[i][0];
    let _v2 = v2 - dxy[i][1];
    let _v3 = v3 - dxy[i][2];

    if (_v1 < 0) _v1 = 0;
    if (_v2 < 0) _v2 = 0;
    if (_v3 < 0) _v3 = 0;

    if (_v1 === 0 && _v2 === 0 && _v3 === 0) {
      console.log(c + 1);
      process.exit();
    }

    if (!visited[_v1][_v2][_v3]) {
      visited[_v1][_v2][_v3] = true;
      queue.push([_v1, _v2, _v3, c + 1]);
    }
  }
}
