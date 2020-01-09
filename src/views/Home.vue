<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>3D Gasket 2 Mobile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-items center>
        <ion-button @click="changeGasketTypeSurface" color="primary">Surface Subdivision</ion-button>
        <ion-button @click="changeGasketTypeVolume" color="secondary">Volumne Subdivision</ion-button>
      </ion-items>
        <ion-item>
          <ion-label>Subdivision Level</ion-label>
          <ion-select value="4" @ionChange="changeSubdivisionLevel($event.target.value)" placeholder="4">
            <ion-select-option value="2">2</ion-select-option>
            <ion-select-option value="3">3</ion-select-option>
            <ion-select-option value="4">4</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Rotation Axis</ion-label>
          <ion-select value="x" @ionChange="changeRotationAxis($event.target.value)" placeholder="x">
            <ion-select-option value="x">x</ion-select-option>
            <ion-select-option value="y">y</ion-select-option>
            <ion-select-option value="z">z</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Rotation Direction</ion-label>
          <ion-select value="clockwise" @ionChange="changeRotationDirection($event.target.value)" placeholder="Clockwise">
            <ion-select-option value="stop">Stop</ion-select-option>
            <ion-select-option value="clockwise">Clockwise</ion-select-option>
            <ion-select-option value="counter-clockwise">Counter-Clockwise</ion-select-option>
          </ion-select>
        </ion-item>

        <WebGLCanvas :gasketInitalVertex = "gasketInitalVertex" :gasketType = "gasketType" :gasketDivisionCount = "gasketDivisionCount" :rotation = "rotation"/>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-title>Footer</ion-title>
      </ion-toolbar>
    </ion-footer>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import WebGLCanvas from '@/components/WebGLCanvas.vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import { addIcons } from 'ionicons'
import { settings } from 'ionicons/icons'
addIcons({
  'ios-settings': settings.ios,
  'md-settings': settings.md
})

interface Point {
  x: number,
  y: number,
  z: number
}

@Component({
  components: {
    WebGLCanvas
  }
})
export default class Home extends Vue {
  gasketInitalVertex: [Point, Point, Point, Point] = [
    { x: 0.0, y: 1.0, z: 0.0 },
    { x: 0.0, y: -0.33333, z: 0.942809 },
    { x: -0.816497, y: -0.33333, z: -0.471405 },
    { x: 0.816497, y: -0.33333, z: -0.471405 }
  ]
  gasketType: string = 'volumeSubdivision'
  gasketDivisionCount: number = 4
  rotation = {
    axis: 'x', // x, y, z
    direction: 'clockwise' // stop, clockwise, counter-clockwise
  }
  buttons = ['dsfoai', 'djsafl']

  changeSubdivisionLevel (gasketDivisionCount :number) {
    console.log(`Change subdivisionLevel into ${gasketDivisionCount}`)
    this.gasketDivisionCount = gasketDivisionCount
  }
  changeRotationAxis (rotationAxis :string) {
    console.log(`Change axis rotation into ${rotationAxis}`)
    this.rotation.axis = rotationAxis
  }
  changeRotationDirection (rotationDirection :string) {
    console.log(`Change rotation direction into ${rotationDirection}`)
    this.rotation.direction = rotationDirection
  }
  changeGasketTypeSurface () {
    console.log(`Change gasket type into surface subdivision`)
    this.gasketType = 'surfaceSubdivision'
  }
  changeGasketTypeVolume () {
    console.log(`Change gasket type into volume subdivision`)
    this.gasketType = 'volumeSubdivision'
  }
}
</script>
