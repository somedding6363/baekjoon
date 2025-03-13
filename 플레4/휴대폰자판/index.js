const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let input = require("fs").readFileSync(file).toString().trim().split("\n");
const answer = [];
for (let i = 0; i < input.length; i++) {
  const N = input[i];
  const word = [];
  for (let j = 0; j < N; j++) {
    word.push(input[++i].split(""));
  }

  const trie = {};
  for (let w = 0; w < N; w++) {
    let now = trie;
    for (let a = 0; a < word[w].length; a++) {
      if (!now[word[w][a]]) {
        now[word[w][a]] = {};
      }
      now = now[word[w][a]];
    }
    now["isEnd"] = true;
  }
  let total = 0;
  for (let w = 0; w < N; w++) {
    let cnt = 1;
    let now = trie[word[w][0]];
    for (let a = 1; a < word[w].length; a++) {
      if (Object.keys(now).length > 1 || now["isEnd"]) {
        cnt++;
      }
      now = now[word[w][a]];
    }
    total += cnt;
  }
  answer.push((total / N).toFixed(2));
}

console.log(answer.join("\n"));
