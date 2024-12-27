const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const map = new Array(n);
const color = {};
for (let i = 1; i < input.length; i++) {
  map[i - 1] = input[i].split("").map((v) => v.charCodeAt() - 65);
  map[i - 1].forEach((val, idx) =>
    color[val] ? color[val].push([i - 1, idx]) : (color[val] = [[i - 1, idx]])
  );
}

const parent = new Array(n).fill(null).map((_) => new Array(m).fill(null));
const getParent = (nowx, nowy) => {
  const [px, py] = parent[nowx][nowy];
  if (px === nowx && py === nowy) {
    return [nowx, nowy];
  } else {
    return getParent(px, py);
  }
};

const findCycle = () => {
  for (let i in color) {
    const nowColor = color[i];
    for (let j = 0; j < nowColor.length; j++) {
      const [x, y] = nowColor[j];
      const [leftx, lefty] = [x, y - 1];
      const [topx, topy] = [x - 1, y];
      let leftParent = [];
      let topParent = [];
      if (lefty >= 0 && map[leftx][lefty] === Number(i)) {
        leftParent = getParent(leftx, lefty);
      }
      if (topx >= 0 && map[topx][topy] === Number(i)) {
        topParent = getParent(topx, topy);
      }

      if (leftParent.length && topParent.length) {
        if (leftParent[0] === topParent[0] && leftParent[1] === topParent[1]) {
          return true;
        }
        if (
          leftParent[0] < topParent[0] ||
          (leftParent[0] === topParent[0] && leftParent[1] < topParent[1])
        ) {
          parent[topParent[0]][topParent[1]] = leftParent;
          parent[x][y] = leftParent;
        } else {
          parent[leftParent[0]][leftParent[1]] = topParent;
          parent[x][y] = topParent;
        }
      } else if (leftParent.length || topParent.length) {
        if (leftParent.length) {
          parent[x][y] = [...parent[leftx][lefty]];
        } else {
          parent[x][y] = [...parent[topx][topy]];
        }
      } else {
        parent[x][y] = [x, y];
      }
    }
  }
  return false;
};

console.log(findCycle() ? "Yes" : "No");
