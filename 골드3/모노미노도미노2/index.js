const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

// t = 1: 크기가 1×1인 블록을 (x, y)에 놓은 경우
// t = 2: 크기가 1×2인 블록을 (x, y), (x, y+1)에 놓은 경우
// t = 3: 크기가 2×1인 블록을 (x, y), (x+1, y)에 놓은 경우
const green = new Array(4).fill(null).map((_) => new Array(6).fill(false));
const blue = new Array(4).fill(null).map((_) => new Array(6).fill(false));
let score = 0; // 얻은 점수
let count = 0; // green, blue에 있는 블록 수

// 채워진 줄 지우기
// 첫 번째 인자는 green or blue
// 두 번째 인자는 비교할 라인 배열
const eraseLine = (board, lineIdx) => {
  for (let i of lineIdx.reverse()) {
    let fullCnt = 0;
    for (let j = 0; j < 4; j++) {
      if (board[j][i]) {
        fullCnt++;
      }
    }
    // 한 줄이 다 채워졌으면
    if (fullCnt === 4) {
      count -= 4;
      score++;
      for (let j = 0; j < 4; j++) {
        board[j].splice(i, 1);
        board[j].push(false);
      }
    }
  }
};

// 연한 칸 처리
// 첫 번째 인자는 green or blue
const handleLight = (board) => {
  while (true) {
    let inLine = false;
    for (let i = 0; i < 4; i++) {
      // 4번째 줄에 블록이 있을 때
      if (board[i][4]) {
        inLine = true;
        break;
      }
    }
    // 4번쨰 줄에 블록이 없을 때
    if (!inLine) break;
    // 4번째 줄에 블록이 있을 때
    for (let i = 0; i < 4; i++) {
      // 블록을 없애면 count -= 1
      count -= board[i].shift() ? 1 : 0;
      board[i].push(false);
    }
  }
};

// 블록 놓기
const move = (t, x, y) => {
  let gIdx = green[y].lastIndexOf(true) + 1;
  let bIdx = blue[x].lastIndexOf(true) + 1;
  // ㅁ
  if (t === 1) {
    green[y][gIdx] = true;
    blue[x][bIdx] = true;
    count += 2;
  }
  // ㅁㅁ
  else if (t === 2) {
    gIdx = Math.max(gIdx, green[y + 1].lastIndexOf(true) + 1);
    green[y][gIdx] = true;
    green[y + 1][gIdx] = true;

    blue[x][bIdx] = true;
    blue[x][bIdx + 1] = true;

    count += 4;
  }
  // ㅁ
  // ㅁ
  else if (t === 3) {
    green[y][gIdx] = true;
    green[y][gIdx + 1] = true;

    bIdx = Math.max(bIdx, blue[x + 1].lastIndexOf(true) + 1);
    blue[x][bIdx] = true;
    blue[x + 1][bIdx] = true;

    count += 4;
  }

  // 채워진 줄 지우기
  eraseLine(green, t === 3 ? [gIdx, gIdx + 1] : [gIdx]);
  eraseLine(blue, t === 2 ? [bIdx, bIdx + 1] : [bIdx]);

  // 연한 칸 처리
  if ((t === 3 && gIdx + 1 >= 4) || gIdx >= 4) handleLight(green);
  if ((t === 2 && bIdx + 1 >= 4) || bIdx >= 4) handleLight(blue);
};
for (let i = 0; i < N; i++) {
  // 블록 놓기
  move(...data[i]);
}

console.log(score + `\n` + count);
