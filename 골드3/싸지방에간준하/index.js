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
    while (this.heap[parIdx] && this.heap[parIdx][1] > this.heap[curIdx][1]) {
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
      (this.heap[leftIdx] && this.heap[leftIdx][1] < this.heap[curIdx][1]) ||
      (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[curIdx][1])
    ) {
      let smallIdx = leftIdx;
      if (
        this.heap[rightIdx] &&
        this.heap[rightIdx][1] < this.heap[leftIdx][1]
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
const [[N], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

data.sort((a, b) => a[0] - b[0]);
let max = 0; // 컴퓨터 대수
const heap = new MinHeap(); // 종료 시간으로 min heap, [[자리 번호, 종료 시간], ...]
const computer = new Array(N + 1).fill(0); // 빈 자리 0
const accComputer = new Array(N + 1).fill(0); // 자리 별 누적 사람 수
computer[0] = 1;
let index = 1; // 현재 제일 첫 빈 자리
// data 순회
for (let i = 0; i < N; i++) {
  // 시작 시각, 종료 시각
  const [P, Q] = data[i];
  while (heap.size()) {
    // heap의 루트 값이 더 작을 때까지 빼기
    if (heap.heap[0][1] < P) {
      const [e, _] = heap.shift();
      computer[e] = 0; // 빈 자리로 만들기
      index = Math.min(index, e); // 빈 자리 갱신
    } else break;
  }
  // 컴퓨터 사용
  heap.add([index, Q]);
  accComputer[index]++;
  computer[index] = 1;
  index = computer.indexOf(0);
  max = Math.max(max, heap.size());
}

console.log(max);
console.log(accComputer.slice(1, max + 1).join(" "));
