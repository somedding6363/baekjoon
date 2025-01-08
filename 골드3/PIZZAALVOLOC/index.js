const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const input = require("fs").readFileSync(file).toString().trim().split("\n");
const [x1, y1, x2, y2, x3, y3, x4, y4] = input[0].split(" ").map(Number);

if (x1 === x2 && x3 === x4) {
  console.log(0);
} else if (x1 === x2) {
  const g34 = (y4 - y3) / (x4 - x3);
  const c34 = y3 - g34 * x3;
  const py = x1 * g34 + c34;

  if ((y1 < y2 && y1 <= py && y2 >= py) || (y1 > y2 && y2 <= py && y1 >= py)) {
    if (
      (x3 <= x4 && g34 >= 0 && x3 <= x1 && x4 >= x1 && y3 <= py && y4 >= py) ||
      (x3 > x4 && g34 > 0 && x4 <= x1 && x3 >= x1 && y4 <= py && y3 >= py) ||
      (x3 < x4 && g34 < 0 && x3 <= x1 && x4 >= x1 && y3 >= py && y4 <= py) ||
      (x3 > x4 && g34 < 0 && x4 <= x1 && x3 >= x1 && y4 >= py && y3 <= py)
    ) {
      console.log(1);
    } else {
      console.log(0);
    }
  } else {
    console.log(0);
  }
} else if (x3 === x4) {
  const g12 = (y2 - y1) / (x2 - x1);
  const c12 = y1 - g12 * x1;
  const py = x3 * g12 + c12;
  if (
    (x1 <= x2 && g12 >= 0 && x1 <= x3 && x2 >= x3 && y1 <= py && y2 >= py) ||
    (x1 > x2 && g12 > 0 && x2 <= x3 && x1 >= x3 && y2 <= py && y1 >= py) ||
    (x1 < x2 && g12 < 0 && x1 <= x3 && x2 >= x3 && y1 >= py && y2 <= py) ||
    (x1 > x2 && g12 < 0 && x2 <= x3 && x1 >= x3 && y2 >= py && y1 <= py)
  ) {
    if (
      (y3 < y4 && y3 <= py && y4 >= py) ||
      (y3 > y4 && y4 <= py && y3 >= py)
    ) {
      console.log(1);
    } else {
      console.log(0);
    }
  } else {
    console.log(0);
  }
} else {
  const g12 = (y2 - y1) / (x2 - x1);
  const g34 = (y4 - y3) / (x4 - x3);
  const c12 = y1 - g12 * x1;
  const c34 = y3 - g34 * x3;

  const px = (c34 - c12) / (g12 - g34);
  const py = px * g12 + c12;

  if (
    (x1 < x2 && g12 > 0 && x1 <= px && x2 >= px && y1 <= py && y2 >= py) ||
    (x1 > x2 && g12 > 0 && x2 <= px && x1 >= px && y2 <= py && y1 >= py) ||
    (x1 < x2 && g12 < 0 && x1 <= px && x2 >= px && y1 >= py && y2 <= py) ||
    (x1 > x2 && g12 < 0 && x2 <= px && x1 >= px && y2 >= py && y1 <= py)
  ) {
    if (
      (x3 < x4 && g34 > 0 && x3 <= px && x4 >= px && y3 <= py && y4 >= py) ||
      (x3 > x4 && g34 > 0 && x4 <= px && x3 >= px && y4 <= py && y3 >= py) ||
      (x3 < x4 && g34 < 0 && x3 <= px && x4 >= px && y3 >= py && y4 <= py) ||
      (x3 > x4 && g34 < 0 && x4 <= px && x3 >= px && y4 >= py && y3 <= py)
    ) {
      console.log(1);
    } else {
      console.log(0);
    }
  } else {
    console.log(0);
  }
}
