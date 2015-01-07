'use strict';
var request = require('request')

var regexs = {
    online: /<p\s*class="users\-online[^>]+>\s*<span class="number">~(\d+)[\s\S]*?<\/p>/,
    total: /<span\s*class="subscribers"\s*>\s*<span class="number">(\d+)[\s\S]*?<\/span>/
}
var redditHost = 'http://www.reddit.com'

module.exports = {
    board: function (board, callback) {
        request(redditHost + '/r/' + board, function (err, res, body) {
            if (!err) {
                var onlineMatches = regexs.online.exec(body)
                var totlMatches = regexs.total.exec(body)
                if (onlineMatches && totlMatches) return callback(null, {
                    online: Number(onlineMatches[1]),
                    total: Number(onlineMatches[1])
                })
                err = new Error("Parse html fail !")
            }
            callback(err)
        })
    }
}