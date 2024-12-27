// MinHeap, Dijkstra
const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");

const [n, m, x] = input[0].split(" ").map(Number);
const distance = Array.from({ length: n }, () => []);
const reDistance = Array.from({ length: n }, () => []);
for (let i = 1; i < input.length; i++) {
  const data = input[i].split(" ").map(Number);
  distance[data[0] - 1].push([data[1], data[2]]);
  reDistance[data[1] - 1].push([data[0], data[2]]);
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
  add(to, value) {
    this.heap.push([to, value]);
    this.bubbleUp();
  }
  bubbleUp() {
    let curIdx = this.size() - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[curIdx][1] < this.heap[parIdx][1]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
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

const getMinAnswer = (distance) => {
  const heap = new MinHeap();
  const start = [x, 0];
  const answer = new Array(n).fill(Infinity);
  const isVisited = new Array(n).fill(false);
  heap.add(...start);
  answer[start[0] - 1] = 0;
  while (heap.size() > 0) {
    let now = heap.shift();

    if (isVisited[now[0] - 1] === true) continue;
    isVisited[now[0] - 1] = true;

    let arr = distance[now[0] - 1];
    for (let i = 0; i < arr.length; i++) {
      if (answer[arr[i][0] - 1] > now[1] + arr[i][1]) {
        answer[arr[i][0] - 1] = now[1] + arr[i][1];
        heap.add(arr[i][0], answer[arr[i][0] - 1]);
      }
    }
  }

  return answer;
};

let answer1 = getMinAnswer(distance);
let answer2 = getMinAnswer(reDistance);
let answer = answer1.map((v, i) => v + answer2[i]);
console.log(Math.max(...answer));
