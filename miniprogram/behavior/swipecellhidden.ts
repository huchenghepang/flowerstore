export const hiddenSwipeCellBehavior = Behavior({
    data: {
        swipeQuence: [] // 储存当前打开的滑块
    },
    methods: {
        // 监听滑块的开始滑动事件
        onOpenSwipe(event) {
            const { id } = event.target;

            if (this.selectComponent) {
                // 通过提供的this.selectComponent方法获取组件实例
                const instance = this.selectComponent(`#${id}`)
                this.data.swipeQuence.push(instance);
            } else {
                console.log("获取组件实例失败");
            }
        },
        // 点击其他滑块时，关掉开启的滑块
        onSwipeCellClick() {
            this.onCloseSwipe()
        },

        // 点击页面空白区域时，关掉开启的滑块
        onSwipeCellPageTap() {
            this.onCloseSwipe()
        },
        // 监听滑块的关闭滑动事件
        onCloseSwipe() {
            this.data.swipeQuence.forEach(item => {
                item.close();
            })
            // 清空滑块队列
            this.data.swipeQuence = [];
        }
    },
})