class MaxHeap {
  constructor() {
    this.heap = [];
  }
  add(val) {
    this.heap.push(val);

    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[curIdx] > this.heap[parIdx]) {
      [this.heap[parIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[parIdx],
      ];
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    if (this.heap.length === 0) return null;
    let val = this.heap[0];
    let last = this.heap.pop();

    if (this.heap.length) {
      this.heap[0] = last;
      let curIdx = 0;
      let [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
      while (
        (this.heap[leftIdx] && this.heap[leftIdx] > this.heap[curIdx]) ||
        (this.heap[rightIdx] && this.heap[rightIdx] > this.heap[curIdx])
      ) {
        let smallIdx = leftIdx;
        if (this.heap[rightIdx] && this.heap[rightIdx] > this.heap[leftIdx]) {
          smallIdx = rightIdx;
        }
        [this.heap[smallIdx], this.heap[curIdx]] = [
          this.heap[curIdx],
          this.heap[smallIdx],
        ];
        curIdx = smallIdx;
        [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
      }
    }
    return val;
  }
}

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N], ...problem] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

problem.sort((a, b) => b[0] - a[0]);

const heap = new MaxHeap();
let line = problem[0][0];
let answer = 0;
for (let i = 0; i < N; i++) {
  if (problem[i][0] === line) {
    heap.add(problem[i][1]);
  } else {
    while (problem[i][0] < line) {
      let value = heap.shift();
      if (value !== null) answer += value;
      line--;
    }
    heap.add(problem[i][1]);
  }
}

while (line > 0) {
  let value = heap.shift();
  if (value !== null) answer += value;
  line--;
}

console.log(answer);
