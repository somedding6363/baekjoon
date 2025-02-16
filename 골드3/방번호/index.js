const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], P, [M]] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

let minPrice = Math.min(...P);
let index = P.lastIndexOf(minPrice);
let _minPrice = Math.min(...P.slice(1));
let _index = P.slice(1).lastIndexOf(_minPrice) + 1;
let cnt = Math.floor(M / minPrice);
let answer = new Array(cnt).fill(index);
let rest = M % minPrice;

if (answer[0] === 0) {
  answer[0] = _index;
  rest -= _minPrice - minPrice;
}

if (rest < 0) console.log("0");
else {
  for (let i = 0; i < cnt; i++) {
    if (!rest) break;

    for (let j = N - 1; j > index; j--) {
      if (P[j] - P[answer[i]] <= rest) {
        rest -= P[j] - P[answer[i]];
        answer[i] = j;
        break;
      }
    }
  }

  console.log(answer.join(""));
}
