const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const map = new Array(n);
let fish = 0;
let shark = [];
let sharkSize = 2;
let eatCount = 0;
let move = 0;
for (let i = 0; i < n; i++) {
  map[i] = input[i + 1].split(" ").map((val, idx) => {
    if (Number(val) === 9) {
      shark = [i, idx];
      return 0;
    } else if (Number(val) > 0) {
      fish++;
    }

    return Number(val);
  });
}

const findCanEat = () => {
  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];
  let queue = [shark];
  let newQueue = [];
  let visited = new Array(n).fill(null).map((_) => new Array(n).fill(false));
  visited[queue[0][0]][queue[0][1]] = true;
  let canEat = [];
  while (queue.length) {
    const [nx, ny] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const [lx, ly] = [nx + dx[i], ny + dy[i]];
      if (lx < 0 || lx >= n || ly < 0 || ly >= n || visited[lx][ly]) continue;
      if (map[lx][ly] <= sharkSize) {
        visited[lx][ly] = true;
        newQueue.push([lx, ly]);
        if (map[lx][ly] > 0 && map[lx][ly] < sharkSize) {
          canEat.push([lx, ly]);
        }
      }
    }

    if (queue.length === 0) {
      move++;
      if (canEat.length > 0) break;
      queue = [...newQueue];
      newQueue = [];
    }
  }

  return canEat;
};

let answer = 0;
if (fish > 0) {
  while (fish > 0) {
    let arr = findCanEat();
    if (arr.length === 0) {
      break;
    }

    arr.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    shark = arr[0];
    eatCount++;
    map[shark[0]][shark[1]] = 0;
    fish--;
    if (eatCount === sharkSize) {
      eatCount = 0;
      sharkSize++;
    }
    answer = move;
  }
}

console.log(answer);
