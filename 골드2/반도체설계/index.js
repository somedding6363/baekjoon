const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

// 증가하는 수열을 담은 배열
const d = [data[0]];
for (let i = 1; i < N; i++) {
  let s = 0; // 이분탐색을 위한 s
  let e = d.length - 1; // 이분탐색을 위한 e
  // 지금까지 d에 있는 것보다 크면
  if (d[e] < data[i]) {
    d.push(data[i]); // d에 삽입
  }
  // 지금까지 d에 있는 것보다 작으면
  // d에서 알맞은 곳에 교체
  else {
    while (s < e) {
      const m = Math.floor((s + e) / 2); // s와 e의 중간
      if (d[m] < data[i]) {
        s = m + 1;
      } else {
        e = m - 1;
      }
    }
    if (d[e] < data[i] || e === -1) {
      d[e + 1] = data[i];
    } else d[e] = data[i];
  }
}

console.log(d.length);
