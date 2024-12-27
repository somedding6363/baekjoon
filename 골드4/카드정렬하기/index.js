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
  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }
  bubbleUp() {
    let curIdx = this.size() - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[parIdx] > this.heap[curIdx]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    if (this.size() === 0) return null;
    const value = this.heap[0];
    const last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return value;
  }
  bubbleDown() {
    let curIdx = 0;
    let leftIdx = curIdx * 2 + 1;
    let rightIdx = curIdx * 2 + 2;
    while (
      (this.heap[leftIdx] && this.heap[leftIdx] < this.heap[curIdx]) ||
      (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[curIdx])
    ) {
      let smallIdx = leftIdx;
      if (this.heap[rightIdx] && this.heap[leftIdx] > this.heap[rightIdx]) {
        smallIdx = rightIdx;
      }

      this.swap(curIdx, smallIdx);
      curIdx = smallIdx;
      leftIdx = curIdx * 2 + 1;
      rightIdx = curIdx * 2 + 2;
    }
  }
}

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const heap = new MinHeap();
for (let i = 0; i < n; i++) {
  heap.add(Number(input[i + 1]));
}

let answer = 0;
while (heap.size() > 1) {
  let sum = heap.shift() + heap.shift();
  answer += sum;
  heap.add(sum);
}

console.log(answer);
