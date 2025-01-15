const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const map = {};
for (let i = 0; i < n + m + 1; i++) {
  const [p, f, c] = input[i + 1].split(" ");
  map[p] = (map[p] || []).concat([[f, c]]);
}
const parent = {};
const fileCnt = { main: 0 };
const fileSet = { main: new Set() };

const countingFile = (str) => {
  if (!parent[str]) return;

  parent[str].forEach((v) => {
    fileCnt[v] = (fileCnt[v] || 0) + 1;
    if (!fileSet[v]) {
      fileSet[v] = new Set();
    }
    if (!fileSet[str]) {
      fileSet[str] = new Set();
    }

    for (let f of fileSet[str]) {
      fileSet[v].add(f);
    }
  });
};

const dfs = (str) => {
  let now = map[str];
  if (!now) {
    fileCnt[str] = 0;
    fileSet[str] = new Set();
    return;
  }
  now.forEach((v) => {
    if (v[1] === "0") {
      fileCnt[str] = (fileCnt[str] || 0) + 1;
      fileSet[str] = (fileSet[str] || new Set()).add(v[0]);
      countingFile(str);
    } else {
      if (parent[v[0]]) {
        parent[v[0]].push(str);
      } else {
        parent[v[0]] = [str];
      }
      parent[v[0]].push(...parent[str]);
      dfs(v[0]);
    }
  });
};

map["main"].forEach((v) => {
  if (v[1] === "0") {
    fileCnt["main"]++;
    fileSet["main"].add(v[0]);
  } else {
    parent[v[0]] = ["main"];
    dfs(v[0]);
  }
});

const q = Number(input[n + m + 1]);
for (let i = 0; i < q; i++) {
  const arr = input[n + m + 2 + i].split("/");
  const last = arr[arr.length - 1];
  console.log(fileSet[last].size, fileCnt[last]);
}
