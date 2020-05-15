var utils = {}

utils.getTime = function (timestamp, format) {
    var date = timestamp ? timestamp : new Date();
    var timestamp = date.getTime();
    var year = String(date.getFullYear()).padStart(4, "0"); //获取当前年份
    var month = date.getMonth() + 1; //获取当前月份
    var day = date.getDate(); //获取当前日
    var weekday = date.getDay(); //获取当前星期几
    var hour = date.getHours(); //获取小时
    var minute = date.getMinutes(); //获取分钟
    var second = date.getSeconds().toString().padStart(2, "0"); //获取秒
    switch (format) {
        case 'yyy-MM-dd HH:mm:ss':
            return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            break;
        case 'yyy-MM-dd':
            return year + "-" + month + "-" + day;
            break;
        case 'HH:mm:ss':
            return hour + ":" + minute + ":" + second;
            break;
        default:
            return timestamp;
            break;
    }
}
//生成图片
utils.base64ImgtoFile = function (dataurl, filename = "XYNote") {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let suffix = mime.split("/")[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
    });
}
//转url
utils.dataToUrl = function (str) {
    const blob = new Blob([str], {
        type: ""
    });
    var URL = window.URL || window.webkitURL || window;
    return URL.createObjectURL(blob);

}
exports.install = function (Vue, opt) {
    Vue.prototype.$utils = utils;
}