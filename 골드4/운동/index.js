const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [v, e] = input[0].split(" ").map(Number);
const d = new Array(v).fill(null).map((_) => new Array(v).fill(Infinity));

for (let i = 0; i < e; i++) {
  const [from, to, dist] = input[i + 1].split(" ").map(Number);
  d[from - 1][to - 1] = dist;
}

for (let k = 0; k < v; k++) {
  for (let i = 0; i < v; i++) {
    for (let j = 0; j < v; j++) {
      d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
    }
  }
}

console.log(
  Math.min(...d.map((v, i) => v[i])) === Infinity
    ? -1
    : Math.min(...d.map((v, i) => v[i]))
);
