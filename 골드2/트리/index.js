const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [[T], ...testcase] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

for (let i = 0; i < T; i++) {
  const n = testcase[i * 3][0];
  const [preOrder, inOrder] = [testcase[i * 3 + 1], testcase[i * 3 + 2]];
  const answer = [];

  const dfs = (s1, e1, s2, e2) => {
    const root = preOrder[s1];
    const rootIdx = inOrder.indexOf(root);
    const lSize = rootIdx - s2;
    const rSize = e2 - rootIdx;

    // left
    if (lSize > 0) {
      dfs(s1 + 1, s1 + lSize, s2, rootIdx - 1);
    }
    //right
    if (rSize > 0) {
      dfs(s1 + lSize + 1, e1, rootIdx + 1, e2);
    }

    answer.push(root);
  };

  dfs(0, n - 1, 0, n - 1);
  console.log(answer.join(" "));
}
