<template>
  <section>
    <b-row>
      <b-col>
        <div class="blue merida">
          <div ref="board" class="cg-board-wrap"></div>
          <br />
        </div>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { Chessground } from 'chessground'

export default {
  name: 'Test',
  data () {
    return {}
  },
  mounted: function () {
    let config = {
      animation: {
        duration: 1000
      },
      movable: {
        free: false
      }
    }

    Chessground(this.$refs.board, config)
    // board.redrawAll()
    // document.body.dispatchEvent(new Event('chessground.resize'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
