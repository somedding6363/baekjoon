const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

let answer = 0;
const m = input[0].split(" ")[0];
const n = input[0].split(" ")[1];
let box = [];
let queue = [];
for (let i = 1; i < input.length; i++) {
  box[i - 1] = input[i].split(" ").map(Number);
  box[i - 1].forEach((v, i2) => {
    if (v === 1) queue.push([i - 1, i2]);
  });
}

let dir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

while (queue.length > 0) {
  let _queue = [];
  queue.forEach((v) => {
    for (let i = 0; i < 4; i++) {
      if (
        box[v[0] + dir[i][0]] !== undefined &&
        box[v[0] + dir[i][0]][v[1] + dir[i][1]] !== undefined &&
        box[v[0] + dir[i][0]][v[1] + dir[i][1]] === 0
      ) {
        box[v[0] + dir[i][0]][v[1] + dir[i][1]] = 1;
        _queue.push([v[0] + dir[i][0], v[1] + dir[i][1]]);
      }
    }
  });
  answer++;
  queue = _queue;
}
if (box.flat().indexOf(0) > -1) console.log(-1);
else console.log(answer - 1);
