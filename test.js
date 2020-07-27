let versionCompare = function(a, b) {
    a = a.split(".");
    b = b.split(".");
    if (a.length > b.length) {
        return true;
    } else if (a.length < b.length) {
        return false;
    } else {
        for (let key in a) {
            if (a[key] > b[key]) {
                return true;
            }
            if (a[key] < b[key]) {
                return false;
            }
        }
        return false;
    }
}

var local = [{
    id: "001",
    version: "1.0.0"
}, {
    id: "002",
    version: "1.0.0"
}]
var web = [{
    id: "001",
    version: "1.0.1"
}, {
    id: "003",
    version: "1.0.0"
}]

news = local.concat(web);

for (let i = 0; i < news.length - 1; i++) {
    for (let j = i + 1; j < news.length; j++) {
        if (news[i].id == news[j]["id"] && versionCompare(news[i].version, news[j].version)) {
            news.splice(j--, 1);
        }
        if (news[i].id == news[j]["id"] && !versionCompare(news[i].version, news[j].version)) {
            news.splice(i--, 1);
        }
    }
}

console.log(news);