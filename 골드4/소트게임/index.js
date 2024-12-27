const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, k] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").join("");
const sorted = new Array(n)
  .fill(0)
  .map((_, i) => i + 1)
  .join("");
if (numbers === sorted) {
  console.log(0);
  process.exit();
}

const queue = [];
queue.push([0, numbers]);
const set = new Set();
set.add(numbers);
while (queue.length) {
  const [count, str] = queue.shift();

  for (let i = 0; i < n - k + 1; i++) {
    let _str =
      str.slice(0, i) +
      str
        .slice(i, i + k)
        .split("")
        .reverse()
        .join("") +
      str.slice(i + k);

    if (_str === sorted) {
      console.log(count + 1);
      process.exit();
    }
    if (!set.has(_str)) {
      set.add(_str);
      queue.push([count + 1, _str]);
    }
  }
}

console.log(-1);

// const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const input = require("fs").readFileSync(file).toString().trim().split("\n");
// const [n, k] = input[0].split(" ").map(Number);
// const numbers = input[1].split(" ").map(Number);
// let min = 0;
// for (let j = 0; j < n; j++) {
//   if (min > numbers[j]) break;
//   else {
//     if (j === n - 1) {
//       console.log(0);
//       process.exit();
//     }
//     min = numbers[j];
//   }
// }

// const queue = [];
// queue.push([0, -1, [...numbers]]);
// while (queue.length) {
//   const [count, index, arr] = queue.shift();
//   if (count > 99999) {
//     console.log(-1);
//     process.exit();
//   }

//   for (let i = 0; i < n - k + 1; i++) {
//     if (i === index) continue;

//     let _arr = [
//       ...arr.slice(0, i),
//       ...arr.slice(i, i + k).reverse(),
//       ...arr.slice(i + k),
//     ];

//     let min = 0;
//     for (let j = 0; j < n; j++) {
//       if (min > _arr[j]) break;
//       else {
//         if (j === n - 1) {
//           console.log(count + 1);
//           process.exit();
//         }
//         min = _arr[j];
//       }
//     }
//     queue.push([count + 1, i, [..._arr]]);
//   }
// }
