const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[n], ...I] = require("fs").readFileSync(file).toString().trim()
  .split`\n`.map((e) => e.split` `.map(Number));
class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }
  add(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  bubbleUp() {
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[parIdx] > this.heap[curIdx]) {
      [this.heap[curIdx], this.heap[parIdx]] = [
        this.heap[parIdx],
        this.heap[curIdx],
      ];
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    let val = this.heap[0];
    let last = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return val;
  }
  bubbleDown() {
    let curIdx = 0;
    let [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    while (
      (this.heap[leftIdx] && this.heap[leftIdx] < this.heap[curIdx]) ||
      (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[curIdx])
    ) {
      let smallIdx = leftIdx;
      if (this.heap[rightIdx] && this.heap[leftIdx] > this.heap[rightIdx]) {
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

const graph = [...new Array(n + 1)].map((_) => []);
const indegree = new Array(n + 1).fill(0);
I.forEach(([a, b]) => {
  graph[a].push(b);
  indegree[b]++;
});

const heap = new MinHeap();
for (let i = 1; i <= n; i++) {
  if (indegree[i] === 0) {
    heap.add(i);
  }
}

const answer = [];
while (heap.heap.length) {
  let now = heap.shift();
  answer.push(now);
  graph[now].forEach((v) => {
    indegree[v]--;
    if (indegree[v] === 0) {
      heap.add(v);
    }
  });
}

console.log(answer.join` `);
