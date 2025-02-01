const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [N, ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n");

const answer = [];
for (let i = 0; i < data.length; i++) {
  const [w, h] = data[i].split(" ").map(Number);
  const building = new Array(h).fill(null);
  let fire = [];
  let now = [];
  for (let j = 0; j < h; j++) {
    building[j] = data[i + 1 + j].split("").map((val, idx) => {
      if (val === "*") fire.push([j, idx]);
      if (val === "@") now.push([j, idx]);

      return val;
    });
  }

  const dxy = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let time = 0;
  let isOut = 0;
  while (isOut === 0) {
    time++;
    // fire
    let _fire = [];
    while (fire.length) {
      const [x, y] = fire.pop();
      for (let d = 0; d < 4; d++) {
        const [lx, ly] = [x + dxy[d][0], y + dxy[d][1]];
        if (lx < 0 || ly < 0 || lx >= h || ly >= w) continue;
        if (building[lx][ly] === "#" || building[lx][ly] === "*") continue;
        building[lx][ly] = "*";
        _fire.push([lx, ly]);
      }
    }
    fire = _fire;

    // now
    let _now = [];
    while (now.length && isOut === 0) {
      const [x, y] = now.pop();
      for (let d = 0; d < 4; d++) {
        const [lx, ly] = [x + dxy[d][0], y + dxy[d][1]];
        if (lx < 0 || ly < 0 || lx >= h || ly >= w) {
          isOut = time;
          break;
        }
        if (building[lx][ly] === ".") {
          building[lx][ly] = "@";
          _now.push([lx, ly]);
        }
      }
    }
    now = _now;
    if (now.length === 0 && isOut === 0) {
      isOut = -1;
    }
  }
  answer.push(isOut === -1 ? "IMPOSSIBLE" : isOut);

  i += h;
}

for (let i = 0; i < N; i++) {
  console.log(answer[i]);
}
