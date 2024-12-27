// 못풀었음

const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");

const n = input[0];
const dna = new Array(n);
for (let i = 1; i < input.length; i++) {
  dna[i - 1] = input[i];
}

// AA, AC, AT, AG, CC, CT, CG, TT, TG, GG
const board = new Array(10).fill(0);
const map = {
  AA: 0,
  AC: 0,
  AT: 0,
  AG: 0,
  CC: 0,
  CT: 0,
  CG: 0,
  TT: 0,
  TG: 0,
  GG: 0,
};
const total = ((n * (n - 1)) / 2) * dna[0].length;

for (let i = 0; i < n - 1; i++) {
  for (let j = i + 1; j < n; j++) {
    const str1 = dna[i];
    const str2 = dna[j];
    for (let s in str1) {
      let str = str1[s] + str2[s];
      if (map[str] === undefined) str = str2[s] + str1[s];
      map[str]++;
    }
  }
}

console.log(map);
console.log(total);
