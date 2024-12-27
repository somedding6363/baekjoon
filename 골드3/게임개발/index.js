const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const buildings = new Array(n);
const parBuildings = new Array(n);
for (let i = 0; i < n; i++) {
  [build, ...parent] = input[i + 1].split(" ").map(Number);
  buildings[i] = [build];
  parBuildings[i] = parent;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const now = parBuildings[j];
    if (now[0] === -1) continue;
    for (let k = 0; k < now.length - 1; k++) {
      if (parBuildings[now[k] - 1][0] === -1) {
        buildings[j][1] = buildings[j][1]
          ? Math.max(buildings[j][1], buildings[now[k] - 1][0])
          : buildings[now[k] - 1][0];
        now.splice(k, 1);
      }
    }
    if (now[0] === -1) {
      const par = buildings[j].pop();
      buildings[j][0] += par;
    }
  }
}

for (let i = 0; i < n; i++) {
  console.log(buildings[i][0]);
}
