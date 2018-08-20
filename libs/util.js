var fs = require("fs");
var path = require("path");

var readdirRecursive = function (rootPath, excludeList, res) {
    res = res || [];

    var fileList = fs.readdirSync(rootPath);

    for (var i = 0; i < fileList.length; i++) {
        var filePath = path.join(rootPath, fileList[i]);
        var fileStat = fs.lstatSync(filePath);

        var isExclude = false;

        for (var j = 0; j < excludeList.length; j++) {
            if (path.normalize(filePath) == path.normalize(excludeList[j])) {
                isExclude = true;
                break;
            }
        }

        if (isExclude)
            continue;

        if (fileStat.isDirectory())
            res = readdirRecursive(filePath, excludeList, res);
        else
            res.push(filePath);
    }

    return res;
};

var util = {
    readdirRecursive: readdirRecursive
};

exports = module.exports = util;
