const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M, D], ..._board] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const game = (arr) => {
  const board = []; // 기존 배열의 row와 col 반대로
  let enemy = 0;
  for (let j = 0; j < M; j++) {
    let b = [];
    for (let i = 0; i < N; i++) {
      if (_board[i][j] === 1) enemy++;
      b.push(_board[i][j]);
    }
    board.push(b);
  }

  let attack = 0; // 처치 수
  let n = N;

  while (enemy > 0) {
    const min = [Infinity, Infinity, Infinity]; // 거리 최소
    const tar = [[], [], []]; // 최소 거리 적 좌표
    for (let d = 0; d < D; d++) {
      if (n - 1 - d < 0) continue;
      for (let i = 0; i < M; i++) {
        if (board[i][n - 1 - d]) {
          // 각 궁수별로
          for (let k = 0; k < 3; k++) {
            const dist = d + 1 + Math.abs(arr[k] - i);
            if (
              dist <= D &&
              (dist < min[k] || (dist === min[k] && i < tar[k][0]))
            ) {
              min[k] = dist;
              tar[k] = [i, n - 1 - d];
            }
          }
        }
      }
    }
    // 적 제거
    for (let i = 0; i < 3; i++) {
      if (tar[i].length > 0) {
        const [x, y] = tar[i];
        if (board[x][y] === 0) continue; // 같은 적이면 패스
        board[x][y] = 0;
        attack++;
        enemy--;
      }
    }
    // 적 이동
    for (let i = 0; i < M; i++) {
      if (board[i].pop()) {
        enemy--;
      }
    }
    n--;
  }

  return attack;
};

let answer = 0;

// 3개 뽑기 조합
const comb = (arr) => {
  const len = arr.length;
  if (len === 3) {
    // 게임 진행
    answer = Math.max(answer, game(arr));
    return;
  }
  for (let i = arr[len - 1] + 1; i < M; i++) {
    comb([...arr, i]);
  }
};

for (let i = 0; i < M - 2; i++) {
  comb([i]);
}

console.log(answer);
