const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
let city = [];
for (let i = 0; i < n; i++) {
  city.push(input[i + 1].split(""));
}

let answer = 0;
const dir = [
  [-1, 1],
  [0, 1],
  [1, 1],
];
const dfs = (r, c) => {
  if (c === m - 1) {
    answer++;
    return true;
  }

  for (let i = 0; i < 3; i++) {
    const [lr, lc] = [r + dir[i][0], c + dir[i][1]];
    if (lr < 0 || lr >= n) continue;
    if (city[lr][lc] === ".") {
      city[lr][lc] = "x";
      if (dfs(lr, lc)) {
        return true;
      }
    }
  }

  return false;
};

for (let i = 0; i < n; i++) {
  dfs(i, 0);
}

console.log(answer);
