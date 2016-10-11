/**
 * Suggest Module
 *
 * Event:
 *
 *   suggest-refresh
 *   suggest-select  当选择一个
 */
var KEY = [1,2,3,4,5,6,7,8,9,0,'Q','W','E','R','T','Y','U','I','O','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];

// Var
var globalSuggest = {};
var suggestService = require('./suggest');
var _ = require('../utils');

var $window = $(window);

// View
var $suggestList = $('#suggest_list');
var TPL_SUGGEST = $suggestList.html();

// Function
function showSuggest(err, data) {
    // 防止网络请求慢导致Suggest不正确
    if (data.word != globalSuggest.word) {
        return;
    }
    // 如果查询词和Suggest列表都为空，则返回
    if (data.suggest.length + $suggestList.children().length < 1) {
        $suggestList.attr('hidden', true);
        return;
    }

    // Map 去重
    data.suggest.forEach(function (item) {
        if (item && !item.match(/\s/) && !globalSuggest.map[item]) {
            // Suggest 去重
            globalSuggest.map[item] = {
                suggest: item,
                from: data.from
            };
        }
    });

    // Map to List
    var list = [];
    for(var i in globalSuggest.map) {
        list.push(globalSuggest.map[i]);
    }

    // 渲染列表
    var html = '';
    list.sort(function(a, b) {
        a = a.suggest;
        b = b.suggest;
        return (a.length - b.length) || -a.localeCompare(b);
    }).forEach(function(item, index) {
        var key = {name: KEY[index]};
        key.code = (''+key.name).charCodeAt();

        html += _.template(TPL_SUGGEST, {
            key: key,
            suggest: item.suggest,
            from: item.from,
        });
    });

    $suggestList.html('').append(html).removeAttr('hidden');
}

function suggestHandler(text) {
    // 兼容 EventHandler 的写法
    var word = (text.substr(0, this.selectionStart).match(/[^\s\+]\S*$/i) || [''])[0];

    // 避免重复查询词
    if (word == globalSuggest.word) {
        return;
    }

    globalSuggest = {
        word: word,
        index: 0,
        map: {}
    }

    $suggestList.attr('hidden', true).html('');

    suggestService.getSuggest(word, showSuggest);
}

function replaceSuggest(suggest) {
    if (suggest) {
        $window.trigger('suggest-select', suggest);
        $suggestList.removeClass('active');
        // 再次查询 Suggest
        suggestHandler(suggest);
    }
}

// Sogou
window.jsonpBaidu = window.jsonp360 = window.jsonpSogou = function () {};
window.sogou = {
    sug: function (data) {
        window.jsonpSogou(data);
    }
};

// Inner Event
function selectSuggest($item) {
    if ($item.hasClass('suggest')) {
        replaceSuggest($item.addClass('keydown').text());
    }
}

$suggestList.click(function (event) {
    selectSuggest($(event.target));
});

// Accept Event
$window.on({
    'suggest-reload': function (event, text) {
        suggestHandler(text);
    },
    'suggest-focus': function () {
        $suggestList.addClass('active');
    },
    'suggest-blur': function () {
        $suggestList.removeClass('active');
    },
    'suggest-keydown': function (event, keyCode) {
        selectSuggest($suggestList.find('[data-key-code="' + keyCode + '"]'));
    }
});

// $window.on('suggest-')

