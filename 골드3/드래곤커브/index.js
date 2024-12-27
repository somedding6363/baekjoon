const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const map = new Array(200).fill(null).map((_) => new Array(200).fill(0));
const dragon = new Array(n);
for (let i = 0; i < n; i++) {
  dragon[i] = input[i + 1].split(" ").map(Number);
}

//100, 100에서 d = 0 일 때 드래곤 커브
// 0 -> (0, 0), (0, 1)
// 1 -> (0, 0), (0, 1), (-1, 1)
// 2 -> (0, 0), (0, 1), (-1, 1), (-1, 0), (-2, 0)
// 3 -> (0, 0), (0, 1), (-1, 1), (-1, 0), (-2, 0), (-2, -1), (-1, -1), (-1, -2), (-2, -2)

// d = 1 일 때 드래곤 커브
// d = 0 인 경우에 x, y를 바꾼 뒤 x에만 -

// d = 2 일 때 드래곤 커브
// d = 0 인 경우에 x, y 둘 다 -

// d = 3 일 때 드래곤 커브
// d = 0 인 경우에 x, y를 바꾼 뒤 y에만 -

const dp = new Array(11).fill(null);
dp[0] = [
  [0, 0],
  [0, 1],
];
for (let i = 1; i <= 10; i++) {
  const prev = dp[i - 1];
  dp[i] = [...prev];
  const centerIdx = prev.length - 1;
  for (let j = centerIdx - 1; j >= 0; j--) {
    const diffX = prev[centerIdx][0] - prev[j][0];
    const diffY = prev[centerIdx][1] - prev[j][1];
    dp[i].push([prev[centerIdx][0] - diffY, prev[centerIdx][1] + diffX]);
  }
}

for (let i = 0; i < n; i++) {
  const [x, y, d, g] = dragon[i];
  const nowDp = dp[g];
  for (let j = 0; j < nowDp.length; j++) {
    if (d === 0) {
      map[y + nowDp[j][0]][x + nowDp[j][1]]++;
    } else if (d === 1) {
      map[y - nowDp[j][1]][x + nowDp[j][0]]++;
    } else if (d === 2) {
      map[y - nowDp[j][0]][x - nowDp[j][1]]++;
    } else if (d === 3) {
      map[y + nowDp[j][1]][x - nowDp[j][0]]++;
    }
  }
}

let answer = 0;
for (let i = 1; i < 200; i++) {
  for (let j = 1; j < 200; j++) {
    if (
      map[i - 1][j - 1] > 0 &&
      map[i - 1][j] > 0 &&
      map[i][j - 1] > 0 &&
      map[i][j] > 0
    )
      answer++;
  }
}
console.log(answer);
