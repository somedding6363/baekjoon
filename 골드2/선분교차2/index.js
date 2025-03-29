const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const [[x1, y1, x2, y2], [x3, y3, x4, y4]] = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const answer = () => {
  // 점을 공유하는 경우
  if (x1 === x3 && y1 === y3) return 1;
  if (x1 === x4 && y1 === y4) return 1;
  if (x2 === x3 && y2 === y3) return 1;
  if (x2 === x4 && y2 === y4) return 1;

  // CCW
  const CCW = (x1, y1, x2, y2, x3, y3) => {
    const num = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
    if (num < 0) return -1;
    if (num === 0) return 0;
    return 1;
  };

  if (
    CCW(x1, y1, x2, y2, x3, y3) * CCW(x1, y1, x2, y2, x4, y4) <= 0 &&
    CCW(x3, y3, x4, y4, x1, y1) * CCW(x3, y3, x4, y4, x2, y2) <= 0
  ) {
    // L1의 양 끝 점이 L2의 양 끝보다 모두 크거나 작을 경우
    const [maxX12, maxY12] = [Math.max(x1, x2), Math.max(y1, y2)];
    const [minX12, minY12] = [Math.min(x1, x2), Math.min(y1, y2)];
    const [maxX34, maxY34] = [Math.max(x3, x4), Math.max(y3, y4)];
    const [minX34, minY34] = [Math.min(x3, x4), Math.min(y3, y4)];
    if (maxX12 <= minX34 && maxY12 <= minY34) return 0;
    if (minX12 >= maxX34 && minY12 >= maxY34) return 0;
    return 1;
  }
  return 0;
};
console.log(answer());

// const file = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const [[x1, y1, x2, y2], [x3, y3, x4, y4]] = require("fs")
//   .readFileSync(file)
//   .toString()
//   .trim()
//   .split("\n")
//   .map((v) => v.split(" ").map(Number));

// const CCW = (x1, y1, x2, y2, x3, y3) => {
//   const num = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
//   if (num < 0) return -1;
//   if (num === 0) return 0;
//   return 1;
// };

// const isOverlap = (a1, a2, b1, b2) => {
//   return (
//     Math.max(a1, a2) >= Math.min(b1, b2) && Math.max(b1, b2) >= Math.min(a1, a2)
//   );
// };

// const answer = () => {
//   const ccw1 = CCW(x1, y1, x2, y2, x3, y3);
//   const ccw2 = CCW(x1, y1, x2, y2, x4, y4);
//   const ccw3 = CCW(x3, y3, x4, y4, x1, y1);
//   const ccw4 = CCW(x3, y3, x4, y4, x2, y2);

//   if (ccw1 * ccw2 <= 0 && ccw3 * ccw4 <= 0) {
//     if (ccw1 === 0 && ccw2 === 0 && ccw3 === 0 && ccw4 === 0) {
//       return isOverlap(x1, x2, x3, x4) && isOverlap(y1, y2, y3, y4) ? 1 : 0;
//     }
//     return 1;
//   }

//   return 0;
// };

// console.log(answer());
