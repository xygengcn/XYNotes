var option = {
    id: "sync",
    options: {
        push: {
            label: "上传接口",
            value: "localhost"
        },
        pull: {
            label: "获取接口",
            value: "localhost"
        }
    }

}
// $plugins.extend("start", "sync", function(e) {
//     let notes = [{
//         "nid": 1574844708303,
//         "title": "网络笔记本",
//         "text": "XY笔记本是XY博客新尝试的一个轻量级的本地笔记本，是一款基于vue框架的笔记本，默认支持markdown语法，存储本地隐私安全，支持截图分享等。",
//         "html": "XY笔记本是XY博客新尝试的一个轻量级的本地笔记本，是一款基于vue框架的笔记本，默认支持markdown语法，存储本地隐私安全，支持截图分享等。",
//         "share": false,
//         "mark": false,
//         "reminded": "",
//         "created": 1574844788303,
//         "updated": 1574844708302
//     }]
//     this.$store.commit("setNotes", notes);
// })
$plugins.option(option).extend("start", "sync", function(e) {
    console.log(2);

})