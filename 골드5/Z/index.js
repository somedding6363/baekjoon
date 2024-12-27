const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [n, r, c] = require("fs").readFileSync(file).toString().trim().split(" ");

let total = 0;
while (n >= 1) {
  // 사분면 나눌 기준 선
  let half = Math.pow(2, n - 1);
  // 현재 맵 안의 칸 수
  let num = Math.pow(4, n);

  //1사분면
  if (r < half && c < half) {
    total += 0;
    n--;
  }
  //2사분면
  else if (r < half && half <= c) {
    total += (num / 4) * 1;
    n--;
    c -= half;
  }
  //3사분면
  else if (half <= r && c < half) {
    total += (num / 4) * 2;
    n--;
    r -= half;
  }
  //4사분면
  else if (half <= r && half <= c) {
    total += (num / 4) * 3;
    n--;
    r -= half;
    c -= half;
  }
}
console.log(total);
