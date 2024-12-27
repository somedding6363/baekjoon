const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");

const [n, s] = input[0].split(" ").map(Number);
const num = input[1].split(" ").map(Number);

let minLen = Infinity;
let sum = 0; // 현재 인덱스까지의 합
let start = 0; // 부분합이 시작되는 인덱스
let len = 0; // 부분합 원소의 길이
// 배열을 한번씩 순회
for (let i = 0; i < n; i++) {
  sum += num[i];
  len++;
  // 인덱스를 더해가면서 만든 부분합이 s이상인 경우
  if (sum >= s) {
    minLen = Math.min(minLen, len);
    // start를 하나씩 늘려가면서 현재인덱스에서 s이상으로 만들 수 있는 가장 짧은 길이까지 이동
    while (sum >= s && start < i) {
      sum -= num[start];
      start++;
      len--;
      // 만약 start를 1 증가시켰는데도 sum이 s이상이면 minLen 갱신
      if (sum >= s) minLen = Math.min(minLen, len);
    }
  }
}

console.log(minLen === Infinity ? 0 : minLen);
