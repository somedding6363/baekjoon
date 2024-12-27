const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const sudoku = new Array(9).fill(null).map((_) => new Array(9).fill(0));
const empty = [];
for (let i = 0; i < 9; i++) {
  input[i].split(" ").forEach((val, idx) => {
    if (Number(val) === 0) empty.push([i, idx]);
    sudoku[i][idx] = Number(val);
  });
}

const dfs = (empty, index) => {
  if (empty.length === index) {
    for (let i = 0; i < 9; i++) {
      console.log(sudoku[i].join(" "));
    }
    process.exit();
  }
  const [row, col] = empty[index];
  let arr = new Array(10).fill(3);

  for (let i = 0; i < 9; i++) {
    arr[sudoku[row][i]]--;
  }
  for (let i = 0; i < 9; i++) {
    arr[sudoku[i][col]]--;
  }
  let _row = Math.floor(row / 3) * 3;
  let _col = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      arr[sudoku[_row + i][_col + j]]--;
    }
  }

  let possible = [];
  arr.map((v, i) => (v === 3 ? possible.push(i) : null));

  if (possible.length === 0) return;

  for (let i = 0; i < possible.length; i++) {
    sudoku[row][col] = possible[i];
    dfs(empty, index + 1);
    sudoku[row][col] = 0;
  }
};

dfs(empty, 0);
