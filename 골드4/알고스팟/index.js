// 입력값 저장
// N과 M은 각각 n,m에 저장
// 이후 미로 배열은 maze에 저장
const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");

const [m, n] = input[0].split(" ").map(Number);
const maze = new Array(n);
for (let i = 1; i < input.length; i++) {
  maze[i - 1] = input[i].split("").map(Number);
}

// 특정 [n,m]에 도달할 때까지 부수는 벽의 최소 개수 저장
const minWall = new Array(n).fill(null).map(() => new Array(m).fill(-1));
minWall[0][0] = 0;
const queue = [];
queue.push([0, 0]);
// 현재 위치에서 4가지 방향
const dn = [1, -1, 0, 0];
const dm = [0, 0, 1, -1];

// BFS
while (queue.length > 0) {
  const now = queue.shift(); // 현재 위치
  for (let i = 0; i < 4; i++) {
    // 현재 위치에서 4가지 방향으로 이동한 위치
    const ln = now[0] + dn[i];
    const lm = now[1] + dm[i];
    // 어긋난 값이면 무시
    if (ln < 0 || lm < 0 || ln > n - 1 || lm > m - 1) continue;

    // 아직 방문하지 못한 곳을 방문한 경우
    if (minWall[ln][lm] === -1) {
      // 만약 이동한 위치가 1(벽)이면 직전 위치(now)에 1 더하기
      // 만약 이동한 위치가 0(빈 방)이면 직전 위치(now) 그대로
      minWall[ln][lm] = maze[ln][lm]
        ? minWall[now[0]][now[1]] + 1
        : minWall[now[0]][now[1]];
      queue.push([ln, lm]);
    }
    // 방문한 곳을 또 이동한 경우
    else {
      // 이동한 위치가 1(벽)인 경우
      if (maze[ln][lm]) {
        // 더 적은 수의 벽을 부순 경우
        // 이전에 방문했을 때의 부순 벽 수 > 이번에 이동했을 때의 부순 벽 수
        if (minWall[ln][lm] > minWall[now[0]][now[1]] + 1) {
          minWall[ln][lm] = minWall[now[0]][now[1]] + 1;
          queue.push([ln, lm]);
        }
      }
      // 이동한 위치가 0(빈 방)인 경우
      else {
        // 더 적은 수의 벽을 부순 경우
        // 이전에 방문했을 때의 부순 벽 수 > 이번에 이동했을 때의 부순 벽 수
        if (minWall[ln][lm] > minWall[now[0]][now[1]]) {
          minWall[ln][lm] = minWall[now[0]][now[1]];
          queue.push([ln, lm]);
        }
      }
    }
  }
}

console.log(minWall[n - 1][m - 1]);
