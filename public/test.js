// $_plugins.extend("beforeEach", "hello", function(to, from) {

// });

// $_plugins.extend("afterEach", "hello", function(to, from) {

// });
var option = {
    id: "test",
    api: {
        label: "接口地址",
        value: "localhost"
    },
    //type: "post"
}
$_plugins.option(option).extend("start", "hello", function() {});
$_plugins.extend("start", "hellos", function(e) {
    console.log(e);

})