const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [N, ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n");

const alpha = {
  A: 0,
  a: 1,
  B: 2,
  b: 3,
  C: 4,
  c: 5,
  D: 6,
  d: 7,
  E: 8,
  e: 9,
  F: 10,
  f: 11,
  G: 12,
  g: 13,
  H: 14,
  h: 15,
  I: 16,
  i: 17,
  J: 18,
  j: 19,
  K: 20,
  k: 21,
  L: 22,
  l: 23,
  M: 24,
  m: 25,
  N: 26,
  n: 27,
  O: 28,
  o: 29,
  P: 30,
  p: 31,
  Q: 32,
  q: 33,
  R: 34,
  r: 35,
  S: 36,
  s: 37,
  T: 38,
  t: 39,
  U: 40,
  u: 41,
  V: 42,
  v: 43,
  W: 44,
  w: 45,
  X: 46,
  x: 47,
  Y: 48,
  y: 49,
  Z: 50,
  z: 51,
};
const reOrdered = {};
const fileSort = (a, b) => {
  const ASize = a.length;
  const BSize = b.length;
  for (let i = 0; i < Math.min(ASize, BSize); i++) {
    // a[i], b[i] 둘 다 문자
    if (isNaN(Number(a[i][0])) && isNaN(Number(b[i][0]))) {
      const ALen = a[i][0].length;
      const BLen = b[i][0].length;
      for (let j = 0; j < Math.min(ALen, BLen); j++) {
        const _a = alpha[a[i][0][j]];
        const _b = alpha[b[i][0][j]];
        if (_a < _b) return -1;
        if (_a > _b) return 1;
      }
      if (ALen < BLen) return -1;
      else if (ALen > BLen) return 1;
    }
    // a[i], b[i] 둘 다 숫자
    else if (!isNaN(Number(a[i][0])) && !isNaN(Number(b[i][0]))) {
      // b가 더 큰 수
      if (a[i][0].length < b[i][0].length) return -1;
      // a가 더 큰 수
      if (a[i][0].length > b[i][0].length) return 1;

      // 길이가 같다면 처음부터 비교
      for (let j = 0; j < a[i][0].length; j++) {
        if (+a[i][0][j] < +b[i][0][j]) return -1;
        else if (+a[i][0][j] > +b[i][0][j]) return 1;
      }
      // 다 같다면 0의 개수 비교
      if ((a[i][1] || 0) < (b[i][1] || 0)) return -1;
      else if ((a[i][1] || 0) > (b[i][1] || 0)) return 1;
    }
    // a[i], b[i]가 하나는 숫자, 하나는 문자
    else {
      // a[i]가 숫자인 경우
      if (!isNaN(Number(a[i][0]))) return -1;
      // a[i]가 문자인 경우
      else return 1;
    }
  }
  // 순회 끝난 이후
  if (ASize < BSize) return -1;
  else if (ASize > BSize) return 1;
  else return 0;
};

// 파일별로 문자 숫자 구분
for (let i = 0; i < N; i++) {
  let arr = [];
  let str = data[i][0];
  for (let j = 1; j < data[i].length; j++) {
    // 앞과 현재가 둘 다 숫자 or 문자인 경우
    if (
      (isNaN(Number(data[i][j - 1])) && isNaN(Number(data[i][j]))) ||
      (!isNaN(Number(data[i][j - 1])) && !isNaN(Number(data[i][j])))
    ) {
      str += data[i][j];
    }
    // 앞과 현재가 다른 경우
    else {
      // 문자열의 첫글자가 0이라면 [앞의 0제외 숫자, 0의 개수]
      if (str[0] === "0") {
        const idx = str.split("").findIndex((s) => s !== "0");
        if (idx === -1) {
          arr.push(["0", str.length]); // 모두 0인 경우
        } else {
          arr.push([str.slice(idx), idx]);
        }
      } else {
        arr.push([str]);
      }

      str = data[i][j];
    }
  }
  // 남은 완성된 문자열의 첫글자가 0이라면 [앞의 0제외 숫자, 0의 개수]
  if (str[0] === "0") {
    const idx = str.split("").findIndex((s) => s !== "0");
    if (idx === -1) {
      arr.push(["0", str.length]); // 모두 0인 경우
    } else {
      arr.push([str.slice(idx), idx]);
    }
  } else {
    arr.push([str]);
  }
  reOrdered[data[i]] = [...arr];
}

data.sort((a, b) => fileSort(reOrdered[a], reOrdered[b]));
console.log(data.join("\n"));
