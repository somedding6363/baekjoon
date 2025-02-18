const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [N, ...path] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n");
N = Number(N);
path.sort((a, b) => a.localeCompare(b));

const tree = {};
const set = (str) => {
  const arr = str.split("\\");
  let now = tree;
  for (let i = 0; i < arr.length; i++) {
    const dir = arr[i];
    if (!now[dir]) {
      now[dir] = {};
    }
    now = now[dir];
  }
};
const answer = [];
const print = (r, node) => {
  for (let i in node) {
    answer.push(" ".repeat(r) + i);
    print(r + 1, node[i]);
  }
};

for (let i = 0; i < N; i++) {
  set(path[i]);
}

print(0, tree);
console.log(answer.join("\n"));
