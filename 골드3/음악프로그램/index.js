const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const map = {};
for (let i = 1; i < input.length; i++) {
  const [k, ...arr] = input[i].split(" ").map(Number);
  for (let j = 0; j < k; j++) {
    if (!map[arr[j]]) {
      map[arr[j]] = new Set();
    }
    if (j > 0) {
      arr.slice(0, j).forEach((num) => map[arr[j]].add(num));
    }
  }
}
const answer = [];
while (Object.keys(map).length) {
  let prev = Object.keys(map).length;
  for (let i in map) {
    if (map[i].size === 0) {
      answer.push(Number(i));
      delete map[i];
      for (let j in map) {
        map[j].delete(Number(i));
      }
    }
  }
  if (Object.keys(map).length === prev) break;
}

if (Object.keys(map).length > 0) console.log(0);
else {
  let nSet = new Set(new Array(n).fill(null).map((v, i) => (v = i + 1)));
  for (let i in answer) {
    console.log(answer[i]);
    nSet.delete(answer[i]);
  }
  for (let i of nSet) {
    console.log(i);
  }
}
