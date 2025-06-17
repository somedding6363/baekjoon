const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [a, b] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split(" ")
  .map((v) => BigInt(v));

// b에 곱해서 2^x - 1의 형태로 만들 수 있는 가장 작은 수
// a와 b는 서로소이며, 최종 분모는 2^x - 1의 형태를 띄기 때문에
// 분모를 2^x - 1로 통분해야함
let multi = 0;
// 자리 수
let num = 0;
// 최대 자리수 60자리
for (let i = 0n; i <= 60n; i++) {
  const base = 2n ** i - 1n;
  if (b > base) continue;

  // 나누어 떨어지는지 확인 후 multi에 배수 저장
  const divide = base / b;
  if (divide * b === base) {
    multi = divide;
    num = Number(i);
    break;
  }
}

// multi만큼 a에 곱해서 패턴 찾기
if (multi > 0) {
  let target = BigInt(a * multi);
  let str = target.toString(2);
  // 자리수가 num보다 작으면 num이 될 때까지 0 추가
  if (str.length < num) {
    str = "0".repeat(num - str.length) + str;
  }

  console.log(str.replaceAll("1", "*").replaceAll("0", "-"));
}
// 만약 multi가 0이면 -> 어떻게 해도 답이 없음
else {
  console.log(-1);
}
