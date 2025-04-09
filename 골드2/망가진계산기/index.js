const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [D, P] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let answer = 0;
const max = 1 + "0".repeat(D) - 1; // 최대값
const visited = {}; // 메모이제이션
const recursion = (result, cnt) => {
  // 횟수 다 채우면 종료
  if (cnt === P) {
    answer = Math.max(answer, result);
    return;
  }

  if (visited[`${cnt}-${result}`]) return; // 이미 방문한 값이면 종료
  visited[`${cnt}-${result}`] = true;

  // 2~9사이 값을 곱하기
  for (let i = 2; i <= 9; i++) {
    if (result * i > max) return;
    recursion(result * i, cnt + 1);
  }
};

recursion(1, 0);
console.log(answer === 0 ? -1 : answer);
