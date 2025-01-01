const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m, k] = input[0].split(" ").map(Number);
const sticker = [];
for (let i = 1; i < input.length; i++) {
  const [r, c] = input[i].split(" ").map(Number);
  const arr = [];
  for (let j = 0; j < r; j++) {
    arr.push(input[++i].split(" ").map(Number));
  }
  sticker.push(arr);
}

const notebook = new Array(n).fill(null).map((_) => new Array(m).fill(0));
const put = (idx, rotate) => {
  let s = sticker[idx];
  let [r, c] = [s.length, s[0].length];
  if (rotate % 2) {
    [r, c] = [c, r];
  }

  for (let i = 0; i < n - r + 1; i++) {
    for (let j = 0; j < m - c + 1; j++) {
      let impossible = false;
      for (let x = 0; x < r; x++) {
        for (let y = 0; y < c; y++) {
          if (rotate === 0) {
            if (notebook[i + x][j + y] + s[x][y] >= 2) {
              impossible = true;
              break;
            }
          } else if (rotate === 1) {
            if (notebook[i + x][j + y] + s[c - y - 1][x] >= 2) {
              impossible = true;
              break;
            }
          } else if (rotate === 2) {
            if (notebook[i + x][j + y] + s[r - x - 1][c - y - 1] >= 2) {
              impossible = true;
              break;
            }
          } else if (rotate === 3) {
            if (notebook[i + x][j + y] + s[y][r - x - 1] >= 2) {
              impossible = true;
              break;
            }
          }
        }
        if (impossible) break;
      }
      if (!impossible) {
        for (let x = 0; x < r; x++) {
          for (let y = 0; y < c; y++) {
            if (rotate === 0) {
              notebook[i + x][j + y] += s[x][y];
            } else if (rotate === 1) {
              notebook[i + x][j + y] += s[c - y - 1][x];
            } else if (rotate === 2) {
              notebook[i + x][j + y] += s[r - x - 1][c - y - 1];
            } else if (rotate === 3) {
              notebook[i + x][j + y] += s[y][r - x - 1];
            }
          }
        }
        return true;
      }
    }
  }

  return false;
};
for (let i = 0; i < k; i++) {
  for (let j = 0; j < 4; j++) {
    let possible = put(i, j);
    if (possible) break;
  }
}

let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (notebook[i][j] === 1) {
      answer++;
    }
  }
}
console.log(answer);
