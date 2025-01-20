const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
let puzzle = "";
for (let i = 0; i < 3; i++) {
  puzzle += input[i].split(" ").join("");
}
let queue = [puzzle];
const correct = "123456780";
if (puzzle === correct) {
  console.log(0);
} else {
  const dxy = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const visited = {};
  visited[puzzle] = 0;

  let answer = 0;
  while (queue.length) {
    let now = queue.shift();
    let idx = now.indexOf("0");
    for (let i = 0; i < 4; i++) {
      let next = idx + dxy[i][0] * 3 + dxy[i][1];
      if (next < 0 || next >= 9) continue;
      let _puzzle = now.split("");
      _puzzle[idx] = _puzzle[next];
      _puzzle[next] = "0";

      let str = _puzzle.join("");
      if (str === correct) {
        answer = visited[now] + 1;
        break;
      }
      if (visited[str] === undefined) {
        visited[str] = visited[now] + 1;
        queue.push(str);
      }
    }

    if (answer) break;
  }

  console.log(answer ? answer : -1);
}
