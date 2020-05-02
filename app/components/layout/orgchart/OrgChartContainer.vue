<template>
  <div v-bind="{ scopedSlots: $scopedSlots }"
    class="orgchart-container"
    @wheel="zoom && zoomHandler($event)"
    @mouseup="pan && panning && panEndHandler($event)"
  >
    <div
      class="orgchart"
      :style="{ transform: transformVal, cursor: cursorVal }"
      @mousedown="pan && panStartHandler($event)"
      @mousemove="pan && panning && panHandler($event)"
    >
      <org-chart-node :selected="selected" :datasource="datasource" :handle-click="handleClick" :remove="removeGroup">
        <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
          <slot :name="slot" v-bind="scope"/>
        </template>
      </org-chart-node>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import OrgChartNode from './OrgChartNode.vue'
export default {
  name: 'Container',
  props: {
    datasource: {
      type: Object,
      required: true
    },
    selected: {
        type: Number,
        required: false,
        default: 0
    },
    pan: {
      type: Boolean,
      required: false
    },
    zoom: {
      type: Boolean,
      required: false
    },
    zoomoutLimit: {
      type: Number,
      required: false,
      default: 0.5
    },
    zoominLimit: {
      type: Number,
      required: false,
      default: 7
    }
  },
  data () {
    return {
      cursorVal: 'default',
      panning: false,
      startX: 0,
      startY: 0,
      transformVal: ''
    }
  },
  components: {
    OrgChartNode
  },
  methods: {
    handleClick (nodeData) {
      this.$emit('node-click', nodeData);
    },
    removeGroup() {
        this.$swal.fire({
            title: 'Are you sure?',
            text: 'This will remove this group and all child groups!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((res) => {
            if(res.value) {
                this.$emit('removeGroup', this.groupID)
            }
        })
    },
    panEndHandler () {
      this.panning = false
      this.cursorVal = 'default'
    },
    panHandler (e) {
        let newX = 0
        let newY = 0
        if (!e.targetTouches) { // pand on desktop
          newX = e.pageX - this.startX
          newY = e.pageY - this.startY
        } else if (e.targetTouches.length === 1) { // pan on mobile device
          newX = e.targetTouches[0].pageX - this.startX
          newY = e.targetTouches[0].pageY - this.startY
        } else if (e.targetTouches.length > 1) {
          return;
        }
        if (this.transformVal === '') {
          if (this.transformVal.indexOf('3d') === -1) {
            this.transformVal = 'matrix(1,0,0,1,' + newX + ',' + newY + ')'
          } else {
            this.transformVal = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + newX + ', ' + newY + ',0,1)'
          }
        } else {
          let matrix = this.transformVal.split(',')
          if (this.transformVal.indexOf('3d') === -1) {
            matrix[4] = newX
            matrix[5] = newY + ')'
          } else {
            matrix[12] = newX
            matrix[13] = newY
          }
          this.transformVal = matrix.join(',')
        }
    },
    panStartHandler (e) {
      if ($(e.target).closest('.node').length) {
        this.panning = false
        return
      } else {
        this.cursorVal = 'move'
        this.panning = true
      }
      let lastX = 0
      let lastY = 0
      if (this.transformVal !== '') {
        let matrix = this.transformVal.split(',')
        if (this.transformVal.indexOf('3d') === -1) {
          lastX = parseInt(matrix[4])
          lastY = parseInt(matrix[5])
        } else {
          lastX = parseInt(matrix[12])
          lastY = parseInt(matrix[13])
        }
      }
      if (!e.targetTouches) { // pand on desktop
        this.startX = e.pageX - lastX
        this.startY = e.pageY - lastY
      } else if (e.targetTouches.length === 1) { // pan on mobile device
        this.startX = e.targetTouches[0].pageX - lastX
        this.startY = e.targetTouches[0].pageY - lastY
      } else if (e.targetTouches.length > 1) {
        return
      }
    },
    setChartScale (newScale) {
      let matrix = ''
      let targetScale = 1
      if (this.transformVal === '') {
        this.transformVal = 'matrix(' + newScale + ', 0, 0, ' + newScale + ', 0, 0)'
      } else {
        matrix = this.transformVal.split(',')
        if (this.transformVal.indexOf('3d') === -1) {
          targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale)
          if (targetScale > this.zoomoutLimit && targetScale < this.zoominLimit) {
            matrix[0] = 'matrix(' + targetScale
            matrix[3] = targetScale
            this.transformVal = matrix.join(',')
          }
        } else {
          targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale)
          if (targetScale > this.zoomoutLimit && targetScale < this.zoominLimit) {
            matrix[0] = 'matrix3d(' + targetScale
            matrix[5] = targetScale
            this.transformVal = matrix.join(',')
          }
        }
      }
    },
    zoomHandler (e) {
      let newScale  = 1 + (e.deltaY > 0 ? -0.2 : 0.2)
      this.setChartScale(newScale)
    }
  }
};
</script>

