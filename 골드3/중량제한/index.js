const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const bridge = Array.from({ length: n }, () => []);
for (let i = 1; i < input.length - 1; i++) {
  let b = input[i].split(" ").map(Number);
  bridge[b[0] - 1].push([b[1], b[2]]);
  bridge[b[1] - 1].push([b[0], b[2]]);
}
const [start, end] = input[input.length - 1].split(" ").map(Number);

class MaxHeap {
  constructor() {
    this.node = [];
  }
  size() {
    return this.node.length;
  }
  swap(i1, i2) {
    [this.node[i1], this.node[i2]] = [this.node[i2], this.node[i1]];
  }
  add(value) {
    this.node.push(value);
    this.bubbleUp();
  }
  bubbleUp() {
    let curId = this.node.length - 1;
    let parId = Math.floor((curId - 1) / 2);
    while (this.node[parId] && this.node[parId][2] < this.node[curId][2]) {
      this.swap(curId, parId);
      curId = parId;
      parId = Math.floor((curId - 1) / 2);
    }
  }
  shift() {
    let value = this.node[0];
    if (this.size() === 1) {
      this.node.pop();
    } else {
      this.node[0] = this.node.pop();
      this.bubbleDown();
    }

    return value;
  }
  bubbleDown() {
    let curId = 0;
    let leftId = 2 * curId + 1;
    let rightId = 2 * curId + 2;
    while (
      (this.node[leftId] && this.node[leftId][2] > this.node[curId][2]) ||
      (this.node[rightId] && this.node[rightId][2] > this.node[curId][2])
    ) {
      let bigId = leftId;
      if (this.node[rightId] && this.node[leftId][2] < this.node[rightId][2]) {
        bigId = rightId;
      }

      this.swap(curId, bigId);
      curId = bigId;
      leftId = 2 * curId + 1;
      rightId = 2 * curId + 2;
    }
  }
}

const heap = new MaxHeap();
heap.add([start, start, 0]);
const weight = new Array(n).fill(Infinity);
const visited = new Array(n).fill(false);

while (heap.size()) {
  let now = heap.shift();
  if (now[1] === end) {
    console.log(weight[now[1] - 1]);
    break;
  }
  visited[now[1] - 1] = true;
  let next = bridge[now[1] - 1];
  for (let i = 0; i < next.length; i++) {
    if (visited[next[i][0] - 1]) continue;

    if (weight[next[i][0] - 1] !== Infinity) {
      if (weight[next[i][0] - 1] < Math.min(weight[now[1] - 1], next[i][1])) {
        weight[next[i][0] - 1] = Math.min(weight[now[1] - 1], next[i][1]);
        heap.add([now[1], ...next[i]]);
      }
    } else {
      weight[next[i][0] - 1] = Math.min(weight[now[1] - 1], next[i][1]);
      heap.add([now[1], ...next[i]]);
    }
  }
}
