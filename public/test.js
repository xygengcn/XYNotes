// xy.say.prototype.hello=function(state){
//     console.log(this.name);
// }

var hello=function(to,from){
      //  console.log(from);
}
xy.extend("beforeEach",hello);

xy.extend("start",function(){
    console.log(this);
});