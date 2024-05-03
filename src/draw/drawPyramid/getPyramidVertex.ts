import { getAllCombination } from "../../functions/getAllCombination";

export const getPyramidVertex = () => {
  const t = [
    // x, y, z
    0.0, 1.0, 0.0,
    //
    0.0, -0.33333, 0.942809,
    //
    -0.816497, -0.33333, -0.471405,
    //
    0.816497, -0.33333, -0.471405,
  ];

  const answer: number[] = [];
  const combination = getAllCombination(4, 3);
  const colors = [
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 0.0, 1.0],
    [1.0, 1.0, 0.0],
    [0.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
  ];

  for (const [i, com] of combination.entries()) {
    const color = colors[i];

    for (const c of com) {
      answer.push(t[c * 3 + 0]);
      answer.push(t[c * 3 + 1]);
      answer.push(t[c * 3 + 2]);
      answer.push(...color);
    }
  }

  return answer;
};
