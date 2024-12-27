// 다익스트라

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
    while (this.heap[parIdx] && this.heap[parIdx][1] > this.heap[curIdx][1]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    if (this.size() === 0) return null;
    if (this.size() === 1) {
      return this.heap.pop();
    } else {
      const value = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown();
      return value;
    }
  }
  bubbleDown() {
    let curIdx = 0;
    let leftIdx = curIdx * 2 + 1;
    let rightIdx = curIdx * 2 + 2;
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
      leftIdx = curIdx * 2 + 1;
      rightIdx = curIdx * 2 + 2;
    }
  }
}

const findRoom = (n, path, k, location) => {
  let totalDist = new Array(n).fill(0);
  let answer = 0;
  for (let i = 0; i < k; i++) {
    const dist = new Array(n).fill(Infinity);
    const visited = new Array(n).fill(false);
    const heap = new MinHeap();
    const start = location[i];
    heap.add([start, 0]);
    dist[start - 1] = 0;

    while (heap.size()) {
      const [to, d] = heap.shift();
      if (visited[to - 1]) continue;

      visited[to - 1] = true;
      if (visited.filter((v) => !v).length === 0) break;

      const newTo = path[to];
      for (let j = 0; j < newTo.length; j++) {
        const next = newTo[j];
        if (visited[next[0] - 1]) continue;
        if (dist[next[0] - 1] > d + next[1]) {
          dist[next[0] - 1] = d + next[1];
          heap.add([next[0], d + next[1]]);
        }
      }
    }
    totalDist = totalDist.map((v, i) => (v += dist[i]));
  }
  totalDist.forEach((v, i) => (totalDist[answer] > v ? (answer = i) : null));
  return answer + 1;
};

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const t = Number(input[0]);
let index = 1;
for (let i = 0; i < t; i++) {
  const [n, m] = input[index].split(" ").map(Number);
  index++;
  const path = {};
  for (let i = 0; i < m; i++) {
    let arr = input[index].split(" ").map(Number);
    path[arr[0]]
      ? path[arr[0]].push([arr[1], arr[2]])
      : (path[arr[0]] = [[arr[1], arr[2]]]);
    path[arr[1]]
      ? path[arr[1]].push([arr[0], arr[2]])
      : (path[arr[1]] = [[arr[0], arr[2]]]);
    index++;
  }
  const k = Number(input[index]);
  index++;
  const location = input[index].split(" ").map(Number);
  index++;

  console.log(findRoom(n, path, k, location));
}