<style>
.orgchart-container {
  position: relative;
  display: inline-block;
  height: fit-content;
  width: 100%;
  border-radius: 5px;
  overflow: auto;
  text-align: center;
}
.orgchart {
  box-sizing: border-box;
  display: inline-block;
  min-height: 202px;
  min-width: 202px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 20px;
}
.orgchart .hidden,
.orgchart ~ .hidden {
  display: none;
}
.orgchart.b2t {
  transform: rotate(180deg);
}
.orgchart.l2r {
  position: absolute;
  transform: rotate(-90deg) rotateY(180deg);
  transform-origin: left top;
}
.orgchart .verticalNodes ul {
  list-style: none;
  margin: 0;
  padding-left: 18px;
  text-align: left;
}
.orgchart .verticalNodes ul:first-child {
  margin-top: 2px;
}
.orgchart .verticalNodes > td::before {
  content: "";
  border: 1px solid rgba(13, 46, 66, 0.8);
}
.orgchart .verticalNodes > td > ul > li:first-child::before {
  box-sizing: border-box;
  top: -4px;
  height: 30px;
  width: calc(50% - 2px);
  border-width: 2px 0 0 2px;
}
.orgchart .verticalNodes ul > li {
  position: relative;
}
.orgchart .verticalNodes ul > li::before,
.orgchart .verticalNodes ul > li::after {
  box-sizing: border-box;
  content: "";
  position: absolute;
  left: -6px;
  border-color: rgba(13, 46, 66, 0.8);
  border-style: solid;
  border-width: 0 0 2px 2px;
}
.orgchart .verticalNodes ul > li::before {
  top: -4px;
  height: 30px;
  width: 11px;
}
.orgchart .verticalNodes ul > li::after {
  top: 1px;
  height: 100%;
}
.orgchart .verticalNodes ul > li:first-child::after {
  box-sizing: border-box;
  top: 24px;
  width: 11px;
  border-width: 2px 0 0 2px;
}
.orgchart .verticalNodes ul > li:last-child::after {
  box-sizing: border-box;
  border-width: 2px 0 0;
}
.orgchart.r2l {
  position: absolute;
  transform: rotate(90deg);
  transform-origin: left top;
}
.orgchart > .spinner {
  font-size: 100px;
  margin-top: 30px;
  color: rgba(68, 157, 68, 0.8);
}
.orgchart table {
  border-spacing: 0;
  border-collapse: separate;
}
.orgchart > table:first-child {
  margin: 20px auto;
}
.orgchart td {
  text-align: center;
  vertical-align: top;
  padding: 0;
}
.orgchart .lines:nth-child(3) td {
  box-sizing: border-box;
  height: 20px;
}
.orgchart .lines .topLine {
  border-top: 2px solid rgba(84, 111, 132, 0.8);
}
.orgchart .lines .rightLine {
  border-right: 1px solid rgba(84, 111, 132, 0.8);
  float: none;
  border-radius: 0;
}
.orgchart .lines .leftLine {
  border-left: 1px solid rgba(84, 111, 132, 0.8);
  float: none;
  border-radius: 0;
}
.orgchart .lines .downLine {
  background-color: rgba(84, 111, 132, 0.8);
  margin: 0 auto;
  height: 20px;
  width: 2px;
  float: none;
}
/* node styling */

</style>
