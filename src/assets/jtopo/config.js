export default {
    // Stage属性
    stageMode: 'edit',
    stageFrames: 500,                       // 舞台播放的帧数/秒
    defaultScal: 0.95,                      // 鼠标滚轮缩放比例
    eagleEyeVsibleDefault: false,         // 是否显示鹰眼对象
    // Node属性
    nodeAlpha: 1,                           // 节点透明度,取值范围[0-1]
    nodeStrokeColor: '22,124,255',        // 节点描边的颜色
    nodeFillColor: '22,124,255',          // 节点填充颜色
    nodeShadow: false,                     // 节点是否显示阴影
    nodeShadowColor: 'rgba(0,0,0,0.5)',  // 节点阴影的颜色
    nodeFont: '12px Consolas',            // 节点字体
    nodeFontColor: 'black',               // 节点文字颜色,如"255,255,0"
    nodeDefaultWidth: 32,                 // 新建节点默认宽
    nodeDefaultHeight: 32,                // 新建节点默认高
    nodeBorderColor: 'black',            // 节点容器边框颜色,如"255,255,0"
    nodeBorderRadius: 30,                // 节点半径，非圆节点有此属性会变形
    nodeRotateValue: 0.5,                // 节点旋转的角度(弧度)
    nodeScale: 0.2,                       // 节点缩放幅度(此处保证X和Y均等缩放)
    // Link属性
    linkAlpha: 1,                         // 连线透明度,取值范围[0-1]
    linkStrokeColor: '123,165,241',     // 连线的颜色
    linkFillColor: '123,165,241',
    linkShadow: false,                   // 是否显示连线阴影
    linkShadowColor: 'rgba(0,0,0,0.5)',
    linkFont: '12px Consolas',           // 节点字体
    linkFontColor: 'black',              // 连线文字颜色,如"255,255,0"
    linkArrowsRadius: 8,                 // 线条箭头半径
    linkDefaultWidth: 3,                 // 连线宽度
    linkOffsetGap: 40,                   // 折线拐角处的长度
    linkDirection: 'horizontal',        // 折线的方向
    // Container属性
    containerAlpha: 1,
    containerStrokeColor: '22,124,255',
    containerFillColor: '22,124,255',
    containerShadow: false,
    containerShadowColor: 'rgba(0,0,0,0.5)',
    containerFont: '12px Consolas',
    containerFontColor: 'black',
    containerBorderColor: 'black',
    containerBorderRadius: 30
}