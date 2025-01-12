const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let min = 0;
for (let i = 0; i < n; i++) {
  if (min + 1 < arr[i]) {
    break;
  }
  min += arr[i];
}

console.log(min + 1);
