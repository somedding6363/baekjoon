// const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const input = require("fs").readFileSync(file).toString().trim().split("\n");

// const [n, m] = input[0].split(" ").map(Number);
// const compare = new Array(n).fill(null).map((_) => new Array(n).fill(0));

// for (let i = 1; i < input.length; i++) {
//   const pair = input[i].split(" ").map(Number);
//   compare[pair[0] - 1][pair[1] - 1] = 1;
// }

// for (let k = 0; k < n; k++) {
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < n; j++) {
//       if (compare[i][k] && compare[k][j]) {
//         compare[i][j] = 1;
//       }
//     }
//   }
// }

// let answer = 0;
// let half = n / 2;
// for (let i = 0; i < n; i++) {
//   if (compare[i].filter((v, j) => v === 1 && j !== i).length > half) answer++;
// }
// for (let i = 0; i < n; i++) {
//   let cnt = 0;
//   for (let j = 0; j < n; j++) {
//     if (i === j) continue;
//     if (compare[j][i] === 1) {
//       cnt++;
//     }
//   }
//   if (cnt > half) answer++;
// }

// console.log(answer);

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M], ...compare] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const middle = (N - 1) / 2;
const arr = new Array(N + 1).fill(null).map((_) => new Array(N + 1).fill(0));
for (let i = 0; i < M; i++) {
  const [h, l] = compare[i];
  arr[h][l] = 1; // h가 l보다 무겁다.
}
for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (!arr[i][j]) arr[i][j] = arr[i][k] && arr[k][j]; // i가 j보다 무겁다 = i가 k보다 무겁고, k가 j보다 무겁다.
    }
  }
}
let answer = 0;
for (let i = 1; i <= N; i++) {
  let cntCol = 0;
  let cntRow = 0;
  for (let j = 1; j <= N; j++) {
    if (arr[i][j] === 1) cntCol++;
    if (arr[j][i] === 1) cntRow++;
  }
  if (cntCol > middle) answer++;
  if (cntRow > middle) answer++;
}

console.log(answer);
