const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
let [N, str] = require("fs").readFileSync(file).toString().trim().split("\n");

const num = [];
const oper = [];
for (let i = 0; i < +N; i++) {
  if (str[i] === "+" || str[i] === "-" || str[i] === "*") {
    oper.push(str[i]);
  } else {
    num.push(+str[i]);
  }
}

let max = -Infinity;
const numStack = [];
const operStack = [];
const isSet = new Array((N - 1) / 2).fill(false);
const calculation = () => {
  let result = numStack[0];
  for (let i = 0; i < operStack.length; i++) {
    if (operStack[i] === "+") result += numStack[i + 1];
    else if (operStack[i] === "-") result -= numStack[i + 1];
    else result *= numStack[i + 1];
  }
  return result;
};

const dfs = (idx) => {
  if (idx === (N - 1) / 2) {
    max = Math.max(calculation(), max);
    return;
  }

  if (idx === 0 || (idx > 0 && isSet[idx - 1] === false)) {
    let a = numStack.pop();
    let b = num[idx + 1];
    let result = 0;
    if (oper[idx] === "+") result = a + b;
    else if (oper[idx] === "-") result = a - b;
    else result = a * b;

    numStack.push(result);
    isSet[idx] = true;
    dfs(idx + 1);
    isSet[idx] = false;
    numStack.pop();
    numStack.push(a);
  }

  numStack.push(num[idx + 1]);
  operStack.push(oper[idx]);
  dfs(idx + 1);
  numStack.pop();
  operStack.pop();
};

numStack.push(num[0]);
dfs(0);

console.log(max);
