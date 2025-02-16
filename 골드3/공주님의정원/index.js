const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], ...flowers] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

flowers.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

let answer = 0;
let now = [3, 1];
let end = [0, 0];
let possible = false;
for (let i = 0; i < N; i++) {
  const [m1, d1, m2, d2] = flowers[i];
  if (m1 > now[0] || (m1 === now[0] && d1 > now[1])) {
    // now 교체
    answer++;
    now[0] = end[0];
    now[1] = end[1];

    if (end[0] > 11) {
      possible = true;
      break;
    }
  }

  if (m1 < now[0] || (m1 === now[0] && d1 <= now[1])) {
    if (m2 > end[0] || (m2 === end[0] && d2 > end[1])) {
      end = [m2, d2];
    }
  }
  if (end[0] > 11) {
    answer++;
    possible = true;
    break;
  }
}

console.log(possible ? answer : 0);
