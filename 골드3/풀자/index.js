const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N, V], data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

let answer = N;
const visited = new Map();

const dfs = (index, min, max, count) => {
  if (
    visited.has(`${index}-${min}-${max}`) &&
    visited.get(`${index}-${min}-${max}`) < count
  )
    return;
  visited.set(`${index}-${min}-${max}`, count);

  // A + 1 번으로 넘어갈 때
  if (index + 1 < N) {
    // 최소 최대 갱신
    let _min = Math.min(min, data[index + 1]);
    let _max = Math.max(max, data[index + 1]);
    if (_max - _min >= V) {
      answer = Math.min(answer, count + 1);
    } else {
      dfs(index + 1, _min, _max, count + 1);
    }
  }
  // A + 2 번으로 넘어갈 때
  if (index + 2 < N) {
    // 최소 최대 갱신
    let _min = Math.min(min, data[index + 2]);
    let _max = Math.max(max, data[index + 2]);
    if (_max - _min >= V) {
      answer = Math.min(answer, count + 1);
    } else {
      dfs(index + 2, _min, _max, count + 1);
    }
  }
};

dfs(0, data[0], data[0], 1);
console.log(answer);
