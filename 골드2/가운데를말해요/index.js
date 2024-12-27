class Heap {
  constructor() {
    this.lheap = [];
    this.middle = null;
    this.rheap = [];
  }
  swap(heap, idx1, idx2) {
    [heap[idx1], heap[idx2]] = [heap[idx2], heap[idx1]];
  }
  add(val) {
    const lsize = this.lheap.length;
    const rsize = this.rheap.length;
    if (this.middle === null) {
      this.middle = val;
    } else if (lsize === rsize) {
      if (val <= this.middle) {
        this.rheap.push(this.middle);
        this.rightBubbleUp();
        if (lsize === 0 || val > this.lheap[0]) {
          this.middle = val;
        } else {
          this.middle = this.lheap[0];
          this.lheap[0] = val;
          this.leftBubbleDown();
        }
      } else {
        this.rheap.push(val);
        this.rightBubbleUp();
      }
    } else {
      if (lsize > rsize) {
        if (val <= this.middle) {
          this.rheap.push(this.middle);
          this.rightBubbleUp();

          if (val < this.lheap[0]) {
            this.middle = this.lheap[0];
            this.lheap[0] = val;
            this.leftBubbleDown();
          } else {
            this.middle = val;
          }
        } else {
          this.rheap.push(val);
          this.rightBubbleUp();
        }
      } else {
        if (val <= this.middle) {
          this.lheap.push(val);
          this.leftBubbleUp();
        } else {
          this.lheap.push(this.middle);
          this.leftBubbleUp();

          if (val > this.rheap[0]) {
            this.middle = this.rheap[0];
            this.rheap[0] = val;
            this.rightBubbleDown();
          } else {
            this.middle = val;
          }
        }
      }
    }
  }
  leftBubbleUp() {
    let curIdx = this.lheap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (
      this.lheap[parIdx] !== undefined &&
      this.lheap[parIdx] < this.lheap[curIdx]
    ) {
      this.swap(this.lheap, curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }
  rightBubbleUp() {
    let curIdx = this.rheap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (
      this.rheap[parIdx] !== undefined &&
      this.rheap[parIdx] > this.rheap[curIdx]
    ) {
      this.swap(this.rheap, curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }

  leftBubbleDown() {
    let curIdx = 0;
    let [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    while (
      (this.lheap[leftIdx] !== undefined &&
        this.lheap[leftIdx] > this.lheap[curIdx]) ||
      (this.lheap[rightIdx] !== undefined &&
        this.lheap[rightIdx] > this.lheap[curIdx])
    ) {
      let bigIdx = leftIdx;
      if (
        this.lheap[rightIdx] !== undefined &&
        this.lheap[rightIdx] > this.lheap[leftIdx]
      ) {
        bigIdx = rightIdx;
      }
      this.swap(this.lheap, curIdx, bigIdx);
      curIdx = bigIdx;
      [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    }
  }
  rightBubbleDown() {
    let curIdx = 0;
    let [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    while (
      (this.rheap[leftIdx] !== undefined &&
        this.rheap[leftIdx] < this.rheap[curIdx]) ||
      (this.rheap[rightIdx] !== undefined &&
        this.rheap[rightIdx] < this.rheap[curIdx])
    ) {
      let smallIdx = leftIdx;
      if (
        this.rheap[rightIdx] !== undefined &&
        this.rheap[rightIdx] < this.rheap[leftIdx]
      ) {
        smallIdx = rightIdx;
      }
      this.swap(this.rheap, curIdx, smallIdx);
      curIdx = smallIdx;
      [leftIdx, rightIdx] = [curIdx * 2 + 1, curIdx * 2 + 2];
    }
  }
}

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const heap = new Heap();
const answer = [];
for (let i = 0; i < n; i++) {
  heap.add(Number(input[i + 1]));
  answer.push(heap.middle);
}

console.log(answer.join("\n"));
