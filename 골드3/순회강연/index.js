class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  add(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  bubbleUp() {
    let curIdx = this.size() - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[parIdx][0] > this.heap[curIdx][0]) {
      [this.heap[curIdx], this.heap[parIdx]] = [
        this.heap[parIdx],
        this.heap[curIdx],
      ];
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    if (this.size() === 0) return null;
    const val = this.heap[0];
    const last = this.heap.pop();
    if (this.size()) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return val;
  }
  bubbleDown() {
    let curIdx = 0;
    let [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    while (
      (this.heap[leftIdx] && this.heap[leftIdx][0] < this.heap[curIdx][0]) ||
      (this.heap[rightIdx] && this.heap[rightIdx][0] < this.heap[curIdx][0])
    ) {
      let smallIdx = leftIdx;
      if (
        this.heap[rightIdx] &&
        this.heap[rightIdx][0] < this.heap[leftIdx][0]
      ) {
        smallIdx = rightIdx;
      }
      [this.heap[curIdx], this.heap[smallIdx]] = [
        this.heap[smallIdx],
        this.heap[curIdx],
      ];
      curIdx = smallIdx;
      [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    }
  }
}

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

// data 날짜로 오름차순
data.sort((d1, d2) => d1[1] - d2[1]);
// heap 생성
const heap = new MinHeap();
for (let i = 0; i < N; i++) {
  const [p, d] = data[i];
  heap.add([p, d]);
  // 현재 heap의 크기(=현재 일자)가 다음 들어올 d보다 크면 가장 작은 돈 빼기
  if (heap.size() > d) {
    heap.shift();
  }
}

// 합계
console.log(heap.heap.reduce((acc, cur) => acc + cur[0], 0));
