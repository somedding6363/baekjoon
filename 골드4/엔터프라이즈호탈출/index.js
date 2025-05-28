class MinHeap {
  constructor() {
    this.heap = [];
  }
  add(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  bubbleUp() {
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[curIdx][2] < this.heap[parIdx][2]) {
      [this.heap[parIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[parIdx],
      ];
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    if (this.heap.length === 0) {
      return null;
    }
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
      (this.heap[leftIdx] && this.heap[leftIdx][2] < this.heap[curIdx][2]) ||
      (this.heap[rightIdx] && this.heap[rightIdx][2] < this.heap[curIdx][2])
    ) {
      let bigIdx = leftIdx;
      if (
        this.heap[rightIdx] &&
        this.heap[rightIdx][2] < this.heap[leftIdx][2]
      ) {
        bigIdx = rightIdx;
      }
      [this.heap[bigIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[bigIdx],
      ];
      curIdx = bigIdx;
      [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    }
  }
}

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[T], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));

const answer = [];
let idx = 0;
for (let t = 0; t < T; t++) {
  const Klingons = {};
  const grid = [];
  const [K, W, H] = data[idx++].map(Number);
  for (let k = 0; k < K; k++) {
    const [alpha, time] = data[idx++];
    Klingons[alpha] = +time;
  }
  // MinHeap
  const heap = new MinHeap();
  for (let h = 0; h < H; h++) {
    grid.push(
      data[idx++][0].split("").map((v, i) => {
        if (v === "E") {
          heap.add([h, i, 0]);
        }
        return v;
      })
    );
  }

  const dxy = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visited = new Array(H).fill(null).map((_) => new Array(W).fill(false));
  visited[heap.heap[0][0]][heap.heap[0][1]] = true;
  while (heap.heap.length) {
    const [r, c, time] = heap.shift();
    if (r === 0 || r === H - 1 || c === 0 || c === W - 1) {
      answer.push(time);
      break;
    }

    for (let i = 0; i < 4; i++) {
      const _r = r + dxy[i][0];
      const _c = c + dxy[i][1];
      if (visited[_r][_c]) continue;
      visited[_r][_c] = true;
      heap.add([_r, _c, time + Klingons[grid[_r][_c]]]);
    }
  }
}

console.log(answer.join("\n"));
