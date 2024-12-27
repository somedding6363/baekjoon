const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, t] = input[0].split(" ").map(Number);
const info = new Array(n).fill(null);
const distance = new Array(n).fill(null);
for (let i = 0; i < n; i++) {
  info[i] = input[i + 1].split(" ").map(Number);
  distance[i] = input[i + n + 1].split(" ").map(Number);
}

console.log(info);
