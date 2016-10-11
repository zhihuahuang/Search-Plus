var suggestHistory = {}

exports.getSuggest = function (word, callback) {
    // 没有输入词则返回
    if (!word) {
        return;
    }

    callback = callback || function () {};

    if (!suggestHistory[word]) {
        suggestHistory[word] = {};
    }

    // 360 Suggest
    if (suggestHistory[word]['360']) {
        callback(null, suggestHistory[word]['360']);
    } else {
        $.getJSONP('http://sug.so.360.cn/suggest', {
            encodein: 'utf-8',
            encodeout: 'utf-8',
            word: word
        }, {
            jsonp: 'callback',
            jsonpCallback: 'jsonp360'
        }, function (jsonp) {
            suggestHistory[word]['360'] = {
                word: jsonp.q,
                suggest: jsonp.s,
                from: '360'
            };

            callback(null, suggestHistory[word]['360']);
        });
    }

    // Sogou
    if (suggestHistory[word]['sogou']) {
        callback(null, suggestHistory[word]['sogou']);
    } else {
        $.getJSONP('https://www.sogou.com/suggnew/ajajjson', {
            key: word,
            type: 'web'
        }, {
            jsonpCallback: 'jsonpSogou'
        }, function (jsonp) {
            suggestHistory[word]['sogou'] = {
                word: jsonp[0],
                suggest: jsonp[1],
                from: 'sogou'
            };
            callback(null, suggestHistory[word]['sogou']);
        });
    }

    // Baidu Suggest
    if (suggestHistory[word]['baidu']) {
        callback(null, suggestHistory[word]['baidu']);
    } else {
        $.getJSONP('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
            wd: word
        }, {
            jsonp: 'cb',
            jsonpCallback: 'jsonpBaidu'
        }, function (jsonp) {
            suggestHistory[word]['baidu'] = {
                word: jsonp.q,
                suggest: jsonp.s,
                from: 'baidu'
            };
            callback(null, suggestHistory[word]['baidu']);
        });
    }
}