const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const str = require("fs").readFileSync(file).toString().trim();

const obj = {}; // 알파벳 순서대로 인덱스 저장하는 객체
const arr = str.split("").sort();

for (let i = 0; i < arr.length; i++) {
  if (!obj[arr[i]]) obj[arr[i]] = [];
}
for (let i = 0; i < str.length; i++) {
  obj[str[i]].push(i);
}
console.log(obj);

let cursor = 0;
let answer = 0;
for (let key in obj) {
  const target = obj[key]; // 현재 출력해야 할 인덱스
  const [s, e] = [target[0], target[target.length - 1]];
  const front = Math.abs(cursor - s);
  const back = Math.abs(cursor - e);
  if (front <= back) {
    answer += front + e - s + target.length;
    cursor = e;
  } else {
    answer += back + e - s + target.length;
    cursor = s;
  }

  console.log(cursor);
  console.log(answer);
  console.log("..");
}

console.log(answer);
