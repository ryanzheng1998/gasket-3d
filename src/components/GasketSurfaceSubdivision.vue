<template>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
</template>
<script lang="ts">
import * as glm from 'gl-matrix'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

interface Point {
  x: number,
  y: number,
  z: number
}
interface Color {
  r: number,
  g: number,
  b: number,
  a?: number
}

@Component
export default class GasketSurfaceSubdivision extends Vue {
  // prop
  @Prop() gasketInitalVertex!: [Point, Point, Point, Point]
  @Prop() gasketDivisionCount!: number
  @Prop() rotation!: {axis: string, direction: string}

  // data
  vertexData: number[] = []

  // Dom object (shallow mount ?? virtual Dom ??)
  $refs!: {
    canvas: HTMLCanvasElement
  }

  // lifecycle hook
  mounted () {
    console.log('WebGLCanvas component mounted')

    this.$refs.canvas.width = window.innerWidth
    this.$refs.canvas.height = window.innerWidth

    const gl = this.$refs.canvas.getContext('webgl')

    if (!gl) {
      throw new Error('WebGL not spported')
    }

    //
    // vertex point + color data
    //
    let gasketVertexDataGen = (a: Point, b: Point, c: Point, gasketDivisionCount: number, colorData: number[]) :void => {
      // I will fix this later
      // New to the typescript. This part probibily can be reduce into array, for loop and higher order function
      let p1: Point = { x: 0, y: 0, z: 0 }
      let p2: Point = { x: 0, y: 0, z: 0 }
      let p3: Point = { x: 0, y: 0, z: 0 }
      let iterater: number
      if (gasketDivisionCount > 0) {
        p1.x = (a.x + b.x) / 2
        p1.y = (a.y + b.y) / 2
        p1.z = (a.z + b.z) / 2

        p2.x = (a.x + c.x) / 2
        p2.y = (a.y + c.y) / 2
        p2.z = (a.z + c.z) / 2

        p3.x = (b.x + c.x) / 2
        p3.y = (b.y + c.y) / 2
        p3.z = (b.z + c.z) / 2

        gasketVertexDataGen(a, p1, p2, gasketDivisionCount - 1, colorData)
        gasketVertexDataGen(p2, p3, c, gasketDivisionCount - 1, colorData)
        gasketVertexDataGen(p1, b, p3, gasketDivisionCount - 1, colorData)
      } else {
        this.vertexData.push(a.x, a.y, a.z, ...colorData, b.x, b.y, b.z, ...colorData, c.x, c.y, c.z, ...colorData)
      }
    }
    gasketVertexDataGen(this.gasketInitalVertex[0], this.gasketInitalVertex[1], this.gasketInitalVertex[2], this.gasketDivisionCount, [1, 0, 0])
    gasketVertexDataGen(this.gasketInitalVertex[3], this.gasketInitalVertex[2], this.gasketInitalVertex[1], this.gasketDivisionCount, [0, 1, 0])
    gasketVertexDataGen(this.gasketInitalVertex[0], this.gasketInitalVertex[3], this.gasketInitalVertex[1], this.gasketDivisionCount, [0, 0, 1])
    gasketVertexDataGen(this.gasketInitalVertex[0], this.gasketInitalVertex[2], this.gasketInitalVertex[3], this.gasketDivisionCount, [1, 1, 1])

    let cylinderDataGen = (startPoint: Point, radius: number, halfCylinderLength: number, slices: number): void => {
      let theta = 0
      let nextTheta = 0
      // translation
      let s = startPoint.y - halfCylinderLength
      let e = startPoint.y + halfCylinderLength
      for (let i = 0; i < slices; i++) {
        theta = 2 * Math.PI / slices * i
        nextTheta = 2 * Math.PI / slices * (i + 1)

        this.vertexData.push(0, s, 0, 0.59, 0.29, 0.00)
        this.vertexData.push(radius * Math.cos(theta), s, radius * Math.sin(theta), 0.59, 0.29, 0.00)
        this.vertexData.push(radius * Math.cos(nextTheta), s, radius * Math.sin(nextTheta), 0.59, 0.29, 0.00)

        this.vertexData.push(0, e, 0, 0.59, 0.29, 0.00)
        this.vertexData.push(radius * Math.cos(theta), e, radius * Math.sin(theta), 0.59, 0.29, 0.00)
        this.vertexData.push(radius * Math.cos(nextTheta), e, radius * Math.sin(nextTheta), 0.59, 0.29, 0.00)

        this.vertexData.push(radius * Math.cos(theta), s, radius * Math.sin(theta), 0.59, 0.29, 0.00)
        this.vertexData.push(radius * Math.cos(nextTheta), s, radius * Math.sin(nextTheta), 0.59, 0.29, 0.00)
        this.vertexData.push(radius * Math.cos(theta), e, radius * Math.sin(theta), 0.59, 0.29, 0.00)

        this.vertexData.push(radius * Math.cos(theta), e, radius * Math.sin(theta), 0.59, 0.29, 0.00)
        this.vertexData.push(radius * Math.cos(nextTheta), e, radius * Math.sin(nextTheta), 0.59, 0.29, 0.00)
        this.vertexData.push(radius * Math.cos(theta), s, radius * Math.sin(theta), 0.59, 0.29, 0.00)
      }
    }
    cylinderDataGen({ x: 0, y: -0.471405, z: 0 }, 0.133, 0.533, 24)
    console.log(this.vertexData)

    //
    // create vertexVuffer and load vertexData into it
    //
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexData), gl.STATIC_DRAW)

    //
    // vertex shader
    //
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    // Forced to do the exception handling by typescript which is a good thing
    if (!vertexShader) {
      throw new Error('Fail to create vertex shader')
    }
    gl.shaderSource(vertexShader, `
      precision mediump float;

      attribute vec3 position;
      attribute vec3 color;
      varying vec3 vColor;

      uniform mat4 matrix;

      void main() {
        vColor = color;
        gl_Position = matrix * vec4(position, 1);
      }
    `)
    gl.compileShader(vertexShader)

    //
    // fragement shader
    //
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    if (!fragmentShader) {
      throw new Error('Fail to create fragment Shader')
    }
    gl.shaderSource(fragmentShader, `
      precision mediump float;
      
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor, 1);
      }
    `)
    gl.compileShader(fragmentShader)

    //
    // create program and attach shaders to program
    //
    const program = gl.createProgram()
    if (!program) {
      throw new Error('Fial to create shader program')
    }
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    // complete the process of preparing the GPU code for the program's fragment and vertex shaders
    gl.linkProgram(program)

    //
    // enable vertex attributes
    //
    const positionLocation: number = gl.getAttribLocation(program, `position`) // this should be 0
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(
      positionLocation, // Attribute location represent by number
      3, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      false, // normalized
      6 * Float32Array.BYTES_PER_ELEMENT, // stride
      0 // offset
    )

    const colorLocation = gl.getAttribLocation(program, `color`)
    gl.enableVertexAttribArray(colorLocation)
    gl.vertexAttribPointer(
      colorLocation, // attribute location represent by number
      3, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      false, // normalized
      6 * Float32Array.BYTES_PER_ELEMENT, // stride
      3 * Float32Array.BYTES_PER_ELEMENT // offset
    )

    // set the program as part of the current rendering state
    gl.useProgram(program)
    gl.enable(gl.DEPTH_TEST)

    //
    // transform matrix and anime
    //
    const uniformLocations = {
      matrix: gl.getUniformLocation(program, `matrix`)
    }

    const modelMatrix = glm.mat4.create()
    const viewMatrix = glm.mat4.create()
    const projectionMatrix = glm.mat4.create()
    const mvMatrix = glm.mat4.create()
    const mvpMatrix = glm.mat4.create()

    /*
    glm.mat4.perspective(
      projectionMatrix,
      75 * Math.PI / 100, // vertical field-of-view (angle, radians)
      this.$refs.canvas.width / this.$refs.canvas.height, // aspect W/H
      1e-4, // near cull distance
      1e4 // far cull distance
    )
    */

    glm.mat4.translate(modelMatrix, modelMatrix, [0.1, 0.08, 0])
    // glm.mat4.scale(matrix, matrix, [0.25, 0.25, 0.25])

    glm.mat4.translate(viewMatrix, viewMatrix, [1e-4, 1e-4, 1e-4])
    glm.mat4.invert(viewMatrix, viewMatrix)

    let animate = () => {
      requestAnimationFrame(animate)

      switch (this.rotation.axis + ' ' + this.rotation.direction) {
        case 'x stop':
        case 'y stop':
        case 'z stop':
          glm.mat4.identity(modelMatrix)
          break
        case 'x clockwise':
          glm.mat4.rotateX(modelMatrix, modelMatrix, Math.PI / 2 / 70)
          break
        case 'x counter-clockwise':
          glm.mat4.rotateX(modelMatrix, modelMatrix, -Math.PI / 2 / 70)
          break
        case 'y clockwise':
          glm.mat4.rotateY(modelMatrix, modelMatrix, Math.PI / 2 / 70)
          break
        case 'y counter-clockwise':
          glm.mat4.rotateY(modelMatrix, modelMatrix, -Math.PI / 2 / 70)
          break
        case 'z clockwise':
          glm.mat4.rotateZ(modelMatrix, modelMatrix, Math.PI / 2 / 70)
          break
        case 'z counter-clockwise':
          glm.mat4.rotateZ(modelMatrix, modelMatrix, -Math.PI / 2 / 70)
          break
      }

      glm.mat4.multiply(mvMatrix, viewMatrix, modelMatrix)
      glm.mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix)

      if (!gl) {
        throw new Error('WebGL not spported from requestAnimationFrame')
      }

      gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix)

      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      gl.drawArrays(gl.TRIANGLES, 0, this.vertexData.length / 3 / 2)
    }

    animate()
  }
}
</script>
