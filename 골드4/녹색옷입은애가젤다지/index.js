const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = [];
const map = [];
let index = -1;
for (let i = 0; i < input.length; i++) {
  const arr = input[i].split(" ").map(Number);
  if (arr.length === 1) {
    if (arr[0] === 0) break;
    index++;
    n.push(arr[0]);
    map.push([]);
  } else {
    map[index].push([...arr]);
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }
  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }
  bubbleUp() {
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[parIdx][2] > this.heap[curIdx][2]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    let value = this.heap[0];
    if (this.size() === 1) {
      this.heap.pop();
    } else {
      this.heap[0] = this.heap.pop();
      this.bubbleDown();
    }
    return value;
  }
  bubbleDown() {
    let curIdx = 0;
    let leftIdx = curIdx * 2 + 1;
    let rightIdx = curIdx * 2 + 2;
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
      leftIdx = curIdx * 2 + 1;
      rightIdx = curIdx * 2 + 2;
    }
  }
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
for (let i = 0; i <= index; i++) {
  const heap = new MinHeap();
  const _n = n[i];
  const _map = map[i];
  const distance = new Array(_n)
    .fill(null)
    .map((_) => new Array(_n).fill(Infinity));

  heap.add([0, 0, _map[0][0]]);
  distance[0][0] = _map[0][0];
  while (heap.size()) {
    const [x, y, v] = heap.shift();

    if (x === _n - 1 && y === _n - 1) {
      console.log("Problem " + (i + 1) + ": " + v);
      break;
    }
    for (let j = 0; j < 4; j++) {
      const lx = x + dx[j];
      const ly = y + dy[j];
      if (lx < 0 || ly < 0 || lx > _n - 1 || ly > _n - 1) continue;
      if (distance[lx][ly] > v + _map[lx][ly]) {
        heap.add([lx, ly, v + _map[lx][ly]]);
        distance[lx][ly] = v + _map[lx][ly];
      }
    }
  }
}
