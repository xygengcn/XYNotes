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
            html: "<h2>测试页面</h2>"
        },
        test2: {
            name: "测试2",
            html: "<h2>测试页面2</h2>"
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