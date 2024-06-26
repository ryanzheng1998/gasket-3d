import fragmentShaderText from "./fragmentShader.glsl?raw";
import vertexShaderText from "./vertexShader.glsl?raw";

export const drawTriangle = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

  const vertexData = [
    // x, y, z, r, g, b
    0.0, 0.5, 0.0, 1.0, 0.0, 0.0,
    //
    -0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
    //
    0.5, -0.5, 0.0, 0.0, 0.0, 1.0,
  ];

  //
  // create vertexBuffer and load vertexData into it
  //
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

  //
  // vertex shader
  //
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (vertexShader === null) {
    console.error("Failed to create shaders");
    return;
  }
  gl.shaderSource(vertexShader, vertexShaderText);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(
      "Failed to compile vertex shader",
      gl.getShaderInfoLog(vertexShader),
    );
    return;
  }

  //
  // fragment shader
  //
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (fragmentShader === null) {
    console.error("Failed to create shaders");
    return;
  }
  gl.shaderSource(fragmentShader, fragmentShaderText);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(
      "Failed to compile fragment shader",
      gl.getShaderInfoLog(fragmentShader),
    );
    return;
  }

  //
  // create program and attach shaders to program
  //
  const program = gl.createProgram();
  if (program === null) {
    console.error("Failed to create program");
    return;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  //
  // complete the process of preparing the GPU code for the program's fragment and vertex shaders
  //
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Failed to link program", gl.getProgramInfoLog(program));
    return;
  }
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("Failed to validate program", gl.getProgramInfoLog(program));
    return;
  }

  //
  // enable vertex attributes
  //
  const positionAttribLocation = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(positionAttribLocation);
  gl.vertexAttribPointer(
    positionAttribLocation,
    3,
    gl.FLOAT,
    false,
    6 * Float32Array.BYTES_PER_ELEMENT,
    0,
  );

  const colorAttribLocation = gl.getAttribLocation(program, "color");
  gl.enableVertexAttribArray(colorAttribLocation);
  gl.vertexAttribPointer(
    colorAttribLocation,
    3,
    gl.FLOAT,
    false,
    6 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT,
  );

  //
  // set the program as part of the current rendering state
  //
  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST);

  //
  // draw
  //
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix)
};
