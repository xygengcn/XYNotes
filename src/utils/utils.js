var utils = {}

utils.time = function(timestamp, format = "yyyy-MM-dd HH:mm:ss") {
    if (!timestamp) return new Date().getTime();
    var date = timestamp ? new Date(timestamp) : new Date();
    var year = String(date.getFullYear()).padStart(4, "0"); //获取当前年份
    var month = String(date.getMonth() + 1).padStart(2, "0"); //获取当前月份
    var day = String(date.getDate()).padStart(2, "0"); //获取当前日 
    var weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    var weekday = weekdays[date.getDay()]; //获取当前星期几
    var hour = String(date.getHours()).padStart(2, "0"); //获取小时
    var minute = String(date.getMinutes()).padStart(2, "0"); //获取分钟
    var second = date.getSeconds().toString().padStart(2, "0"); //获取秒
    return format.replace("yyyy", year).replace("MM", month).replace("dd", day).replace("HH", hour).replace("mm", minute).replace("ss", second).replace("day", weekday);
}
utils.os = function() {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian,
        isMobie = isTablet || isPhone || isAndroid || isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
        isMobie: isMobie
    };
}
utils.timeToDate = function(dateTimeStamp) {
    var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime(); //获取当前时间毫秒
    var diffValue = now - dateTimeStamp; //时间差
    if (diffValue < 0) {
        return;
    }
    var minC = diffValue / minute; //计算时间差的分，时，天，周，月
    var hourC = diffValue / hour;
    var dayC = diffValue / day;
    var weekC = diffValue / week;
    var monthC = diffValue / month;
    if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + "月前"
    } else if (weekC >= 1 && weekC <= 3) {
        result = " " + parseInt(weekC) + "周前"
    } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚"
    } else {
        result = this.time(dateTimeStamp, 'yyyy-MM-dd HH:mm:ss');
    }
    return result;
}
//生成图片
utils.base64ImgtoFile = function(dataurl, filename = "XYNote") {
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
utils.dataToUrl = function(str) {
    const blob = new Blob([str], {
        type: ""
    });
    var URL = window.URL || window.webkitURL || window;
    return URL.createObjectURL(blob);

}
utils.download = function(content, filename) {
    // 创建a标签
    let linkNode = document.createElement('a');
    linkNode.download = filename;
    linkNode.style.display = 'none';
    // 利用Blob对象将字符内容转变成二进制数据
    let blob = new Blob([content]);
    linkNode.href = URL.createObjectURL(blob);
    // 点击
    document.body.appendChild(linkNode);
    linkNode.click();
    // 移除
    document.body.removeChild(linkNode);
};
utils.copy = function(text) {
    return new Promise(function(resolve, reject) {
        const textarea = document.createElement("textarea")
        textarea.style.position = 'fixed'
        textarea.style.top = 0
        textarea.style.left = 0
        textarea.style.border = 'none'
        textarea.style.outline = 'none'
        textarea.style.resize = 'none'
        textarea.style.background = 'transparent'
        textarea.style.color = 'transparent'
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        try {
            const msg = document.execCommand('copy') ? 'successful' : 'unsuccessful'
            resolve(msg)
        } catch (err) {
            reject(err)
        }
        document.body.removeChild(textarea)
    })
}
utils.sizeof = function(str, charset) {
    var total = 0,
        charCode, i, len;
    charset = charset ? charset.toLowerCase() : '';
    if (charset === 'utf-16' || charset === 'utf16') {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0xffff) {
                total += 2;
            } else {
                total += 4;
            }
        }
    } else {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
                total += 1;
            } else if (charCode <= 0x07ff) {
                total += 2;
            } else if (charCode <= 0xffff) {
                total += 3;
            } else {
                total += 4;
            }
        }
    }
    return total;
}
utils.isMobie = function() {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? true : false;
}
utils.reload = function() {
    window.location.reload(true);
}
exports.install = function(Vue, opt) {
    Vue.prototype.$utils = utils;
}