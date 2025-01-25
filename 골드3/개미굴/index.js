const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[N], ...data] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v, i) => (i === 0 ? Number(v) : v)));

class Trie {
  constructor() {
    this.root = {};
  }
  add(arr) {
    let curNode = this.root;
    for (let i = 1; i < arr.length; i++) {
      if (!curNode[arr[i]]) {
        curNode[arr[i]] = {};
      }
      curNode = curNode[arr[i]];
    }
  }
  print(curNode, index) {
    for (let i in curNode) {
      console.log("--".repeat(index) + i);
      this.print(curNode[i], index + 1);
    }
  }
}

data.sort((a, b) => {
  for (let i = 1; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) return a[i].localeCompare(b[i]);
  }
});

const trie = new Trie();
for (let i = 0; i < N; i++) {
  trie.add(data[i]);
}

trie.print(trie.root, 0);
