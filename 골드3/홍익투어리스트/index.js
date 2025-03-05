class TreeSet {
  constructor() {
    this.data = [];
  }

  binarySearch(x) {
    let s = 0;
    let e = this.data.length; // e는 길이 그대로 유지
    while (s < e) {
      let m = Math.floor((s + e) / 2);
      if (this.data[m] < x) {
        s = m + 1;
      } else {
        e = m; // e = m (m을 포함)
      }
    }

    return s; // x 이상의 첫 번째 위치 반환
  }

  add(x) {
    const i = this.binarySearch(x);
    if (i < this.data.length && this.data[i] === x) return false;
    this.data.splice(i, 0, x);
    return true;
  }

  remove(x) {
    const i = this.binarySearch(x);
    if (i < this.data.length && this.data[i] === x) {
      this.data.splice(i, 1);
      return true;
    }
    return false;
  }

  has(x) {
    const i = this.binarySearch(x);
    return i < this.data.length && this.data[i] === x;
  }

  lowerBound(x) {
    const i = this.binarySearch(x);
    return i < this.data.length ? this.data[i] : this.data[0];
  }
}

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, Q], place, ...query] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

let answer = [];
let now = 0;
const treeSet = new TreeSet();
for (let i = 0; i < N; i++) {
  if (place[i] === 1) treeSet.add(i);
}

for (let i = 0; i < Q; i++) {
  if (query[i][0] === 3) {
    // 명소까지 최소 거리(시계방향)
    if (treeSet.data.length === 0) {
      answer.push(-1);
      continue;
    }
    if (treeSet.has(now)) {
      answer.push(0);
      continue;
    }
    let index = treeSet.lowerBound(now);
    if (index < now) {
      answer.push(N - now + index);
    } else {
      answer.push(index - now);
    }
  } else if (query[i][0] === 2) {
    // 이동
    now = (now + query[i][1]) % N;
  } else if (query[i][0] === 1) {
    // 명소 전환
    if (treeSet.has(query[i][1] - 1)) {
      treeSet.remove(query[i][1] - 1);
    } else {
      treeSet.add(query[i][1] - 1);
    }
  }
}
console.log(answer.join("\n"));
