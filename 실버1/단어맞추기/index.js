const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const t = Number(input[0]);
for (let i = 1; i < input.length; i++) {
  let str = input[i].split("");

  let prev = str[str.length - 1];
  for (let j = str.length - 2; j >= 0; j--) {
    if (str[j] < prev) {
      const rest = str.slice(j + 1).sort();
      const changeIndex = rest.findIndex((v) => v > str[j]);
      const changeValue = rest[changeIndex];
      rest.splice(changeIndex, 1, str[j]);
      rest.sort();
      str = [...str.slice(0, j), changeValue, ...rest];
      break;
    } else {
      prev = str[j];
    }
  }
  console.log(str.join(""));
}
