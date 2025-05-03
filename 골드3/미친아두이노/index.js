const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[R, C], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v, i) => (i === 0 ? v.split(" ").map(Number) : v.split("")));

// 일반 아두이노 이동 루트 역순(추후 pop())
const move = data.pop().reverse().map(Number);
let robot = []; // 일반 아두이노 [i, j]
let crazy = []; // 미친 아두이노 [[i, j], [i, j], ...]
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (data[i][j] === "I") robot = [i, j];
    else if (data[i][j] === "R") crazy.push([i, j]);
  }
}

let isLose = false;
let count = 0;
const dxy = [
  [1, -1],
  [1, 0],
  [1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];
// 게임에서 지는 지 체크
// r끼리 좌표 차, c끼리 좌표 차 둘 다 1이하면 lose
const checkLose = () => {
  for (let i = 0; i < crazy.length; i++) {
    const [robotR, robotC] = robot;
    const [crazyR, crazyC] = crazy[i];
    if (Math.abs(robotR - crazyR) <= 1 && Math.abs(robotC - crazyC) <= 1) {
      return 1;
    }
  }
  return 0;
};
while (move.length) {
  // 일반 아두이노 이동
  const nowMove = move.pop() - 1;
  robot = [robot[0] + dxy[nowMove][0], robot[1] + dxy[nowMove][1]];
  count++;

  // 게임에서 지는 지 체크
  if (checkLose()) {
    isLose = true;
    break;
  }

  // 미친 아두이노 이동
  const [robotR, robotC] = robot;
  const crazyLen = crazy.length;
  const crazyObj = {};
  for (let i = 0; i < crazyLen; i++) {
    let [crazyR, crazyC] = crazy[i];

    const dx = crazyR - robotR > 0 ? -1 : crazyR - robotR === 0 ? 0 : 1;
    const dy = crazyC - robotC > 0 ? -1 : crazyC - robotC === 0 ? 0 : 1;
    crazy[i] = [crazyR + dx, crazyC + dy];
    crazyObj[`${crazy[i][0]}-${crazy[i][1]}`] =
      (crazyObj[`${crazy[i][0]}-${crazy[i][1]}`] || 0) + 1;
  }

  // 미친 아두이노 같은 칸 여부 체크
  crazy = crazy.filter((v) => crazyObj[`${v[0]}-${v[1]}`] === 1);
}

if (isLose) {
  console.log(`kraj ${count}`);
} else {
  const answer = new Array(R).fill(null).map((_) => new Array(C).fill("."));
  answer[robot[0]][robot[1]] = "I";
  for (let i = 0; i < crazy.length; i++) {
    answer[crazy[i][0]][crazy[i][1]] = "R";
  }
  console.log(answer.map((v) => v.join("")).join("\n"));
}
