const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");

const test = Number(input[0]);
const gifts = new Array(test).fill(null).map((_) => new Array(3).fill(0));
for (let i = 1; i < input.length; i += 3) {
  const index = Math.floor((i - 1) / 3);
  gifts[index][0] = input[i].split(" ").map(Number);
  gifts[index][1] = input[i + 1].split(" ").map(Number);
  gifts[index][2] = input[i + 2].split(" ").map(Number);
}

// 3개의 상자가 나란히 있는 경우
const case1 = (gift) => {
  let min = Infinity;
  // 각 상자별로 가로 세로 변경하는 경우 총 6개
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        const w = gift[0][i] + gift[1][j] + gift[2][k];
        const h = Math.max(
          gift[0][i ? 0 : 1],
          gift[1][j ? 0 : 1],
          gift[2][k ? 0 : 1]
        );
        min = Math.min(w * h, min);
      }
    }
  }
  return min;
};

// 2개의 상자 위에 1개의 상자가 있는 경우
const case2 = (gift, up) => {
  let min = Infinity;
  // upGift는 위에 있는 상자
  // gift는 아래에 있는 상자
  const upGift = gift.splice(up, 1);

  // 각 상자별로 가로 세로 변경하는 경우 총 6개
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        const w = Math.max(gift[0][i] + gift[1][j], upGift[0][k]);
        const h =
          Math.max(gift[0][i ? 0 : 1], gift[1][j ? 0 : 1]) +
          upGift[0][k ? 0 : 1];
        min = Math.min(w * h, min);
      }
    }
  }
  return min;
};

// 각 테스트케이스별로 넓이 최소 구하기
for (let k = 0; k < test; k++) {
  let min = Infinity;
  const gift = gifts[k];
  min = Math.min(case1(gift), min);
  min = Math.min(case2([...gift], 0), min);
  min = Math.min(case2([...gift], 1), min);
  min = Math.min(case2([...gift], 2), min);
  console.log(min);
}
