const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [N] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const half = N / 2;
// i를 기준으로 i - 1의 올림 값
let prev = half;
let answer = 0;
for (let i = 1; i <= half; i++) {
  const t = half ** 2 - i ** 2;
  const y = Math.sqrt(t);
  const floorY = Math.floor(y);
  answer += prev - floorY;

  if (floorY * floorY === t) prev = floorY;
  else prev = floorY + 1;
}

console.log(4 * answer);
