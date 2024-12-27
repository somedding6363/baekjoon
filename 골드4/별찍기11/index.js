const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = Number(require("fs").readFileSync(file).toString().trim());
const k = Math.log2(input / 3);
let answer = new Array(3);
answer[0] = "  *  ";
answer[1] = " * * ";
answer[2] = "*****";
for (let i = 0; i < k; i++) {
  const bottom = answer.map((v) => v + " " + v);
  const repeatCount = 3 * Math.pow(2, i);
  answer = answer.map(
    (v) => " ".repeat(repeatCount) + v + " ".repeat(repeatCount)
  );
  answer.push(...bottom);
}

console.log(answer.join("\n"));
