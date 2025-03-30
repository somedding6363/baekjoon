const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [...input] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const possible = [5, 5, 5, 5, 5]; // 순서대로 1*1, 2*2, 3*3, 4*4, 5*5 남은 수
// 색종이 붙였다 떼기
const action = (x, y, cnt, temp) => {
  for (let a = 0; a < cnt; a++) {
    for (let b = 0; b < cnt; b++) {
      input[x + a][y + b] = temp ? cnt : 1;
    }
  }
};
let left = 0;
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (input[i][j] === 1) left++;
  }
}
let answer = Infinity;
const dfs = (x, y, count) => {
  if (left === 0) {
    answer = Math.min(count, answer);
    return;
  }
  if (count >= answer) return;
  for (let idx = 10 * x + y; idx < 100; idx++) {
    const [i, j] = [Math.floor(idx / 10), idx % 10];
    if (input[i][j] === 1) {
      // 5*5
      if (i <= 5 && j <= 5 && possible[4] > 0) {
        let fail = false;
        for (let a = 0; a < 5; a++) {
          for (let b = 0; b < 5; b++) {
            if (input[i + a][j + b] !== 1) {
              fail = true;
              break;
            }
          }
          if (fail) break;
        }
        if (!fail) {
          action(i, j, 5, 1);
          possible[4]--;
          left -= 25;
          if (j === 5) dfs(i + 1, 0, count + 1);
          else dfs(i, j + 5, count + 1);
          action(i, j, 5, 0);
          possible[4]++;
          left += 25;
        }
      }
      // 4*4
      if (i <= 6 && j <= 6 && possible[3] > 0) {
        let fail = false;
        for (let a = 0; a < 4; a++) {
          for (let b = 0; b < 4; b++) {
            if (input[i + a][j + b] !== 1) {
              fail = true;
              break;
            }
          }
          if (fail) break;
        }
        if (!fail) {
          action(i, j, 4, 1);
          possible[3]--;
          left -= 16;
          if (j === 6) dfs(i + 1, 0, count + 1);
          else dfs(i, j + 4, count + 1);
          action(i, j, 4, 0);
          possible[3]++;
          left += 16;
        }
      }
      // 3*3
      if (i <= 7 && j <= 7 && possible[2] > 0) {
        let fail = false;
        for (let a = 0; a < 3; a++) {
          for (let b = 0; b < 3; b++) {
            if (input[i + a][j + b] !== 1) {
              fail = true;
              break;
            }
          }
          if (fail) break;
        }
        if (!fail) {
          action(i, j, 3, 1);
          possible[2]--;
          left -= 9;
          if (j === 7) dfs(i + 1, 0, count + 1);
          else dfs(i, j + 3, count + 1);
          action(i, j, 3, 0);
          possible[2]++;
          left += 9;
        }
      }
      // 2*2
      if (i <= 8 && j <= 8 && possible[1] > 0) {
        let fail = false;
        for (let a = 0; a < 2; a++) {
          for (let b = 0; b < 2; b++) {
            if (input[i + a][j + b] !== 1) {
              fail = true;
              break;
            }
          }
          if (fail) break;
        }
        if (!fail) {
          action(i, j, 2, 1);
          possible[1]--;
          left -= 4;
          if (j === 8) dfs(i + 1, 0, count + 1);
          else dfs(i, j + 2, count + 1);
          action(i, j, 2, 0);
          possible[1]++;
          left += 4;
        }
      }
      // 1*1
      if (possible[0] > 0) {
        let fail = false;
        for (let a = 0; a < 1; a++) {
          for (let b = 0; b < 1; b++) {
            if (input[i + a][j + b] !== 1) {
              fail = true;
              break;
            }
          }
          if (fail) break;
        }
        if (!fail) {
          action(i, j, 1, 1);
          possible[0]--;
          left -= 1;
          if (j === 9) dfs(i + 1, 0, count + 1);
          else dfs(i, j + 1, count + 1);
          action(i, j, 1, 0);
          possible[0]++;
          left += 1;
        }
      }
      break;
    }
  }
};
dfs(0, 0, 0);
console.log(answer === Infinity ? -1 : answer);
