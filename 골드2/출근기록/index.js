const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let S = require("fs").readFileSync(file).toString().trim();
const attendance = [0, 0, 0];
const alpha = ["A", "B", "C"];
for (let i in S) {
  attendance[S.charCodeAt(i) - "A".charCodeAt(0)]++;
}

// const Aarr = [];
// const dfs = () => {
//   if (attendance[0] === 0 && attendance[1] === 0 && attendance[2] === 0) {
//     console.log(Aarr.join(""));
//     process.exit();
//   }

//   for (let i = 0; i < 3; i++) {
//     if (attendance[i] === 0) continue;
//     const len = Aarr.length;
//     if (len > 0) {
//       if (i === 1) {
//         if (Aarr[len - 1] === "B") continue;
//       } else if (i === 2) {
//         if (Aarr[len - 1] === "C" || Aarr[len - 2] === "C") continue;
//       }
//     }

//     Aarr.push(alpha[i]);
//     attendance[i]--;
//     dfs();
//     Aarr.pop(alpha[i]);
//     attendance[i]++;
//   }
// };

// dfs();

// console.log(-1);

const answer = "A".repeat(attendance[0]).split("");
console.log(answer);
let index = 0;
for (let i = 0; i < attendance[1]; i++) {
  answer.splice(index, 0, "B");
  index += 2;
}
console.log(answer);
