//测试插件开发第二版
$plugins.extend({
    id: "test",
    options: {
        name: {
            label: "名称",
            value: "XY笔记"
        }
    },
    pages: {
        test: {
            name: "测试",
            html: "<h3>都说测试了，还点进来</h3>"
        }
    },
    start(option) {
        this.$notify({
            title: '你好',
            message: option.name.value,
            type: 'success'
        });
    }
})