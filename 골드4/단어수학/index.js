const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");

const n = Number(input[0]);
const str = new Array(n); // 문자열 역순으로 저장. 인덱스가 자리수가 될 수 있도록
const indexObj = {}; // 각 문자별로 자리수의 합을 구하기 위한 객체
let maxLen = 0; // 최대 문자열 길이
for (let i = 1; i < input.length; i++) {
  str[i - 1] = input[i].split("").reverse();
  const len = str[i - 1].length;
  maxLen = maxLen > len ? maxLen : len;

  // 각 자리수 구해서 합하기
  // ex) 9878 => 9: 1000, 8: 100 + 1 = 101, 7: 10
  for (let j = 0; j < len; j++) {
    const letter = str[i - 1][j];
    if (indexObj[letter]) {
      indexObj[letter] += Math.pow(10, j);
    } else {
      indexObj[letter] = Math.pow(10, j);
    }
  }
}

// 각 자리수별로 높은 것부터 정렬
const indexSort = [];
for (let i in indexObj) {
  indexSort.push([indexObj[i], i]);
}
indexSort.sort((s1, s2) => s2[0] - s1[0]);

// 가장 높은 것을 우선으로 숫자 9부터 부여
const matchObj = {};
let num = 9;
for (let i = 0; i < indexSort.length; i++) {
  matchObj[indexSort[i][1]] = num;
  num--;
}

let answer = 0;
for (let i = 0; i < n; i++) {
  // 각 문제에 맞게 객체에서 찾아서 더하기
  answer += str[i].reduce(
    (acc, cur, idx) => acc + Math.pow(10, idx) * matchObj[cur],
    0
  );
}

console.log(answer);
