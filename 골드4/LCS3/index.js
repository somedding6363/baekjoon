// dp
// 입력값 저장 s1, s2, s3
const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [s1, s2, s3] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n");

// lcs 값을 담을 3차원 배열 선언
const arr = new Array(s1.length)
  .fill(null)
  .map((_) =>
    new Array(s2.length).fill(null).map((_) => new Array(s3.length).fill(0))
  );

// 최대값
let max = 0;
for (let i = 0; i < s1.length; i++) {
  for (let j = 0; j < s2.length; j++) {
    for (let k = 0; k < s3.length; k++) {
      // 3값이 다 같은 경우에 arr[i-1][j-1][k-1]에 1 더한 값 저장
      if (s1[i] === s2[j] && s2[j] === s3[k]) {
        if (i === 0 || j === 0 || k === 0) arr[i][j][k] = 1;
        else arr[i][j][k] = arr[i - 1][j - 1][k - 1] + 1;

        max = Math.max(max, arr[i][j][k]);
      }
      // 1, 2개의 값이 같은 경우에는 arr[i-1][j-1][k-1]을 제외한 나머지 아래쪽 6방향 중 최대값으로 저장
      else {
        arr[i][j][k] = Math.max(
          i >= 1 && arr[i - 1][j][k],
          j >= 1 && arr[i][j - 1][k],
          k >= 1 && arr[i][j][k - 1]
        );
      }
    }
  }
}

console.log(max);
