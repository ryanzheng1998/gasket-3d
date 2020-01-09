</<template>
  <div>
    <GasketVolumeSubdivision :gasketInitalVertex = "gasketInitalVertex" :gasketDivisionCount = "gasketDivisionCount" :rotation = "rotation" v-if="gasketType == 'volumeSubdivision'"/>
    <GasketSurfaceSubdivision :gasketInitalVertex = "gasketInitalVertex" :gasketDivisionCount = "gasketDivisionCount" :rotation = "rotation" v-if="gasketType == 'surfaceSubdivision'"/>
  </div>
</template>

<script lang="ts">
import GasketVolumeSubdivision from '@/components/GasketVolumeSubdivision.vue'
import GasketSurfaceSubdivision from '@/components/GasketSurfaceSubdivision.vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

interface Point {
  x: number,
  y: number,
  z: number
}

@Component({
  components: {
    GasketVolumeSubdivision,
    GasketSurfaceSubdivision
  }
})
export default class WebGLCanvas extends Vue {
  @Prop() gasketInitalVertex!: [Point, Point, Point, Point]
  @Prop() gasketType!: string
  @Prop() gasketDivisionCount!: number
  @Prop() rotation!: {axis: string, direction: string}

  mounted () {
    console.log('WebGLCanvas mounted')
  }
}
</script>
