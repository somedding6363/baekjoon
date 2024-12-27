const solution = (n) => {
  let dp = [[1]];
  if (n > 1) {
    for (let i = 2; i <= n; i++) {
      let nowMax = 6 * (i - 1);
      dp = dp.map((v) => v.map((v2) => v2 + 6 * (i - 1)));
      const left = [[1], [nowMax, 2]];
      const right = [[nowMax / 2 + 2, nowMax / 2], [nowMax / 2 + 1]];

      let start = 3;
      let end = nowMax - 1;
      for (let j = 0; j < dp.length; j++) {
        if (dp[j].length === i - 1) continue;
        dp[j].push(start);
        dp[j].unshift(end);
        start++;
        end--;
      }
      dp = [...left, ...dp, ...right];
    }
  }
  return dp.flat();
};

console.log(solution(1));
console.log(solution(2));
console.log(solution(3));
console.log(solution(4));
