class MinHeap {
  constructor() {
    this.heap = [];
  }
  add(v) {
    this.heap.push(v);
    this.bubbleUp(v);
  }
  bubbleUp() {
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (
      parIdx >= 0 &&
      (this.heap[parIdx][1] > this.heap[curIdx][1] ||
        (this.heap[parIdx][1] === this.heap[curIdx][1] &&
          this.heap[parIdx][0] > this.heap[curIdx][0]))
    ) {
      [this.heap[parIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[parIdx],
      ];
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  shift() {
    if (this.heap.length === 0) return null;
    let val = this.heap[0];
    let last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }

    return val;
  }
  bubbleDown() {
    let curIdx = 0;
    let [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    while (
      (this.heap[leftIdx] &&
        (this.heap[leftIdx][1] < this.heap[curIdx][1] ||
          (this.heap[leftIdx][1] === this.heap[curIdx][1] &&
            this.heap[leftIdx][0] < this.heap[curIdx][0]))) ||
      (this.heap[rightIdx] &&
        (this.heap[rightIdx][1] < this.heap[curIdx][1] ||
          (this.heap[rightIdx][1] === this.heap[curIdx][1] &&
            this.heap[rightIdx][0] < this.heap[curIdx][0])))
    ) {
      let smallIdx = leftIdx;
      if (
        this.heap[rightIdx] &&
        this.heap[rightIdx][1] < this.heap[leftIdx][1]
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
}

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], ...T] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const heap = new MinHeap();
for (let i = 0; i < N; i++) {
  heap.add(T[i]);
}

const waiting = new MinHeap();
const timeTable = new Array(200001).fill(-1);
let answer = 0;
let t = 1;
let n = N;
while (n) {
  let checkEntry = false;
  // 도착 예정 손님들
  while (heap.heap.length > 0 && heap.heap[0][1] <= t) {
    const [t1, t2] = heap.shift();
    // 현재 시간이 예약 시간인 손님은 입장
    if (t1 === t) {
      checkEntry = true;
    }
    // 예약 시간보다 늦게 온 손님은 웨이팅
    else if (t1 < t) {
      waiting.add([t1, t2]);
    }
    // 예약 시간보다 일찍 온 손님은 예약 시간에 맞춰 입장하기 위해 체크
    else {
      timeTable[t1] = t2;
      waiting.add([t1, t2]);
    }
  }

  // 손님 입장했으면 바로 1시간 후
  if (checkEntry) {
    t++;
    n--;
    continue;
  }
  // 입장한 손님이 없다면 대기줄에서 입장
  // 그 전에 지금 예약 시간이지만 일찍 온 손님이 있다면 먼저 입장
  if (timeTable[t] > -1) {
    answer = Math.max(t - timeTable[t], answer);
    timeTable[t] = -2;
    t++;
    n--;
    continue;
  }

  let t1 = 0,
    t2 = 0;
  while (waiting.heap.length > 0) {
    [t1, t2] = waiting.shift();
    // 예약 시간보다 일찍와서 이미 예약시간에 빠져나갔으면
    if (timeTable[t1] == -2) continue;
    else break;
  }
  if (t1 !== 0) {
    answer = Math.max(t - t2, answer);
    timeTable[t1] = -2;
    t++;
    n--;
  } else {
    if (heap.heap.length > 0) {
      t = heap.heap[0][1]; // 웨이팅이 아무도 없으면 다음 t까지 도약
    } else {
      t++;
    }
  }
}

console.log(answer);
