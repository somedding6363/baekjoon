const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [N, current, target] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v, i) => (i === 0 ? v : v.split("").map(Number)));

let answer = Infinity;
// 스위치를 끄고 켜는 함수
const onoff = (s) => {
  const _current = [...current];
  let count = 0;
  // 0번째 전구 상태 변경
  if (s === 0) {
    _current[0] = (_current[0] + 1) % 2;
    _current[1] = (_current[1] + 1) % 2;
    count++;
  }

  // 1번부터 전구 상태 변경
  for (let i = 1; i < N; i++) {
    // i - 1번째가 target과 다르다면 스위치 누르기
    if (_current[i - 1] !== target[i - 1]) {
      // i - 1, i, i + 1번째 바꾸기
      for (let j = 0; j < 3; j++) {
        if (i - 1 + j < N) {
          _current[i - 1 + j] = (_current[i - 1 + j] + 1) % 2;
        }
      }
      count++;
    }
  }

  // target과 같으면 answer 갱신
  if (_current.join("") === target.join("")) answer = Math.min(answer, count);
};

// 0번째 스위치 눌렀을 때
onoff(0);
// 1번째 스위치 눌렀을 때
onoff(1);

if (answer !== Infinity) console.log(answer);
else console.log(-1);
