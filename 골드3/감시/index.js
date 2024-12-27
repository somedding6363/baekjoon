const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const map = new Array(n).fill(null);
const cctv = [];
for (let i = 0; i < n; i++) {
  map[i] = input[i + 1].split(" ").map((val, idx) => {
    if (Number(val) > 0 && Number(val) < 6) cctv.push([i, idx, Number(val)]);
    return Number(val);
  });
}

let answer = Infinity;
const findBlind = () => {
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === 0) count++;
    }
  }
  answer = Math.min(answer, count);
};

const setLine = (x, y, dir, temp) => {
  if (dir === 0) {
    for (let i = x - 1; i >= 0; i--) {
      if (map[i][y] === 6) break;
      else if (map[i][y] <= 0) map[i][y] += temp;
    }
  } else if (dir === 1) {
    for (let j = y + 1; j < m; j++) {
      if (map[x][j] === 6) break;
      else if (map[x][j] <= 0) map[x][j] += temp;
    }
  } else if (dir === 2) {
    for (let i = x + 1; i < n; i++) {
      if (map[i][y] === 6) break;
      else if (map[i][y] <= 0) map[i][y] += temp;
    }
  } else if (dir === 3) {
    for (let j = y - 1; j >= 0; j--) {
      if (map[x][j] === 6) break;
      else if (map[x][j] <= 0) map[x][j] += temp;
    }
  }
};

const dfs = (index) => {
  if (index === cctv.length) {
    findBlind();
    return;
  }
  const [cctvX, cctvY, cctvN] = cctv[index];
  if (cctvN === 1) {
    for (let i = 0; i < 4; i++) {
      setLine(cctvX, cctvY, i, -1);
      dfs(index + 1);
      setLine(cctvX, cctvY, i, 1);
    }
  } else if (cctvN === 2) {
    for (let i = 0; i < 2; i++) {
      setLine(cctvX, cctvY, i, -1);
      setLine(cctvX, cctvY, i + 2, -1);
      dfs(index + 1);
      setLine(cctvX, cctvY, i, 1);
      setLine(cctvX, cctvY, i + 2, 1);
    }
  } else if (cctvN === 3) {
    for (let i = 0; i < 4; i++) {
      setLine(cctvX, cctvY, i, -1);
      setLine(cctvX, cctvY, (i + 1) % 4, -1);
      dfs(index + 1);
      setLine(cctvX, cctvY, i, 1);
      setLine(cctvX, cctvY, (i + 1) % 4, 1);
    }
  } else if (cctvN === 4) {
    for (let i = 0; i < 4; i++) {
      setLine(cctvX, cctvY, i, -1);
      setLine(cctvX, cctvY, (i + 1) % 4, -1);
      setLine(cctvX, cctvY, (i + 2) % 4, -1);
      dfs(index + 1);
      setLine(cctvX, cctvY, i, 1);
      setLine(cctvX, cctvY, (i + 1) % 4, 1);
      setLine(cctvX, cctvY, (i + 2) % 4, 1);
    }
  } else if (cctvN === 5) {
    setLine(cctvX, cctvY, 0, -1);
    setLine(cctvX, cctvY, 1, -1);
    setLine(cctvX, cctvY, 2, -1);
    setLine(cctvX, cctvY, 3, -1);
    dfs(index + 1);
    setLine(cctvX, cctvY, 0, 1);
    setLine(cctvX, cctvY, 1, 1);
    setLine(cctvX, cctvY, 2, 1);
    setLine(cctvX, cctvY, 3, 1);
  }
};

dfs(0);

console.log(answer);
