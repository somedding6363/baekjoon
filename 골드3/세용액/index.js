const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const numbers = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let answer = [];
let total = Infinity;

for (let i = 0; i < n - 2; i++) {
  for (let j = i + 1; j < n - 1; j++) {
    let sum = numbers[i] + numbers[j];
    let start = j + 1;
    let end = n - 1;
    let index = start + Math.floor((end - start) / 2);
    while (start <= end) {
      let middle = start + Math.floor((end - start) / 2);
      if (Math.abs(sum + numbers[middle]) < Math.abs(sum + numbers[index])) {
        index = middle;
      }
      if (sum + numbers[middle] > 0) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
    }
    sum += numbers[index];

    if (Math.abs(total) > Math.abs(sum)) {
      answer = [numbers[i], numbers[j], numbers[index]];
      total = sum;
    }
  }
}

console.log(answer.join(" "));
