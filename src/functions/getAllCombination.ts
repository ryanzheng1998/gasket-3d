export const getAllCombination = (n: number, k: number) => {
  const answer: number[][] = [];
  const stack: number[][] = new Array(n).fill(0).map((x, i) => [i]);

  while (stack.length !== 0) {
    const cur = stack.pop()!;

    if (cur.length === k) {
      answer.push(cur);
      continue;
    }

    const last = cur[cur.length - 1];

    for (let i = last + 1; i < n; i++) {
      stack.push([...cur, i]);
    }
  }

  return answer;
};
