const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const empty = [];
// c0, c1, c2, r0, r1, r2, d\, d/ 순서대로 합
const sumArr = new Array(8).fill(0);
// c0, c1, c2, r0, r1, r2, d\, d/ 순서대로 완전하게 계산 가능 여부
// 3이면 완전하게 계산 가능
const isFull = new Array(8).fill(0);
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const num = input[i][j];
    // 지워진 칸
    if (num === 0) {
      empty.push([i, j]);
    } else {
      sumArr[j] += num;
      isFull[j]++;
      sumArr[i + 3] += num;
      isFull[i + 3]++;
      if (i === j) {
        sumArr[6] += num;
        isFull[6]++;
      }
      if (i === 2 - j) {
        sumArr[7] += num;
        isFull[7]++;
      }
    }
  }
}

// 1) isFull에 true가 하나라도 있으면 빈칸 채우기
// 2) true가 하나도 없는 경우 => 대각선으로만 비어있을 때
// XOO   OOX
// OXO   OXO
// XOO , XOO
// 이 경우에는 직접 계산
let sum = 0;
for (let i = 0; i < 8; i++) {
  if (isFull[i] === 3) {
    sum = sumArr[i];
    break;
  }
}

// 1번 경우
if (sum) {
  for (let i = 0; i < empty.length; i++) {
    const [x, y] = empty[i];
    // 값 중 하나만 빈 줄(열, 행, 대각선)을 찾아서 빈칸 채우기
    if (isFull[y] === 2) input[x][y] = sum - sumArr[y];
    else if (isFull[x + 3] === 2) input[x][y] = sum - sumArr[x + 3];
    else if (x === y && isFull[6] === 2) input[x][y] = sum - sumArr[6];
    else if (x === 2 - y && isFull[7] === 2) input[x][y] = sum - sumArr[7];
  }
}
// 2번 경우
// 두 대각선 합 중 0이 아닌 것은 합이 0인 대각선의 양 끝 값과 같다.
// 결국
// a ㅁ ㅁ
// ㅁ b ㅁ
// ㅁ ㅁ c
// 하나의 대각선 a, b, c가 비어 있는 값이라면 a + c는 다른 대각선의 합과 같다.
// 그렇게 된다면 우측 상단의 값을 기준으로 (r1의 합 + a) = (c2의 합 + c)의 식으로 a, c 도출 가능
else {
  const [x, y] = empty[0];
  let a = 0,
    b = 0,
    c = 0;
  // 대각선 \
  if (x === y) {
    c = (sumArr[3] - sumArr[2] + sumArr[7]) / 2;
    a = sumArr[7] - c;
    b = a + sumArr[0] - sumArr[7];
    input[0][0] = a;
    input[1][1] = b;
    input[2][2] = c;
  }
  // 대각선 /
  else {
    c = (sumArr[3] - sumArr[0] + sumArr[6]) / 2;
    a = sumArr[6] - c;
    b = a + sumArr[2] - sumArr[6];
    input[0][2] = a;
    input[1][1] = b;
    input[2][0] = c;
  }
}

console.log(input.map((v) => v.join(" ")).join("\n"));
