const input = Number(require("fs").readFileSync("example.txt").toString());
let count = 0;

const dfs = (line, row, col) => {
  if (line === input) count++;
  else {
    for (let _col = 0; _col < input; _col++) {
      if (col.indexOf(_col) === -1) {
        let diag = row.filter(
          (v, i) => Math.abs(v - line) === Math.abs(col[i] - _col)
        );
        if (diag.length === 0) dfs(line + 1, [...row, line], [...col, _col]);
      }
    }
  }
};

for (let i = 0; i < input; i++) {
  dfs(1, [0], [i]);
}
console.log(count);
