const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [N, ...nickname] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n");
N = Number(N);

const trie = { count: 0, endCount: 0 };
const set = (str) => {
  let now = trie;
  now["count"]++;
  let result = "";
  let isDone = false;
  for (let c of str) {
    if (now[c] === undefined) {
      if (!isDone) {
        result += c;
      }
      isDone = true;
      now[c] = { count: 1, endCount: 0 };
    } else {
      now[c]["count"]++;
    }

    if (!isDone) {
      result += c;
    }
    now = now[c];
  }
  now["endCount"]++;
  // 문자열을 다 돌았는데도 아직 별칭이 정해지지 않았다면
  if (!isDone) {
    if (now["endCount"] !== 1) {
      result += now["endCount"];
    }
  }
  return result;
};

let answer = [];
for (let i = 0; i < N; i++) {
  answer.push(set(nickname[i]));
}
console.log(answer.join("\n"));
