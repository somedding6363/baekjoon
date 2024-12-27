const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, l] = input[0].split(" ").map(Number);
const road = new Array(2 * n).fill(null).map((_) => new Array(0));
for (let i = 0; i < n; i++) {
  road[i] = input[i + 1].split(" ").map((val, idx) => {
    road[idx + n].push(Number(val));
    return Number(val);
  });
}

const answer = new Array(2 * n).fill(1);

for (let i = 0; i < 2 * n; i++) {
  let now = road[i];
  let count = 1;
  for (let j = 1; j < n; j++) {
    const diff = now[j] - now[j - 1];
    if (Math.abs(diff) > 1) {
      answer[i] = 0;
      break;
    }

    if (diff === 0) count++;
    else if (diff === 1) {
      if (count < l) {
        answer[i] = 0;
        break;
      } else {
        count = 1;
      }
    } else if (diff === -1) {
      let check = true;
      for (let k = 0; k < l; k++) {
        if (now[j + k] !== now[j]) {
          check = false;
          break;
        }
      }
      if (!check) {
        answer[i] = 0;
        break;
      } else {
        count = 0;
        j += l - 1;
      }
    }
  }
}

console.log(answer.filter((v) => v).length);
