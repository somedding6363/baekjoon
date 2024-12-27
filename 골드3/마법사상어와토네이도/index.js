const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const map = new Array(n);
for (let i = 0; i < n; i++) {
  map[i] = input[i + 1].split(" ").map(Number);
}

const dir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
// [x방향, y방향, 퍼센트], a제외
const move = [
  [
    [-1, 1, 1],
    [1, 1, 1],
    [-2, 0, 2],
    [2, 0, 2],
    [0, -2, 5],
    [-1, 0, 7],
    [1, 0, 7],
    [-1, -1, 10],
    [1, -1, 10],
  ],
  [
    [-1, -1, 1],
    [-1, 1, 1],
    [0, -2, 2],
    [0, 2, 2],
    [2, 0, 5],
    [0, -1, 7],
    [0, 1, 7],
    [1, -1, 10],
    [1, 1, 10],
  ],
  [
    [-1, -1, 1],
    [1, -1, 1],
    [-2, 0, 2],
    [2, 0, 2],
    [0, 2, 5],
    [-1, 0, 7],
    [1, 0, 7],
    [-1, 1, 10],
    [1, 1, 10],
  ],
  [
    [-1, -1, 10],
    [-1, 1, 10],
    [0, -2, 2],
    [0, 2, 2],
    [-2, 0, 5],
    [0, -1, 7],
    [0, 1, 7],
    [1, -1, 1],
    [1, 1, 1],
  ],
];

const half = Math.floor(n / 2);
let now = [half, half];
let count = 1; // 방향 유지 최대횟수
let dirCnt = 0; // 방향 유지 횟수
let dirIdx = 0; // 방향
let answer = 0;
while (!(now[0] === 0 && now[1] === 0)) {
  const lx = now[0] + dir[dirIdx][0];
  const ly = now[1] + dir[dirIdx][1];
  const sand = map[lx][ly];
  let restSand = sand;

  for (let i = 0; i < 9; i++) {
    // 모래가 이동할 좌표
    const mx = lx + move[dirIdx][i][0];
    const my = ly + move[dirIdx][i][1];
    // 이동할 모래 양
    const moveSand = Math.floor((sand * move[dirIdx][i][2]) / 100);
    // 밖으로 나가면 answer, 아니면 모래 누적
    if (mx < 0 || mx >= n || my < 0 || my >= n) {
      answer += moveSand;
    } else {
      map[mx][my] += moveSand;
    }

    restSand -= moveSand;
  }

  // 남은 모래 -> a
  const rx = lx + dir[dirIdx][0];
  const ry = ly + dir[dirIdx][1];
  if (rx < 0 || rx >= n || ry < 0 || ry >= n) {
    answer += restSand;
  } else {
    map[rx][ry] += restSand;
  }

  dirCnt++;

  // 방향 전환
  if (dirCnt === count) {
    dirIdx = (dirIdx + 1) % 4;
    if (dirIdx === 0 || dirIdx === 2) count++;
    dirCnt = 0;
  }

  now = [lx, ly];
}

console.log(answer);
