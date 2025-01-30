class MinHeap {
  constructor() {
    this.heap = [];
  }
  compare(a, b) {
    if (a[1] !== b[1]) return b[1] - a[1];
    return b[0] - a[0];
  }
  add(val) {
    this.heap.push(val);

    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (
      this.heap[parIdx] &&
      this.compare(this.heap[curIdx], this.heap[parIdx]) < 0
    ) {
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
        (this.heap[leftIdx] &&
          this.compare(this.heap[leftIdx], this.heap[curIdx]) < 0) ||
        (this.heap[rightIdx] &&
          this.compare(this.heap[rightIdx], this.heap[curIdx]) < 0)
      ) {
        let smallIdx = leftIdx;
        if (
          this.heap[rightIdx] &&
          this.compare(this.heap[rightIdx], this.heap[leftIdx]) < 0
        ) {
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

const heap = new MinHeap();
for (let i = 0; i < N; i++) {
  heap.add(problem[i]);
}

let ramen = new Array(N + 1).fill(0);
let answer = 0;
for (let i = 0; i < N; i++) {
  let [index, value] = heap.shift();

  while (index > 0) {
    if (!ramen[index]) {
      ramen[index] = value;
      answer += value;
      break;
    } else index--;
  }
}

console.log(answer);
