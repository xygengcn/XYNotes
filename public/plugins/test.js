// $_plugins.extend("beforeEach", "hello", function(to, from) {

// });

// $_plugins.extend("afterEach", "hello", function(to, from) {

// });


var data = [{
    element: "ul",
    childs: [{
        element: "li",
        innerText: "hah",
    }, {
        element: "li",
        innerText: "hah",
    }, {
        element: "li",
        innerText: "hah",
    }, {
        element: "li",
        innerText: "hah",
    }]
}]

var option = {
    id: "test",
    options: {
        name: {
            label: "名称",
            value: "XY笔记"
        },
        title: "hah",
        id: {
            label: "ID",
            value: "1234"
        }
    },
    pages: {
        test: {
            name: "测试",
            html: "<h2>1234</h2>"
        },
        test2: {
            name: "测试2",
            html: "滚啊"
        }
    }
}

$plugins.option(option).extend("start", "test", function(option) {
    console.log(1);
    // this.$notify({
    //     title: '你好',
    //     message: option.name.value,
    //     type: 'success'
    // });
})
$plugins.extend("enterPage", "test", function(option, page) {
    page("test2", "<h2>haha</h2>");
})
$plugins.extend("saved", "test", function(option, note) {
    console.log(1);
})