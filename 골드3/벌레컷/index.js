const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N], [...arr]] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

let sum = 0;
arr = arr.map((v) => {
  sum += v;
  return sum;
});

let answer = 0;
// 머리 < 배, 가슴 > 배
for (let n = 2; n < N; n++) {
  let front = arr[n - 1];
  let stomach = sum - front;
  if (front < stomach) continue;
  // for (let i = 0; i < n; i++) {
  //   let head = arr[i];
  //   let chest = front - head;
  //   if (head < stomach && chest > stomach) {
  //     answer++;
  //   }
  // }

  let s = 0;
  let e = n - 1;
  while (s <= e) {
    let m = Math.floor((s + e) / 2);
    let head = arr[m];
    let chest = front - head;
    if (head < stomach && chest > stomach) {
      if (s === e) answer += s + 1;
      s = m + 1;
    } else {
      e = m - 1;
      if (s > e) answer += m;
    }
  }
}

console.log(answer);
