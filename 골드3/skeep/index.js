const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [N, arr] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v, i) => (i === 0 ? Number(v) : v.split("").reverse()));

let answer = 0;
// skeep을 찾기 위한 스택
const stack = [];

while (arr.length > 0) {
  stack.push(arr.pop());
  let last = stack.length - 1;
  // 스택의 크기가 5보다 작으면 스택에 추가 후 패스
  if (last + 1 < 5) {
    continue;
  }

  // 5이상인 경우 skeep 확인
  if (
    stack[last] === "p" &&
    stack[last - 1] === "e" &&
    stack[last - 2] === "e" &&
    stack[last - 3] === "k" &&
    stack[last - 4] === "s"
  ) {
    // skeep이면 5글자 모두 pop
    for (let i = 0; i < 5; i++) {
      stack.pop();
    }
    answer++;
    last = stack.length - 1;
    // 남아 있는 마지막 글자 확인
    // e는 그 앞 글자도 확인

    if (stack[last] === "s") {
      arr.push("k");
    } else if (
      last - 1 >= 0 &&
      stack[last - 1] === "s" &&
      stack[last] === "k"
    ) {
      arr.push("e");
    } else if (
      last - 2 >= 0 &&
      stack[last - 2] === "s" &&
      stack[last - 1] === "k" &&
      stack[last] === "e"
    ) {
      arr.push("e");
    } else if (
      last - 3 >= 0 &&
      stack[last - 3] === "s" &&
      stack[last - 2] === "k" &&
      stack[last - 1] === "e" &&
      stack[last] === "e"
    ) {
      arr.push("p");
    }
    // 직전에 skeep이 만들어 질 수 없는 경우는 아무 문자
    else {
      arr.push("a");
    }
  }
}

console.log(answer);
