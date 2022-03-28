// 公共样式
export const commonStyle = {
    rotate: 0,
    opacity: 1
}

// 编辑器左侧组件列表
const list = [
    {
        type: 'server',
        label: '服务器',
        icon: require('@/assets/jtopo/img/icon-server.png'),
        style: {
            width: 40,
            height: 40,
            borderRadius: '',
        },
    },
    {
        type: 'switch',
        label: '交换机',
        icon: require('@/assets/jtopo/img/icon-switch.png'),
        style: {
            width: 40,
            height: 40,
            borderRadius: '',
        }
    }
]

for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    item.style = { ...commonStyle, ...item.style }
}

export default list