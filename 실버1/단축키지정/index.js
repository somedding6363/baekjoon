const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);
const word = new Array(n);
for (let i = 1; i < input.length; i++) {
  word[i - 1] = input[i];
}

const map = new Map();
const isIn = (char) => {
  if (map.get(char.toUpperCase())) return true;

  map.set(char.toUpperCase(), 1);
  return false;
};
for (let i = 0; i < n; i++) {
  if (!isIn(word[i][0])) {
    console.log("[" + word[i][0] + "]" + word[i].split("").slice(1).join(""));
  } else {
    const arr = word[i].split(" ");
    let end = false;
    for (let j = 1; j < arr.length; j++) {
      if (!isIn(arr[j][0])) {
        end = true;
        arr[j] = "[" + arr[j][0] + "]" + arr[j].split("").slice(1).join("");
        console.log(arr.join(" "));
        break;
      }
    }
    if (!end) {
      const arr2 = word[i].split("");
      end = false;
      for (let j = 1; j < arr2.length; j++) {
        if (arr2[j] !== " " && !isIn(arr2[j])) {
          end = true;
          arr2[j] = "[" + arr2[j] + "]";
          console.log(arr2.join(""));
          break;
        }
      }
      if (!end) console.log(word[i]);
    }
  }
}
