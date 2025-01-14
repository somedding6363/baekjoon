const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const line = Number(input[0]);
const prev = input[1].split(" ").map(Number);
const next = input[2].split(" ").map(Number);
const diff = prev.map((v, i) => next[i] - v);
let s = 0;
let e = 0;
let answer = 0;
while (s < line) {
  const now = diff[s];
  let min = Math.abs(now);
  if (now === 0) {
    s++;
  } else {
    while (now * diff[e] > 0 && e < line) {
      e++;
    }
    for (let i = s; i < e; i++) {
      min = Math.min(min, Math.abs(diff[i]));
    }
    for (let i = s; i < e; i++) {
      now < 0 ? (diff[i] += min) : (diff[i] -= min);
    }
    answer += min;
  }
  e = s;
}

console.log(answer);
