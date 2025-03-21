const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], num] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

console.log(N, num);
const arr = new Array(2 * N).fill(null);
