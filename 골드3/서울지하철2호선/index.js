const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const obj = {};
for (let i = 0; i < n; i++) {
  const [a, b] = input[i + 1].split(" ").map(Number);
  obj[a] = (obj[a] || []).concat([b]);
  obj[b] = (obj[b] || []).concat([a]);
}

const end = [];
for (let o in obj) {
  if (obj[o].length === 1) {
    end.push(Number(o));
  }
}

let start = 0;
let cycleArr = [];
let _cycleArr = [];
let visited = new Array(n + 1).fill(false);
const findCycle = (node, prev) => {
  if (prev && node === start) {
    cycleArr = _cycleArr;
    console.log(_cycleArr);
    return;
  }
  visited[node] = true;
  let now = obj[node];
  now.forEach((v) => {
    if ((!prev || v !== prev) && !visited[v]) {
      _cycleArr.push(v);
      findCycle(v, node);
      _cycleArr.pop();
    }
  });
};

for (let i = 1; i <= n; i++) {
  if (cycleArr.length) {
    break;
  }
  start = i;
  _cycleArr = [];
  visited = new Array(n + 1).fill(false);
  findCycle(i, null);
}
console.log(cycleArr);

let arr = [];
let answer = new Array(n).fill(0);
let semiAnswer = new Array(n).fill(0);
const dfs = (node, prev) => {
  if (connect.indexOf(node) > -1) {
    return;
  }
  arr.forEach((a) => {
    semiAnswer[a - 1]++;
  });
  let now = obj[node];
  now.forEach((v) => {
    if (!prev || v !== prev) {
      arr.push(v);
      dfs(v, node);
    }
  });
};

if (end.length === 0) {
  console.log(new Array(n).fill(0).join(" "));
} else {
  // end.forEach((v) => {
  //   semiAnswer = new Array(n).fill(0);
  //   arr = [v];
  //   dfs(v, null);
  //   answer = answer.map((v, i) => v + semiAnswer[i]);
  // });

  console.log(answer.join(" "));
}
