type Point = {
  x: number;
  y: number;
  z: number;
};

export const generateVertexData = () => {
  const vertexData: number[] = [];
  // const gasketInitalVertex: Point[] = [
  //   { x: 0.0, y: 1.0, z: 0.0 },
  //   { x: 0.0, y: -0.33333, z: 0.942809 },
  //   { x: -0.816497, y: -0.33333, z: -0.471405 },
  //   // { x: 0.816497, y: -0.33333, z: -0.471405 },
  // ];

  const gasketInitalVertex: Point[] = [
    { x: 0.0, y: 1.0, z: 0.0 },
    { x: 0.0, y: 0.0, z: 0.0 },
    { x: 1.0, y: 0.0, z: 0.0 },
    // { x: 0.816497, y: -0.33333, z: -0.471405 },
  ];

  for (let i = 0; i < gasketInitalVertex.length; i++) {
    const p = gasketInitalVertex[i];
    vertexData.push(p.x, p.y, p.z, 1, 0, 0);
  }

  // return data;
  return vertexData;
};
