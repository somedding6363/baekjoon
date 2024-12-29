// const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const input = require("fs").readFileSync(file).toString().trim().split(" ");

// const [r1, c1, r2, c2] = input.map(Number);

// const answer = new Array(r2 - r1 + 1)
//   .fill(null)
//   .map(() => new Array(c2 - c1 + 1).fill(0));

// let num = 1;
// let x = 0;
// let y = 0;
// let fill = 0;
// const dx = [0, -1, 0, 1];
// const dy = [1, 0, -1, 0];
// let dirIndex = 0;
// let count = 1;
// let maxCount = 1;
// let repeat = 0;
// while (fill < (r2 - r1 + 1) * (c2 - c1 + 1)) {
//   if (x >= r1 && x <= r2 && y >= c1 && y <= c2) {
//     answer[x - r1][y - c1] = num;
//     fill++;
//   }

//   x += dx[dirIndex];
//   y += dy[dirIndex];
//   count++;
//   num++;
//   if (maxCount < count) {
//     count = 1;
//     dirIndex = (dirIndex + 1) % 4;
//     repeat++;
//     if (repeat % 2 === 0) {
//       maxCount++;
//     }
//   }
// }

// let maxLen = String(num);

// for (let i = 0; i < answer.length; i++) {
//   answer[i] = answer[i]
//     .map((v) => String(v).padStart(maxLen.length, " "))
//     .join(" ");
//   console.log(answer[i]);
// }

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [r1, c1, r2, c2] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const answer = new Array(r2 - r1 + 1)
  .fill(null)
  .map((_) => new Array(c2 - c1 + 1).fill(0));
let cnt = (r2 - r1 + 1) * (c2 - c1 + 1);
const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];
let dirIdx = 0;
let dirCnt = 1;
let repeatCnt = 0;
let num = 1;
let [x, y] = [0, 0];
while (cnt > 0) {
  if (x >= r1 && x <= r2 && y >= c1 && y <= c2) {
    answer[x - r1][y - c1] = num;
    cnt--;
  }
  num++;
  x += dx[dirIdx];
  y += dy[dirIdx];
  repeatCnt++;
  if (repeatCnt === dirCnt) {
    repeatCnt = 0;
    dirIdx = (dirIdx + 1) % 4;
    if (dirIdx % 2 === 0) {
      dirCnt++;
    }
  }
}

let digit = String(num).length;
for (let i = 0; i < r2 - r1 + 1; i++) {
  let str = "";
  for (let j = 0; j < c2 - c1 + 1; j++) {
    str += String(answer[i][j]).padStart(digit, " ");
    if (j < c2 - c1) {
      str += " ";
    }
  }
  console.log(str);
}
