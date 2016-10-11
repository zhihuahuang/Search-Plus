module.exports = function (config) {
    var keywordMap = {};
        regexpList = [];

    for (var key in config) {
        var item = config[key];

        if (item.match) {
            regexpList.push({
                match: item.match,
                engine: key
            });
        }

        if ('keywords' in item) {
            var keywords = item.keywords;
            for (var i = 0, len = keywords.length; i < len; ++i) {
                var word = keywords[i];
                if (!(word in keywordMap)) {
                    keywordMap[word] = key;
                }
            }
        }
    }

    return {
        matchEngine: matchEngine,
        getEngine: getEngine
    };

    /**
     * 返回匹配的引擎
     * @param word
     * @returns {*}
     */
    function matchEngine(word) {
        if (!/^\s*$/.test(word)) {
            if (word in keywordMap) {
                return keywordMap[word];
            }
            else {
                for (var i = 0, len = regexpList.length; i < len; i++) {
                    if (word.match(new RegExp('^(' + regexpList[i].match + ')$', 'i'))) {
                        return regexpList[i].engine;
                    }
                }
            }
        }

        return null;
    }

    /**
     * 返回匹配引擎的名称
     */
    function getEngine(name) {
        return config[name];
    }
};