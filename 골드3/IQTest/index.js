const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input[0]);

if (n === 1) console.log("A");
else if (n === 2) {
  if (input[1].split(" ")[0] === input[1].split(" ")[1])
    console.log(Number(input[1].split(" ")[0]));
  else console.log("A");
} else {
  const [n1, n2, n3, ...rest] = input[1].split(" ").map(Number);
  let a = 0;
  while (1) {
    let b1 = n2 - n1 * a;
    let b2 = n2 + n1 * a;

    if (n2 * a + b1 === n3) {
      if (rest.length) {
        for (let i = 0; i < rest.length; i++) {
          if (i === 0) {
            if (rest[i] === n3 * a + b1) {
              if (i === rest.length - 1) console.log(rest[i] * a + b1);
              continue;
            } else {
              console.log("B");
              break;
            }
          }
          if (rest[i] === rest[i - 1] * a + b1) {
            if (i === rest.length - 1) console.log(rest[i] * a + b1);
            continue;
          } else {
            console.log("B");
            break;
          }
        }
        break;
      } else {
        console.log(n3 * a + b1);
        break;
      }
    } else if (-1 * n2 * a + b2 === n3) {
      if (rest.length) {
        for (let i = 0; i < rest.length; i++) {
          if (i === 0) {
            if (rest[i] === -1 * n3 * a + b2) {
              if (i === rest.length - 1) console.log(-1 * rest[i] * a + b2);
              continue;
            } else {
              console.log("B");
              break;
            }
          }
          if (rest[i] === -1 * rest[i - 1] * a + b2) {
            if (i === rest.length - 1) console.log(-1 * rest[i] * a + b2);
            continue;
          } else {
            console.log("B");
            break;
          }
        }
        break;
      } else {
        console.log(-1 * n3 * a + b2);
        break;
      }
    } else {
      a++;
    }

    if (a === 200) {
      console.log("B");
      break;
    }
  }
}
