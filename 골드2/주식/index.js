const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[T], ...testcase] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const answer = [];
for (let i = 0; i < T * 2; i++) {
  const [N, K] = testcase[i];
  i++;
  const A = [...testcase[i]];
  answer.push("Case #" + (i + 1) / 2);
  const D = [A[0]];
  for (let i = 1; i < N; i++) {
    let s = 0; // 이분탐색 시작
    let e = D.length - 1; // 이분탐색 끝
    if (D[e] < A[i]) {
      D.push(A[i]);
    } else {
      // D배열에서 들어갈 수 있는 자리 이분탐색으로 찾기
      while (s < e) {
        let m = Math.floor((s + e) / 2);
        if (D[m] === A[i]) {
          // 같으면 종료
          s = m;
          e = m;
          break;
        } else if (D[m] < A[i]) {
          s = m + 1;
        } else {
          e = m - 1;
        }
      }

      if (e === -1 || D[e] < A[i]) {
        D[e + 1] = A[i];
      } else D[e] = A[i];
    }
  }
  answer.push(D.length >= K ? 1 : 0);
}

console.log(answer.join("\n"));
