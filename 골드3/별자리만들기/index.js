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
    while (this.heap[parIdx] && this.heap[parIdx][1] > this.heap[curIdx][1]) {
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
      this.swap(curIdx, smallIdx);
      curIdx = smallIdx;
      [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    }
  }
}

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const star = new Array(n);
for (let i = 0; i < n; i++) {
  star[i] = input[i + 1].split(" ").map(Number);
}

const heap = new MinHeap();
heap.add([0, 0]);
const visited = new Array(n).fill(false);
let answer = 0;

while (visited.indexOf(false) > -1) {
  const now = heap.shift();
  if (visited[now[0]]) continue;

  visited[now[0]] = true;
  answer += now[1];
  for (let i = 0; i < n; i++) {
    if (i === now) continue;
    if (visited[i]) continue;
    const diffx = star[now[0]][0] - star[i][0];
    const diffy = star[now[0]][1] - star[i][1];
    heap.add([i, Math.sqrt(Math.pow(diffx, 2) + Math.pow(diffy, 2))]);
  }
}

console.log(answer);
