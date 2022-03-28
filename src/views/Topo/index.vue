<template>
  <div>
    <div class="home">
      <!-- <Toolbar /> -->
      <main>
        <!-- 左侧组件列表 -->
        <section class="left">
          <ComponentList />
        </section>
        <!-- 中间画布 -->
        <section class="center" id="center">
          <canvas id="canvas" @drop="handleDrop" @dragover="handleDragOver" />
          <!-- <div
            class="content"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @mousedown="handleMouseDown"
            @mouseup="deselectCurComponent"
          > -->
          <!-- <Editor /> -->
          <!-- </div> -->
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import ComponentList from "@/components/ComponentList"; // 左侧列表组件
// import AttrList from '@/components/AttrList' // 右侧属性列表
// import AnimationList from '@/components/AnimationList' // 右侧动画列表
// import componentList from '@/custom-component/component-list' // 左侧列表数据
const JTopo = window.JTopo;
import { generateUUID } from "@/utils/index.js";
// import  * as Editor from '@/assets/jtopo/jtopo-editor.js'
export default {
  name: "Topo",
  components: { ComponentList },

  props: {
    msg: String,
  },
  data() {
    return {
      canvas: null, //画布
      stage: null, // 舞台
      scene: null, // 场景
      startNode: null,
      endNode: null,
      lineStart: null, //画线起点
      lineEnd: null, // 画线终点
      lineType: "line", // 连线类型
      link: null, // 连线
      currentNode: {}, // 当前节点
      currentLink: {}, //当前连线
    };
  },
  created() {},
  mounted() {
    let center = document.getElementById("center");
    let canvas = document.getElementById("canvas");
    canvas.width = Math.floor(center.offsetWidth - 10);
    canvas.height = Math.floor(center.offsetHeight - 10);
    this.stage = new JTopo.Stage(canvas); // 创建一个舞台对象
    this.scene = new JTopo.Scene(this.stage); // 创建一个场景对象
    this.lineStart = new JTopo.Node();
    this.lineStart.setSize(1, 1);
    this.lineEnd = new JTopo.Node();
    this.lineEnd.setSize(1, 1);
    this.link = new JTopo.Link(this.lineStart, this.lineEnd);
    this.scene.mouseup((e) => {
      if (e.button == 2) {
        this.scene.remove(this.link);
        return;
      }
      if (e.target != null && e.target instanceof JTopo.Node) {
        if (this.startNode == null) {
          this.startNode = e.target;
          this.scene.add(this.link);
          this.lineStart.setLocation(e.x, e.y);
          this.lineEnd.setLocation(e.x, e.y);
        } else if (this.startNode !== e.target) {
          this.endNode = e.target;
          let link = new JTopo.Link(this.startNode, this.endNode);
          this.scene.add(link);
          this.startNode = null;
          this.scene.remove(this.link);
        } else {
          this.startNode = null;
        }
      } else {
        this.startNode = null;
        this.scene.remove(this.link);
      }
    });

    this.scene.mousedown((e) => {
      if (
        e.target == null ||
        e.target === this.startNode ||
        e.target === this.link
      ) {
        this.scene.remove(this.link);
      }
    });
    this.scene.mousemove((e) => {
      this.lineEnd.setLocation(e.x, e.y);
    });
  },
  methods: {
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      let node = new JTopo.Node();
      let nodeData = JSON.parse(e.dataTransfer.getData("text"));
      // 节点坐标
      node.setBound(
        e.offsetX,
        e.offsetY,
        nodeData.style.width,
        nodeData.style.height
      );
      // 节点图片
      node.setImage(nodeData.icon);
      // 节点数据
      node.nodeId = generateUUID();
      node.nodeType = nodeData.type;
      node.text = nodeData.label;
      node.fontColor = "0,0,0";
      node.nodeImage = nodeData.icon;
      this.scene.add(node);
      this.currentNode = node;
    },

    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding-top: 10px;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 200px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      text-align: center;
      .canvas {
        margin: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>
