const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const v = Number(input[0].split(" ")[0]);
const e = Number(input[0].split(" ")[1]);
const start = Number(input[1]);
const graph = new Array(v);
for (let i = 0; i < v; i++) {
  graph[i] = [];
}
for (let i = 2; i < input.length; i++) {
  let arr = input[i].split(" ").map(Number);
  graph[arr[0] - 1].push([arr[1], arr[2]]);
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
    let index = this.heap.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (
      this.heap[parentIndex] &&
      this.heap[index][1] < this.heap[parentIndex][1]
    ) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  shift() {
    const value = this.heap[0];
    if (this.size() === 1) {
      this.heap.pop();
    } else {
      this.heap[0] = this.heap.pop();
      this.bubbleDown();
    }

    return value;
  }
  bubbleDown() {
    let index = 0;
    let leftIndex = 2 * index + 1;
    let rightIndex = 2 * index + 2;
    while (
      (this.heap[leftIndex] && this.heap[leftIndex][1] < this.heap[index][1]) ||
      (this.heap[rightIndex] && this.heap[rightIndex][1] < this.heap[index][1])
    ) {
      let smallValueIndex = leftIndex;
      if (
        this.heap[rightIndex] &&
        this.heap[leftIndex][1] > this.heap[rightIndex][1]
      ) {
        smallValueIndex = rightIndex;
      }

      this.swap(index, smallValueIndex);
      index = smallValueIndex;
      leftIndex = 2 * index + 1;
      rightIndex = 2 * index + 2;
    }
  }
}

const heap = new MinHeap();
heap.add([start, 0]);
const answer = new Array(v).fill(Infinity);
const isVisited = new Array(v).fill(false);

answer[start - 1] = 0;
while (heap.size() > 0) {
  let now = heap.shift();

  if (isVisited[now[0] - 1]) continue;
  else {
    isVisited[now[0] - 1] = true;

    let arr = graph[now[0] - 1];
    for (let i = 0; i < arr.length; i++) {
      if (answer[arr[i][0] - 1] > now[1] + arr[i][1]) {
        answer[arr[i][0] - 1] = now[1] + arr[i][1];
        heap.add([arr[i][0], now[1] + arr[i][1]]);
      }
    }
  }
}

answer.forEach((v, i) => {
  if (v === 0) console.log(v);
  else if (v === Infinity) console.log("INF");
  else console.log(v);
});
