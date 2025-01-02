const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
let totalPopulation = 0;
const population = input[1].split(" ").map((v) => {
  totalPopulation += Number(v);
  return Number(v);
});
const connect = new Array(n);
let zeroCnt = 0;
for (let i = 0; i < n; i++) {
  const [c, ...arr] = input[2 + i].split(" ").map(Number);
  if (c === 0) zeroCnt++;
  connect[i] = arr;
}
if (n > 2 && zeroCnt >= 2) {
  console.log(-1);
} else {
  let min = Infinity;
  let start = 0;
  const visited = new Array(n).fill(false);
  visited[start] = true;

  const checkConnect = (section) => {
    const queue = [section[0]];
    const visited = new Array(section.length).fill(false);
    visited[0] = true;
    while (queue.length) {
      const now = queue.shift();
      for (let i = 0; i < connect[now].length; i++) {
        const next = connect[now][i] - 1;
        const index = section.indexOf(next);
        if (index > -1 && !visited[index]) {
          visited[index] = true;
          queue.push(next);
        }
      }
    }

    let count = 0;
    visited.forEach((v) => v && count++);
    if (count !== section.length) {
      return false;
    }
    return true;
  };

  const combination = (section) => {
    if (section.length && checkConnect(section)) {
      let otherSection = [];
      for (let i = 0; i < n; i++) {
        if (section.indexOf(i) === -1) {
          otherSection.push(i);
        }
      }
      if (otherSection.length && checkConnect(otherSection)) {
        let sum = 0;
        for (let i = 0; i < section.length; i++) {
          sum += population[section[i]];
        }
        min = Math.min(min, Math.abs(totalPopulation - sum - sum));
      }
    }
    if (section.length >= n / 2) return;
    if (section.length === 0) {
      for (let i = 0; i < n; i++) {
        combination([i]);
      }
    } else {
      for (let i = section[section.length - 1] + 1; i < n; i++) {
        combination([...section, i]);
      }
    }
  };

  combination([]);

  console.log(min === Infinity ? -1 : min);
}
