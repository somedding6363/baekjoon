class MaxHeap {
  constructor() {
    this.heap = [];
  }
  add(val) {
    this.heap.push(val);
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (parIdx >= 0 && this.heap[parIdx][1] < this.heap[curIdx][1]) {
      [this.heap[parIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[parIdx],
      ];
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    if (!this.heap.length) return null;
    const val = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = last;
      let curIdx = 0;
      let [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
      while (
        (this.heap[leftIdx] && this.heap[leftIdx][1] > this.heap[curIdx][1]) ||
        (this.heap[rightIdx] && this.heap[rightIdx][1] > this.heap[curIdx][1])
      ) {
        let smallIdx = leftIdx;
        if (
          this.heap[rightIdx] &&
          this.heap[rightIdx][1] > this.heap[leftIdx][1]
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
const [[N, M], ...arr] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [fa, fb] = arr.pop();
let bridge = [...new Array(N + 1)].map((_) => []);
arr.forEach((v) => {
  bridge[v[0]].push([v[1], v[2]]);
  bridge[v[1]].push([v[0], v[2]]);
});

const heap = new MaxHeap();
bridge[fa].forEach((v) => {
  heap.add(v);
});

let answer = Infinity;
const visited = new Array(N + 1).fill(false);
visited[fa] = true;
while (heap.heap.length) {
  const now = heap.shift();
  answer = Math.min(answer, now[1]);
  if (now[0] === fb) {
    console.log(answer);
    break;
  }
  visited[now[0]] = true;
  bridge[now[0]].forEach((v) => {
    if (!visited[v[0]]) {
      heap.add(v);
    }
  });
}

// const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const input = require("fs").readFileSync(file).toString().trim().split("\n");
// const [n, m] = input[0].split(" ").map(Number);
// const bridge = Array.from({ length: n }, () => []);
// for (let i = 1; i < input.length - 1; i++) {
//   let b = input[i].split(" ").map(Number);
//   bridge[b[0] - 1].push([b[1], b[2]]);
//   bridge[b[1] - 1].push([b[0], b[2]]);
// }
// const [start, end] = input[input.length - 1].split(" ").map(Number);

// class MaxHeap {
//   constructor() {
//     this.node = [];
//   }
//   size() {
//     return this.node.length;
//   }
//   swap(i1, i2) {
//     [this.node[i1], this.node[i2]] = [this.node[i2], this.node[i1]];
//   }
//   add(value) {
//     this.node.push(value);
//     this.bubbleUp();
//   }
//   bubbleUp() {
//     let curId = this.node.length - 1;
//     let parId = Math.floor((curId - 1) / 2);
//     while (this.node[parId] && this.node[parId][2] < this.node[curId][2]) {
//       this.swap(curId, parId);
//       curId = parId;
//       parId = Math.floor((curId - 1) / 2);
//     }
//   }
//   shift() {
//     let value = this.node[0];
//     if (this.size() === 1) {
//       this.node.pop();
//     } else {
//       this.node[0] = this.node.pop();
//       this.bubbleDown();
//     }

//     return value;
//   }
//   bubbleDown() {
//     let curId = 0;
//     let leftId = 2 * curId + 1;
//     let rightId = 2 * curId + 2;
//     while (
//       (this.node[leftId] && this.node[leftId][2] > this.node[curId][2]) ||
//       (this.node[rightId] && this.node[rightId][2] > this.node[curId][2])
//     ) {
//       let bigId = leftId;
//       if (this.node[rightId] && this.node[leftId][2] < this.node[rightId][2]) {
//         bigId = rightId;
//       }

//       this.swap(curId, bigId);
//       curId = bigId;
//       leftId = 2 * curId + 1;
//       rightId = 2 * curId + 2;
//     }
//   }
// }

// const heap = new MaxHeap();
// heap.add([start, start, 0]);
// const weight = new Array(n).fill(Infinity);
// const visited = new Array(n).fill(false);

// while (heap.size()) {
//   let now = heap.shift();
//   if (now[1] === end) {
//     console.log(weight[now[1] - 1]);
//     break;
//   }
//   visited[now[1] - 1] = true;
//   let next = bridge[now[1] - 1];
//   for (let i = 0; i < next.length; i++) {
//     if (visited[next[i][0] - 1]) continue;

//     if (weight[next[i][0] - 1] !== Infinity) {
//       if (weight[next[i][0] - 1] < Math.min(weight[now[1] - 1], next[i][1])) {
//         weight[next[i][0] - 1] = Math.min(weight[now[1] - 1], next[i][1]);
//         heap.add([now[1], ...next[i]]);
//       }
//     } else {
//       weight[next[i][0] - 1] = Math.min(weight[now[1] - 1], next[i][1]);
//       heap.add([now[1], ...next[i]]);
//     }
//   }
// }
