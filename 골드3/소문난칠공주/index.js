const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const classroom = new Array(5);
const s = [];
for (let i = 0; i < 5; i++) {
  classroom[i] = input[i].split("").map((val, idx) => {
    if (val === "S") {
      s.push([i, idx]);
      return 1;
    }
    return 0;
  });
}

let answer = 0;
const visited = new Array(5).fill(null).map((_) => new Array(5).fill(false));
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
const comb = (x, y, count) => {
  if (count === 7) {
    const bfsvisited = new Array(5)
      .fill(null)
      .map((_) => new Array(5).fill(false));
    let queue = [[x, y]];
    let num = 0;
    let snum = 0;
    bfsvisited[x][y] = true;
    while (queue.length) {
      let now = queue.shift();
      num++;
      if (classroom[now[0]][now[1]]) snum++;
      for (let i = 0; i < 4; i++) {
        const [lx, ly] = [now[0] + dx[i], now[1] + dy[i]];
        if (
          lx < 0 ||
          lx >= 5 ||
          ly < 0 ||
          ly >= 5 ||
          !visited[lx][ly] ||
          bfsvisited[lx][ly]
        )
          continue;
        queue.push([lx, ly]);
        bfsvisited[lx][ly] = true;
      }
    }
    if (num === 7 && snum >= 4) {
      answer++;
      return;
    }
  }
  for (let i = x; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (i === x && j <= y) continue;
      visited[i][j] = true;
      comb(i, j, count + 1);
      visited[i][j] = false;
    }
  }
};

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    visited[i][j] = true;
    comb(i, j, 1);
    visited[i][j] = false;
  }
}

console.log(answer);
