export const getGasketVertex = (divisionCount: number) => {
  const answer: number[] = [];
  const stack = [
    {
      points: [
        // x, y, z, r, g, b
        0.0, 0.5, 0.0,
        //
        -0.5, -0.5, 0.0,
        //
        0.5, -0.5, 0.0,
      ],
      divisionCount,
    },
  ];

  while (stack.length > 0) {
    const cur = stack.pop()!;

    if (cur.divisionCount === 0) {
      for (const point of cur.points) {
        answer.push(point);
      }

      continue;
    }

    const p = cur.points;
    const p1 = [(p[0] + p[3]) / 2, (p[1] + p[4]) / 2, (p[2] + p[5]) / 2];
    const p2 = [(p[0] + p[6]) / 2, (p[1] + p[7]) / 2, (p[2] + p[8]) / 2];
    const p3 = [(p[3] + p[6]) / 2, (p[4] + p[7]) / 2, (p[5] + p[8]) / 2];

    stack.push({
      points: [p[0], p[1], p[2], p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]],
      divisionCount: cur.divisionCount - 1,
    });
    stack.push({
      points: [p1[0], p1[1], p1[2], p[3], p[4], p[5], p3[0], p3[1], p3[2]],
      divisionCount: cur.divisionCount - 1,
    });
    stack.push({
      points: [p2[0], p2[1], p2[2], p3[0], p3[1], p3[2], p[6], p[7], p[8]],
      divisionCount: cur.divisionCount - 1,
    });
  }

  const answer2 = [];

  for (const [i, a] of answer.entries()) {
    answer2.push(a);
    if (i % 3 === 2) {
      answer2.push(1.0, 0.0, 0.0);
    }
  }

  return answer2;
};
