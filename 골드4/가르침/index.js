const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
let [n, k] = input[0].split(" ").map(Number);
const words = new Array(n).fill(null);
const base = "antic";
const totalSet = new Set();
const alpha = new Array(26).fill(0);
for (let i = 0; i < 5; i++) {
  alpha[base[i] - "a"] = 1;
}

for (let i = 0; i < n; i++) {
  words[i] = input[i + 1]
    .split("")
    .filter((v) => alpha[v.charCodeAt() - "a".charCodeAt()] === 0);
  words[i].forEach((v) => totalSet.add(v));
}

if (k < base.length) console.log(0);
else {
  k -= base.length;
  const totalArr = Array.from(totalSet);
  let answer = 0;

  const dfs = (index, count) => {
    if (count === 0 || index > totalArr.length - 1) {
      let num = 0;

      for (let i = 0; i < n; i++) {
        if (words[i].length === 0) num++;
        else {
          let pass = true;
          words[i].forEach((v) => {
            if (alpha[v.charCodeAt() - "a".charCodeAt()] === 0) {
              pass = false;
              return;
            }
          });
          if (pass) num++;
        }
      }
      answer = Math.max(answer, num);
      return;
    }

    for (let i = index; i < totalArr.length; i++) {
      let _index = totalArr[i].charCodeAt() - "a".charCodeAt();
      if (alpha[_index] === 1) continue;
      alpha[_index] = 1;
      dfs(i + 1, count - 1);
      alpha[_index] = 0;
    }
  };

  dfs(0, k);

  console.log(answer);
}
