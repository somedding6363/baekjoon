const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const cntObj = {};
for (let i = 0; i < N; i++) {
  const [s, e] = data[i];
  cntObj[s] = (cntObj[s] || 0) + 1;
  cntObj[e] = (cntObj[e] || 0) - 1;
}

const cntArr = Object.values(cntObj);
const keyArr = Object.keys(cntObj);
let answer = 0;
let acc = 0;
let s = 0,
  e = 0;
let flag = false;
for (let i = 0; i < cntArr.length; i++) {
  acc += cntArr[i];
  if (acc > answer) {
    answer = acc;
    s = i;
    flag = true;
  } else if (acc < answer && flag) {
    e = i;
    flag = false;
  }
}

console.log(answer);
console.log(Number(keyArr[s]), Number(keyArr[e]));
