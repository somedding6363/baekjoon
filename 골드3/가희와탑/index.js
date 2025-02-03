const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [N, a, b] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

if (N < a + b - 1) {
  console.log(-1);
} else {
  a--;
  b--;
  if (a === 0 && b === 0) {
    console.log(new Array(N).fill(1).join(" "));
  } else {
    const front = [];
    const back = [];

    for (let i = 1; i <= Math.max(a, b); i++) {
      if (i <= a) {
        front.push(i);
      }
      if (b - i + 1 > 0) {
        back.push(b - i + 1);
      }
    }

    const answer = [];
    const frontStr = front.join(" ");
    const backStr = back.join(" ");
    const one = new Array(N - a - b - 1).fill(1).join(" ");

    if (!front.length) {
      answer.push(b + 1);
    }
    if (one.length) {
      answer.push(one);
    }
    if (front.length) {
      answer.push(frontStr);
      answer.push(Math.max(a, b) + 1);
    }
    if (back.length) {
      answer.push(backStr);
    }
    console.log(answer.join(" "));
  }
}
