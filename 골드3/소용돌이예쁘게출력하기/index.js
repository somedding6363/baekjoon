const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split(" ");

const [r1, c1, r2, c2] = input.map(Number);

const answer = new Array(r2 - r1 + 1)
  .fill(null)
  .map(() => new Array(c2 - c1 + 1).fill(0));

let num = 1;
let x = 0;
let y = 0;
let fill = 0;
const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];
let dirIndex = 0;
let count = 1;
let maxCount = 1;
let repeat = 0;
while (fill < (r2 - r1 + 1) * (c2 - c1 + 1)) {
  if (x >= r1 && x <= r2 && y >= c1 && y <= c2) {
    answer[x - r1][y - c1] = num;
    fill++;
  }

  x += dx[dirIndex];
  y += dy[dirIndex];
  count++;
  num++;
  if (maxCount < count) {
    count = 1;
    dirIndex = (dirIndex + 1) % 4;
    repeat++;
    if (repeat % 2 === 0) {
      maxCount++;
    }
  }
}

let maxLen = String(num);

for (let i = 0; i < answer.length; i++) {
  answer[i] = answer[i]
    .map((v) => String(v).padStart(maxLen.length, " "))
    .join(" ");
  console.log(answer[i]);
}
