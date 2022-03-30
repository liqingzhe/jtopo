<template>
    <div class="toolbar">
        <el-button @click="showPic">预览</el-button>
        <el-button @click="showFullScreen">全屏</el-button>
        <el-button @click="downloadImg">下载图片</el-button>
        <el-button @click="saveJson">保存数据</el-button>
        <el-button @click="clearCanvas">清空画布</el-button>
    </div>
</template>
<script>
import JtopoEditor from "@/utils/jtopo-editor.js";
export default {
    name: "ToolBar",
    components: {},
    props: {
        stage: {
            type: Object,
            default: () => {},
        },
        scene: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {};
    },

    created() {},
    methods: {
        showPic() {
            JtopoEditor.showPic(this.stage);
        },
        // 全屏展示
        showFullScreen() {
            JtopoEditor.showInFullScreen(
                this.stage.canvas,
                "RequestFullScreen"
            );
        },
        // canvas下载为图片
        downloadImg() {
            JtopoEditor.downloadImg(this.stage);
        },
        saveJson() {},
        clearCanvas() {
            JtopoEditor.clearNodes(this.scene);
        },
    },
};
</script>

<style lang="scss" scoped>
.toolbar {
    height: 64px;
    line-height: 64px;
    background: #fff;
    border-bottom: 1px solid #ddd;

    .canvas-config {
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;
        color: #606266;

        input {
            width: 50px;
            margin-left: 10px;
            outline: none;
            padding: 0 5px;
            border: 1px solid #ddd;
            color: #606266;
        }

        span {
            margin-left: 10px;
        }
    }

    .insert {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        margin-left: 10px;

        &:active {
            color: #3a8ee6;
            border-color: #3a8ee6;
            outline: 0;
        }

        &:hover {
            background-color: #ecf5ff;
            color: #3a8ee6;
        }
    }
}
</style>