const solution = (x, y, radius, v) => {
  const len = x.length;
  let l = Infinity,
    r = 0,
    b = Infinity,
    t = 0;
  for (let i = 0; i < len; i++) {
    l = Math.min(l, x[i] - radius[i]);
    r = Math.max(r, x[i] + radius[i]);
    b = Math.min(b, y[i] - radius[i]);
    t = Math.max(t, y[i] + radius[i]);
  }

  const vLen = v.length;
  let count = 0;

  for (let i = 0; i < vLen; i += 2) {
    let isIn = false;
    const [nowX, nowY] = [l + (v[i] % (r - l)), b + (v[i + 1] % (t - b))];
    for (let j = 0; j < len; j++) {
      if (
        Math.pow(x[j] - nowX, 2) + Math.pow(y[j] - nowY, 2) <=
        Math.pow(radius[j], 2)
      ) {
        isIn = true;
        break;
      }
    }

    if (isIn) {
      count++;
    }
  }

  return Math.floor((count / (vLen / 2)) * (r - l) * (t - b));
};

console.log(solution([5], [5], [5], [92, 83, 14, 45, 66, 37, 28, 9, 10, 81]));
console.log(
  solution(
    [3, 4],
    [3, 5],
    [2, 3],
    [12, 83, 54, 35, 686, 337, 258, 95, 170, 831, 8, 15]
  )
);
