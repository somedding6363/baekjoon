const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const visited1 = new Array(20).fill(false);
const visited2 = new Array(4).fill(false);
const visited3 = new Array(7).fill(false);
const visited4 = new Array(4).fill(false);
const visited = [visited1, visited2, visited3, visited4];
const map = [
  [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
  [0, 13, 16, 19],
  [0, 22, 24, 25, 30, 35, 40],
  [0, 28, 27, 26],
];

const horse = new Array(4).fill([0, 0]);

// visited1 = 5 -> visited2
// visited1 = 10 -> visited3
// visited1 = 15 -> visited4
let count = 0;
let score = 0;
const checkSet = (i, v, m, index) => {
  if (!visited[v][m]) {
    let prevHorse = horse[i];
    if (v === 2 && m >= 7) {
      horse[i] = [-1, -1];
    } else {
      visited[v][m] = true;
      score += map[v][m];
      horse[i] = [m, v];
    }
    dfs(index + 1);
    horse[i] = prevHorse;
    if (!(v === 2 && m >= 7)) {
      visited[v][m] = false;
      score -= map[v][m];
    }
  }
};

let answer = 0;
const dfs = (index) => {
  if (index === 10) {
    count++;
    answer = Math.max(answer, score);
    return;
  }
  for (let i = 0; i < 4; i++) {
    let [location, visit] = horse[i];
    if (location === -1) continue;
    const move = input[index];
    visited[visit][location] = false;
    if (visit === 0) {
      if (location === 5) {
        if (move <= 3) {
          checkSet(i, 1, move, index);
        } else if (move >= 4) {
          checkSet(i, 2, move - 1, index);
        }
      } else if (location === 10) {
        checkSet(i, 2, move, index);
      } else if (location === 15) {
        if (move <= 3) {
          checkSet(i, 3, move, index);
        } else if (move >= 4) {
          checkSet(i, 2, move - 1, index);
        }
      } else {
        if (location + move < 20) {
          checkSet(i, 0, location + move, index);
        } else {
          checkSet(i, 2, location + move - 14, index);
        }
      }
    } else if (visit === 1) {
      if (location + move <= 3) {
        checkSet(i, 1, location + move, index);
      } else if (location + move >= 4) {
        checkSet(i, 2, location + move - 1, index);
      }
    } else if (visit === 2) {
      checkSet(i, 2, location + move, index);
    } else if (visit === 3) {
      if (location + move <= 3) {
        checkSet(i, 3, location + move, index);
      } else if (location + move >= 4) {
        checkSet(i, 2, location + move - 1, index);
      }
    }
    visited[visit][location] = true;
  }
};

horse[0] = [input[0], 0];
visited[0][input[0]] = true;
dfs(1);

console.log(answer + map[0][input[0]]);
