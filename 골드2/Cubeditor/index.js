const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const str = require("fs").readFileSync(file).toString().trim();

const findPattern = (pattern) => {
  let fail = new Array(pattern.length).fill(0);
  let fM = 0;
  let fBegin = 1;
  while (fM + fBegin < pattern.length) {
    if (pattern[fM] === pattern[fM + fBegin]) {
      fM++;
      fail[fM + fBegin - 1] = fM;
    } else {
      if (fM == 0) {
        fBegin++;
      } else {
        fBegin += fM - fail[fM - 1];
        fM = fail[fM - 1];
      }
    }
  }

  let m = 0;
  let begin = 0;
  let count = 0;
  while (begin <= str.length - pattern.length) {
    if (str[begin + m] === pattern[m]) {
      m++;
      if (m === pattern.length) {
        count++;
        if (count === 2) {
          return true;
        }
      }
    } else {
      if (m === 0) begin++;
      else {
        begin += m - fail[m - 1];
        m = fail[m - 1];
      }
    }
  }

  return false;
};

let len = str.length - 1;
let index = 0;
while (len > 0) {
  if (index + len < str.length) {
    let pattern = str.substring(index, index + len);
    let bool = findPattern(pattern);
    if (bool) break;
    index++;
  } else {
    len--;
    index = 0;
  }
}

console.log(len);
