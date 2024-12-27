// 입력값 저장
// N은 n에 저장하고 나머지 4개 값은 순서대로 p배열에 저장
const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split(" ");

const n = Number(input[0]);
const p = new Array(4); // [동쪽, 서쪽, 남쪽, 북쪽] 각각 이동할 확률
for (let i = 1; i < input.length; i++) {
  p[i - 1] = Number(input[i]);
}

// 이동한 경로를 저장하기 위한 배열
// 이동한 경로는 1, 이동하지 않은 경로는 0
// 최대 n번 이동 가능하기 때문에 2n+1 * 2n+1
const board = new Array(2 * n + 1)
  .fill(null)
  .map(() => new Array(2 * n + 1).fill(0));

const start = [n, n];
board[start[0]][start[1]] = 1;
// 현재 위치에서 4가지 방향
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
// 전체 확률
let totalP = 0;

// dfs
const dfs = (count, now, prob) => {
  // 단순한 경우 count가 0까지 줄어듦
  if (count === 0) {
    totalP += prob; // 전체 확률 + 현재 경로의 확률
    return;
  }

  for (let i = 0; i < 4; i++) {
    // 각 방향에 확률이 0이면 끝
    if (i === 0 && p[0] === 0) continue;
    else if (i === 1 && p[1] === 0) continue;
    else if (i === 2 && p[2] === 0) continue;
    else if (i === 3 && p[3] === 0) continue;
    else {
      // 현재 위치에서 4가지 방향으로 이동한 위치
      const lx = now[0] + dx[i];
      const ly = now[1] + dy[i];
      // 만약 아직 이동하지 않은 곳이라면 이동하기
      if (board[lx][ly] === 0) {
        board[lx][ly] = 1;
        dfs(count - 1, [lx, ly], (prob * p[i]) / 100);
        board[lx][ly] = 0;
      }
    }
  }
};

dfs(n, start, 1);

console.log(totalP);
