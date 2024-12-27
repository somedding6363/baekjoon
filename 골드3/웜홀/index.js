const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const t = Number(input[0]);
const answer = [];
for (let i = 1; i < input.length - 1; i++) {
  const [n, m, w] = input[i].split(" ").map(Number);
  const edge = [];
  for (let j = 0; j < m; j++) {
    let arr = input[i + 1 + j].split(" ").map(Number);
    edge.push([arr[0], arr[1], arr[2]]);
    edge.push([arr[1], arr[0], arr[2]]);
  }
  for (let j = 0; j < w; j++) {
    let arr = input[i + 1 + m + j].split(" ").map(Number);
    edge.push([arr[0], arr[1], -arr[2]]);
  }
  i += m + w;

  //
  const dist = new Array(n).fill(Infinity);
  dist[edge[0][0] - 1] = 0;
  for (let j = 0; j < n - 1; j++) {
    for (let k = 0; k < edge.length; k++) {
      const [from, to, d] = edge[k];
      if (dist[from - 1] !== Infinity)
        dist[to - 1] = Math.min(dist[to - 1], dist[from - 1] + d);
    }
  }

  let prevDist = dist.join("");

  for (let k = 0; k < edge.length; k++) {
    const [from, to, d] = edge[k];
    if (dist[from - 1] !== Infinity)
      dist[to - 1] = Math.min(dist[to - 1], dist[from - 1] + d);
  }

  if (prevDist !== dist.join("")) answer.push("YES");
  else answer.push("NO");
}

for (let i = 0; i < t; i++) {
  console.log(answer[i]);
}
