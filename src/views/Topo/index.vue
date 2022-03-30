<template>
    <div class="home">
        <Toolbar :stage="stage" :scene="scene" />
        <main>
            <!-- 左侧组件列表 -->
            <section class="left">
                <div draggable @dragstart="handleDragText($event)">文本</div>
                <ComponentList />
            </section>
            <!-- 中间画布 -->
            <section class="center" id="center">
                <v-text
                    ref="vText"
                    v-if="showInput"
                    :style="setInputPosition()"
                    class="input-text"
                    :node="inputNode"
                    @handleBlur="inputBlur"
                />
                <canvas
                    class="canvas"
                    id="canvas"
                    @drop="handleDrop"
                    @dragover="handleDragOver"
                />
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
</template>

<script>
import ComponentList from "@/components/ComponentList"; // 左侧列表组件
import VText from "@/components/VText.vue"; // 左侧列表组件
import Toolbar from "@/components/Toolbar"; // 右侧属性列表
// import AnimationList from '@/components/AnimationList' // 右侧动画列表
// import componentList from '@/custom-component/component-list' // 左侧列表数据
const JTopo = window.JTopo;
import { generateUUID } from "@/utils/index.js";
// import  * as Editor from '@/assets/jtopo/jtopo-editor.js'
export default {
    name: "Topo",
    components: { ComponentList, VText, Toolbar },

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
            showInput: false,
            inputNode: {
                propValue: "文本",
            },
            inputTextPosition: {
                top: 0,
                left: 0,
            },
        };
    },
    created() {},
    mounted() {
        let canvas = document.getElementById("canvas");
        this.setCanvasArea(canvas);
        window.addEventListener("resize", () => {
            this.setCanvasArea(canvas);
        });
        this.stage = new JTopo.Stage(canvas); // 创建一个舞台对象
        this.scene = new JTopo.Scene(this.stage); // 创建一个场景对象
        this.lineStart = new JTopo.Node();
        this.lineStart.setSize(1, 1);
        this.lineEnd = new JTopo.Node();
        this.lineEnd.setSize(1, 1);
        this.link = new JTopo.FoldLink(this.lineStart, this.lineEnd);
        this.link.arrowsRadius = 5; //箭头大小
        // this.stage.mode = "edit";
        this.scene.mouseup((e) => {
            if (e.button == 2) {
                this.scene.remove(this.link);
                return;
            }
            if (
                e.target != null &&
                e.target instanceof JTopo.Node &&
                e.target.nodeType != "Text"
            ) {
                if (this.startNode == null) {
                    // 起始点
                    this.startNode = e.target;
                    this.scene.add(this.link);
                    this.lineStart.setLocation(e.x, e.y);
                    this.lineEnd.setLocation(e.x, e.y);
                } else if (this.startNode !== e.target) {
                    // 终点
                    this.endNode = e.target;
                    let link = new JTopo.FoldLink(this.startNode, this.endNode);
                    link.arrowsRadius = 5; //箭头大小
                    this.scene.add(link);
                    this.startNode = null;
                    this.scene.remove(this.link);
                } else {
                    // 起点终点设置成了同一个点
                    this.startNode = null;
                    this.scene.remove(this.link);
                }
            } else {
                // 点击非节点区域
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
                // this.startNode = null;
                this.scene.remove(this.link);
            }
        });
        this.scene.mousemove((e) => {
            this.lineEnd.setLocation(e.x, e.y);
        });
        // 鼠标移出舞台
        this.stage.mouseout(() => {
            // 删掉节点带出来的连线
            this.startNode = null;
            this.scene.remove(this.link);
        });
    },
    methods: {
        setCanvasArea(canvas) {
            let center = document.getElementById("center");
            canvas.width = Math.floor(center.offsetWidth - 10);
            canvas.height = Math.floor(center.offsetHeight - 10);
        },
        setInputPosition() {
            return `left:${this.inputTextPosition.left}px;top: ${this.inputTextPosition.top}px;`;
        },
        inputBlur(value) {
            if (value) {
                this.addTextNode(this.inputTextPosition, value);
            }
            this.showInput = false;
        },
        addTextNode(location, value) {
            let textNode = new JTopo.TextNode(value);
            textNode.setLocation(location.left, location.top);
            textNode.fontColor = "123,222,234";
            textNode.nodeType = "Text";
            this.scene.add(textNode);
            textNode.dbclick((e) => {
                this.scene.remove(textNode);
                this.showInput = true;
                this.inputTextPosition.left = e.offsetX;
                this.inputTextPosition.top = e.offsetY;
            });
        },
        handleDragText(e) {
            e.dataTransfer.setData("text", JSON.stringify({ type: "Text" }));
        },
        handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            let node = new JTopo.Node();
            let nodeData = JSON.parse(e.dataTransfer.getData("text"));
            if (nodeData.type == "Text") {
                this.showInput = true;
                this.inputTextPosition = {
                    left: e.offsetX,
                    top: e.offsetY,
                };
                return;
            }
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
            // node.editAble = nodeData.editAble || true
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
            position: relative;
            .canvas {
                margin: auto;
                background-color: #fff;
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }
    .input-text {
        position: absolute;
        left: 0;
        right: 0;
    }
}
</style>
