// xy.say.prototype.hello=function(state){
//     console.log(this.name);
// }

var hello = function (to, from, next, routes) {

}
//vue.$plugins.extend("beforeEach", hello);

vue.$plugins.extend("beforeEach", function (e) {
    //console.log(e);

    // vue.$notify({
    //       title: '早上好',
    //       message: '欢迎庚哥哥回来',
    //       type: 'success'
    // });
});