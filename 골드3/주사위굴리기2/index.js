const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M, K], ...map] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const dice = [6, 1, 2, 3, 5, 4]; // 하, 상, 북, 동, 남, 서
const move = (d) => {
  let temp = dice[0];
  if (d === 0) {
    // 북
    dice[0] = dice[2]; // 하 <- 북
    dice[2] = dice[1]; // 북 <- 상
    dice[1] = dice[4]; // 상 <- 남
    dice[4] = temp; // 남 <- 하
  } else if (d === 1) {
    // 동
    dice[0] = dice[3]; // 하 <- 동
    dice[3] = dice[1]; // 동 <- 상
    dice[1] = dice[5]; // 상 <- 서
    dice[5] = temp; // 서 <- 하
  } else if (d === 2) {
    // 남
    dice[0] = dice[4]; // 하 <- 남
    dice[4] = dice[1]; // 남 <- 상
    dice[1] = dice[2]; // 상 <- 북
    dice[2] = temp; // 북 <- 하
  } else {
    // 서
    dice[0] = dice[5]; // 하 <- 서
    dice[5] = dice[1]; // 서 <- 상
    dice[1] = dice[3]; // 상 <- 동
    dice[3] = temp; // 동 <- 하
  }
};
const dxy = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const BFS = (x, y) => {
  const num = map[x][y];
  const queue = [[x, y]];
  const visited = new Array(N).fill(null).map((_) => new Array(M).fill(false));
  visited[x][y] = true;
  let cnt = 0;
  while (queue.length) {
    cnt++;
    const now = queue.shift();
    for (let i = 0; i < 4; i++) {
      const [lx, ly] = [now[0] + dxy[i][0], now[1] + dxy[i][1]];
      if (lx < 0 || ly < 0 || lx >= N || ly >= M || visited[lx][ly]) continue;
      if (map[lx][ly] === num) {
        visited[lx][ly] = true;
        queue.push([lx, ly]);
      }
    }
  }

  return cnt * num;
};

let dIdx = 1;
let answer = 0;
let [x, y] = [0, 1];
for (let i = 0; i < K; i++) {
  move(dIdx);
  answer += BFS(x, y);

  if (dice[0] > map[x][y]) {
    // 90도
    dIdx = (dIdx + 1) % 4;
  } else if (dice[0] < map[x][y]) {
    // -90도
    dIdx = (dIdx + 3) % 4;
  }

  // 좌표 옮기기
  if (
    (dIdx === 0 && x === 0) ||
    (dIdx === 1 && y === M - 1) ||
    (dIdx === 2 && x === N - 1) ||
    (dIdx === 3 && y === 0)
  ) {
    dIdx = (dIdx + 2) % 4;
  }
  [x, y] = [x + dxy[dIdx][0], y + dxy[dIdx][1]];
}

console.log(answer);
