class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }
  add(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  bubbleUp() {
    let curIdx = this.size() - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[parIdx][1] > this.heap[curIdx][1]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    if (this.size() === 0) return null;
    const val = this.heap[0];
    const last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }

    return val;
  }
  bubbleDown() {
    let curIdx = 0;
    let [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    while (
      (this.heap[leftIdx] && this.heap[leftIdx][1] < this.heap[curIdx][1]) ||
      (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[curIdx][1])
    ) {
      let smallIdx = leftIdx;
      if (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[leftIdx][1])
        smallIdx = rightIdx;
      this.swap(curIdx, smallIdx);
      curIdx = smallIdx;
      [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    }
  }
}

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const t = Number(input[0]);
const answer = [];
for (let i = 1; i < input.length; i++) {
  const [n, d, c] = input[i].split(" ").map(Number);
  const heap = new MinHeap();
  const dependency = new Array(n + 1).fill(null).map((_) => new Array(0));
  for (let j = 0; j < d; j++) {
    const [a, b, s] = input[i + 1 + j].split(" ").map(Number);
    dependency[b].push([a, s]);
  }
  for (let k = 0; k < dependency[c].length; k++) {
    heap.add(dependency[c][k]);
  }
  const visited = new Array(n + 1).fill(false);
  const cost = new Array(n + 1).fill(Infinity);
  visited[c] = true;
  cost[c] = 0;
  let totalNum = 1;
  let totalSec = 0;
  while (heap.size()) {
    const [to, sec] = heap.shift();
    cost[to] = Math.min(cost[to], sec);
    if (visited[to]) continue;

    visited[to] = true;
    for (let k = 0; k < dependency[to].length; k++) {
      heap.add([dependency[to][k][0], sec + dependency[to][k][1]]);
    }

    totalNum++;
    totalSec = Math.max(totalSec, sec);
  }
  answer.push([totalNum, totalSec]);

  i += d;
}

for (let i = 0; i < t; i++) {
  console.log(answer[i][0], answer[i][1]);
}
