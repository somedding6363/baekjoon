const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
let num = input[1];

let count = 0;
let stack = [];
for (let i = 0; i < N; i++) {
  while (stack.length && count < K && stack[stack.length - 1] < num[i]) {
    stack.pop();
    count++;
  }
  stack.push(num[i]);
}

console.log(stack.slice(0, N - K).join(""));
