class MinHeap {
  constructor() {
    this.heap = [];
  }
  add(val) {
    this.heap.push(val);
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[curIdx] < this.heap[parIdx]) {
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
      let curIdx = 0;
      let [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
      while (
        (this.heap[leftIdx] && this.heap[leftIdx] < this.heap[curIdx]) ||
        (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[curIdx])
      ) {
        let smallIdx = leftIdx;
        if (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[leftIdx]) {
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
const [[T], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

let answer = [];
for (let i = 0; i < 2 * T; i++) {
  const [K] = data[i++];
  const file = data[i];

  // 파일 크기대로 min heap에 저장
  const heap = new MinHeap();
  for (let f of file) {
    heap.add(f);
  }

  // min heap에서 차례로 꺼내면서 계산하고
  // 계산된 값을 다시 넣기
  // 최종 하나 남을 때까지 계속
  let _answer = 0;
  while (heap.heap.length > 1) {
    const a = heap.shift();
    const b = heap.shift();
    heap.add(a + b);
    _answer += a + b;
  }

  answer.push(_answer);
}

console.log(answer.join("\n"));
