const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let input = require("fs").readFileSync(file).toString().trim().split("\n");

const N = Number(input[0]);
const ball = new Array(N);
for (let i = 0; i < N; i++) {
  ball[i] = input[i + 1].split(" ").map(Number);
  ball[i].push(i);
}

ball.sort((a, b) => a[1] - b[1]);
const answer = new Array(N);
let max = 0;
let cnt = 0;
let _cnt = 0;
let color = new Array(N + 1).fill(0);
let _color = {};
for (let i = 0; i < N; i++) {
  const [C, S, idx] = ball[i];
  if (max !== S) {
    for (let c in _color) {
      color[c] += _color[c];
    }
    _color = {};
    max = S;
    cnt += _cnt;
    _cnt = 0;
  }
  answer[idx] = cnt - color[C];
  _color[C] = (_color[C] || 0) + S;
  _cnt += S;
}

for (let i = 0; i < N; i++) {
  console.log(answer[i]);
}
