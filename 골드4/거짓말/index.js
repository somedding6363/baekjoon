const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N, M], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [_, ...arr] = data[0];
// 같은 파티에 있는 사람 객체
const obj = {};
// 진실을 아는 사람 집합
const set = new Set(arr);

// 파티원들 탐색
for (let i = 1; i <= M; i++) {
  const [_, ...party] = data[i];
  for (let p of party) {
    if (obj[p]) obj[p] = new Set([...obj[p], ...party]);
    else obj[p] = new Set(party);
  }
}

// set을 순회하면서 진실을 같이 알게 될 사람 set에 추가
for (let s of set) {
  if (obj[s]) {
    for (let o of obj[s]) {
      set.add(o);
    }
  }
}

let answer = 0;
for (let i = 1; i <= M; i++) {
  const [_, ...party] = data[i];
  if (!party.some((v) => set.has(v))) answer++;
}

console.log(answer);
