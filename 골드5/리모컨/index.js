const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const m = Number(input[1]);
if (m === 10) console.log(Math.abs(100 - n));
else if (m === 0)
  console.log(
    Math.abs(100 - n) < String(n).length ? Math.abs(100 - n) : String(n).length
  );
else {
  const broken = input[2].split(" ").map(Number);
  const channel = new Array(10).fill(1);
  for (let i = 0; i < m; i++) {
    channel[broken[i]] = 0;
  }
  const min = channel.findIndex((v) => v);
  const max = channel.findLastIndex((v) => v);

  let nArr = String(n).split("").map(Number);
  if (nArr.length === 1) {
    if (channel[n]) console.log(1);
    else {
      let a = channel.findLastIndex((v, i) => i < n && v);
      let b = channel.findIndex((v, i) => i > n && v);
      if (a === -1) console.log(1 + b - n);
      else if (b === -1) console.log(1 + n - a);
      else if (n - a < b - n) {
        console.log(1 + n - a);
      } else {
        console.log(1 + b - n);
      }
    }
  } else {
    let correct = 0;
    for (let i = 0; i < nArr.length; i++) {
      correct = correct * 10 + nArr[i];
      if (!channel[nArr[i]]) break;
    }
    if (correct <= 9) correct = Number(nArr.slice(0, 2).join(""));
    let prevLen = String(correct).length;
    let gap = 1;
    while (1) {
      if (
        correct > gap &&
        String(correct - gap)
          .split("")
          .findIndex((v) => !channel[v]) === -1
      ) {
        correct -= gap;
        break;
      }

      if (
        String(correct + gap)
          .split("")
          .findIndex((v) => !channel[v]) === -1
      ) {
        correct += gap;
        break;
      }
      gap++;
    }

    let rest = nArr.length - prevLen;
    correct *= Math.pow(10, rest);
    if (correct > n) {
      for (let i = 0; i < rest; i++) {
        correct += min * Math.pow(10, rest - 1 - i);
      }
    } else {
      for (let i = 0; i < rest; i++) {
        correct += max * Math.pow(10, rest - 1 - i);
      }
    }

    if (Math.abs(100 - n) < String(correct).length + Math.abs(n - correct)) {
      console.log(Math.abs(100 - n));
    } else {
      console.log(String(correct).length + Math.abs(n - correct));
    }
  }
}
