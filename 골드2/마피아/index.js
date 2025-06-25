const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[N], G, ...R] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const EUN = R.pop()[0];

// 밤
const night = (nightCnt) => {
  const _G = [...G];
  // i인 사람을 죽였을 때
  for (let i = 0; i < N; i++) {
    if (i === EUN || G[i] === null) continue;

    G = G.map((g, idx) => (g !== null ? g + R[i][idx] : null));
    G[i] = null;
    liveCnt--;
    dfs(nightCnt + 1);
    G = [..._G]; // 백트래킹\
    liveCnt++;
  }
};
// 낮
const day = (nightCnt) => {
  let max = 0;
  let maxIdx = -1;
  for (let i = 0; i < G.length; i++) {
    if (G[i] !== null) {
      if (G[i] > max) {
        max = G[i];
        maxIdx = i;
      }
    }
  }

  // 유죄 지수가 가장 높은 한 명 죽이기
  const temp = G[maxIdx];
  G[maxIdx] = null;
  liveCnt--;
  dfs(nightCnt);
  G[maxIdx] = temp; // 백트래킹
  liveCnt++;
};

let liveCnt = N;
let answer = 0;
const dfs = (nightCnt) => {
  // 종료 -> 은진이가 죽거나 은진이만 남거나
  if (G[EUN] === null || G.filter((v) => v !== null).length === 1) {
    answer = Math.max(answer, nightCnt);
    return;
  }
  // 밤이면
  if (liveCnt % 2 === 0) {
    night(nightCnt);
  }
  // 낮이면
  else {
    day(nightCnt);
  }
};
dfs(0);
console.log(answer);
