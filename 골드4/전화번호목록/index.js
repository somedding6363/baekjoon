// 입력값 저장
// t 크기의 phone배열을 생성한 뒤
// 각 테스트 케이스를 배열로 저장
const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const t = +input[0];
const phone = new Array(t);
let n = 0;
let index = -1;
for (let i = 1; i < input.length; i++) {
  if (n === 0) {
    n = input[i];
    index++;
    phone[index] = [];
  } else {
    phone[index].push(input[i]);
    n--;
  }
}

// 각 테스트 케이스별로 접두어인지 판단
// 현재 번호가 다음 번호의 접두어면 return false(일관성 없는 목록)
// 다 검사했는데 이상 없으면 return true(일관성 있는 목록)
// 정렬을 문자열 기준으로 해서 가능
// '1', '2', '11110', '10'을 정렬하면 '1', '10', '11110', '2'이 되기 때문에
// 현재 위치와 다음 위치가 일치하는지만 판단하면 됨
const check = (phone) => {
  let len = phone.length;
  for (let i = 1; i < len; i++) {
    if (phone[i].startsWith(phone[i - 1])) return false;
  }

  return true;
};

// 모든 테스트 케이스를 순회하면서 출력
for (let i = 0; i < t; i++) {
  phone[i].sort((s1, s2) => s1.localeCompare(s2));
  check(phone[i]) ? console.log("YES") : console.log("NO");
}
