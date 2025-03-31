const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const str = require("fs").readFileSync(file).toString().trim();
const AArr = [];
const BArr = [];
const CArr = [];
for (let i = str.length - 1; i >= 0; i--) {
  if (str[i] === "A") AArr.push(i);
  else if (str[i] === "B") BArr.push(i);
  else if (str[i] === "C") CArr.push(i);
}

let answer = 0;
// C로 그리디
// for (let i = CArr.length - 1; i >= 0; i--) {
//   const now = CArr[i];
//   const prev = i > 0 ? CArr[i - 1] : -1;
//   // now보다 작으면서 prev보다 큰 B 중 가장 앞에 있는 것
//   let s = 0,
//     e = BArr.length - 1;
//   while (s > e) {
//     const m = Math.floor((s + e) / 2);
//     if (BArr[m] < prev) s = m + 1;
//     else e = m - 1;
//   }
//   BArr.splice(s, 1);
//   answer++;
// }
for (let i = CArr.length - 1; i >= 0; i--) {
  const now = CArr[i];
  if (BArr.length === 0) break;
  if (BArr[BArr.length - 1] > now) continue;
  BArr.pop();
  answer++;
}

// 그 다음 B로 그리디
for (let i = BArr.length - 1; i >= 0; i--) {
  const now = BArr[i];
  if (AArr.length === 0) break;
  if (AArr[AArr.length - 1] > now) continue;
  AArr.pop();
  answer++;
}

console.log(answer);
