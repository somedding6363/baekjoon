const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = input[0].split(" ")[0].split("").map(Number);
const k = Number(input[0].split(" ")[1]);

if (n.length === 1) {
  console.log(-1);
} else if (n.length === 2) {
  if (n[1] === 0) console.log(-1);
  else {
    if (k % 2 === 1) console.log(n[1] * 10 + n[0]);
    else console.log(n[0] * 10 + n[1]);
  }
} else {
  let index = 0;
  let count = 0;
  let map = {};
  while (count < k) {
    let max = Math.max(...n.slice(index));
    let change = n.lastIndexOf(max);
    map[max] ? map[max].push(change) : (map[max] = [change]);
    if (n[index] !== n[change]) {
      let temp = n[change];
      n[change] = n[index];
      n[index] = temp;
      count++;
    }
    index++;

    if (index === n.length) {
      break;
    }
  }

  for (let i in map) {
    let _arr = [];
    for (let j = 0; j < map[i].length; j++) {
      _arr.push(n[map[i][j]]);
    }
    _arr.sort((a, b) => a - b);

    for (let j = 0; j < map[i].length; j++) {
      n[map[i][j]] = _arr[j];
    }
  }

  if (count < k) {
    let set = new Set(n);
    if (set.size === n.length) {
      if ((k - count) % 2 === 1) {
        let temp = n[index - 1];
        n[index - 1] = n[index - 2];
        n[index - 2] = temp;
      }
    }
  }

  console.log(Number(n.join("")));
}
