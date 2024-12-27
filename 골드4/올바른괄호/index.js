// const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// let input = require("fs").readFileSync(file).toString().trim().split("");

// const check = () => {
//   let index = 0;
//   let isChange = false;
//   while (input[index]) {
//     if (input[index] === "(" && input[index + 1] && input[index + 1] === ")") {
//       input.splice(index, 2, 1);
//       if (input[index - 1] && input[index - 1] > 0) {
//         index--;
//         input.splice(index, 2, input[index] + input[index + 1]);
//       }
//       isChange = true;
//     } else if (
//       input[index] === "(" &&
//       input[index + 1] &&
//       input[index + 1] > 0 &&
//       input[index + 2] &&
//       input[index + 2] === ")"
//     ) {
//       input.splice(index, 3, input[index + 1] + 1);
//       isChange = true;

//       if (input[index - 1] && input[index - 1] > 0) {
//         index--;
//         input.splice(index, 2, input[index] + input[index + 1]);
//       }
//     } else if (input[index] > 0 && input[index + 1] && input[index + 1] > 0) {
//       input.splice(index, 2, input[index] + input[index + 1]);
//     }
//     index++;
//   }
//   return isChange;
// };

// let end = false;
// while (!end) {
//   end = !check();
// }

// for (let i = 0; i < input.length; i++) {
//   if (input[i] === "(") {
//     input = input.slice(i + 1);
//   } else if (input[i] === ")") {
//     input = input.slice(0, i);
//   }
// }

// console.log(input.length > 0 ? input[0] + 1 : 1);

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let input = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("")
  .map((v) => (v === "(" ? 1 : -1));
let answer = 0;
let prevResult = 0;
let sum = 0;
let count = 0;
for (let i = 0; i < input.length; i++) {
  sum += input[i];
  if (sum === -1) {
    answer = prevResult + 1;
    break;
  }
  count++;

  if (sum === 0) {
    prevResult += count / 2;
    count = 0;
  }

  if (i === input.length - 1) {
    if (count === 1) {
      answer = 1;
      break;
    } else {
      answer = (count - 1) / 2 + 1;
    }
  }
}

console.log(answer);
