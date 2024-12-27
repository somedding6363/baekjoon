class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  swap(idx1, idx2) {
    [this.heap[idx2], this.heap[idx1]] = [this.heap[idx1], this.heap[idx2]];
  }
  add(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  bubbleUp() {
    let curIdx = this.size() - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[parIdx][2] > this.heap[curIdx][2]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    if (this.size() === 0) {
      return null;
    }
    let value = this.heap[0];
    let last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return value;
  }
  bubbleDown() {
    let curIdx = 0;
    let [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    while (
      (this.heap[leftIdx] && this.heap[leftIdx][2] < this.heap[curIdx][2]) ||
      (this.heap[rightIdx] && this.heap[rightIdx][2] < this.heap[curIdx][2])
    ) {
      let smallIdx = leftIdx;
      if (
        this.heap[rightIdx] &&
        this.heap[rightIdx][2] < this.heap[leftIdx][2]
      ) {
        smallIdx = rightIdx;
      }
      this.swap(curIdx, smallIdx);
      curIdx = smallIdx;
      [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    }
  }
}

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [v, e] = input[0].split(" ").map(Number);
const heap = new MinHeap();
for (let i = 0; i < e; i++) {
  heap.add(input[i + 1].split(" ").map(Number));
}

const parent = new Array(v + 1).fill(0).map((_, i) => i);
const getParent = (index) => {
  if (parent[index] === index) return index;
  return (parent[index] = getParent(parent[index]));
};

let chosen = 0;
let answer = 0;
while (chosen < v - 1) {
  const [v1, v2, dist] = heap.shift();
  const p1 = getParent(v1);
  const p2 = getParent(v2);
  if (p1 === p2) continue;

  if (p1 < p2) {
    parent[p2] = p1;
  } else {
    parent[p1] = p2;
  }
  answer += dist;
  chosen++;
}

console.log(answer);
