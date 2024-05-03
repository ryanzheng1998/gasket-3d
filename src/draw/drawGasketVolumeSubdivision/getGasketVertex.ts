import { getAllCombination } from "../../functions/getAllCombination";

export const getGasketVertex = (divisionCount: number) => {
  const answer: number[] = [];

  const colors = [
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 0.0, 1.0],
    [1.0, 1.0, 0.0],
    [0.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
  ];

  const stack = [
    {
      points: [
        // x, y, z
        0.0, 1.0, 0.0,
        //
        0.0, -0.33333, 0.942809,
        //
        -0.816497, -0.33333, -0.471405,
        //
        0.816497, -0.33333, -0.471405,
      ],
      divisionCount,
    },
  ];

  while (stack.length > 0) {
    const cur = stack.pop()!;

    if (cur.divisionCount === 0) {
      const p = cur.points;
      const combination = getAllCombination(4, 3);

      for (const [i, com] of combination.entries()) {
        const color = colors[i];

        for (const c of com) {
          answer.push(p[c * 3 + 0]);
          answer.push(p[c * 3 + 1]);
          answer.push(p[c * 3 + 2]);
          answer.push(...color);
        }
      }

      continue;
    }

    const p = cur.points;
    const p1 = [(p[0] + p[3]) / 2, (p[1] + p[4]) / 2, (p[2] + p[5]) / 2];
    const p2 = [(p[0] + p[6]) / 2, (p[1] + p[7]) / 2, (p[2] + p[8]) / 2];
    const p3 = [(p[3] + p[6]) / 2, (p[4] + p[7]) / 2, (p[5] + p[8]) / 2];
    const p5 = [(p[0] + p[9]) / 2, (p[1] + p[10]) / 2, (p[2] + p[11]) / 2];
    const p4 = [(p[3] + p[9]) / 2, (p[4] + p[10]) / 2, (p[5] + p[11]) / 2];
    const p6 = [(p[6] + p[9]) / 2, (p[7] + p[10]) / 2, (p[8] + p[11]) / 2];

    stack.push({
      points: [
        p[0],
        p[1],
        p[2],
        p1[0],
        p1[1],
        p1[2],
        p2[0],
        p2[1],
        p2[2],
        p5[0],
        p5[1],
        p5[2],
      ],
      divisionCount: cur.divisionCount - 1,
    });

    stack.push({
      points: [
        p1[0],
        p1[1],
        p1[2],
        p[3],
        p[4],
        p[5],
        p3[0],
        p3[1],
        p3[2],
        p4[0],
        p4[1],
        p4[2],
      ],
      divisionCount: cur.divisionCount - 1,
    });

    stack.push({
      points: [
        p2[0],
        p2[1],
        p2[2],
        p3[0],
        p3[1],
        p3[2],
        p[6],
        p[7],
        p[8],
        p6[0],
        p6[1],
        p6[2],
      ],
      divisionCount: cur.divisionCount - 1,
    });

    stack.push({
      points: [
        p5[0],
        p5[1],
        p5[2],
        p4[0],
        p4[1],
        p4[2],
        p6[0],
        p6[1],
        p6[2],
        p[9],
        p[10],
        p[11],
      ],
      divisionCount: cur.divisionCount - 1,
    });
  }

  return answer;
};
