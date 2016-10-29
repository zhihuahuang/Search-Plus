// Main
(function () {
    require('./common');

    var _ = require('./utils');

    var $window = $(window);

    var searchConfig;

    var $searchForm = $('#search_form'),
        $searchButton = $searchForm.find('button');

    var $searchLabelWrapper = $('.search-label-wrapper');

    var $searchTextbox = $('.search-textbox').on('input change', function (event) {
        var text = $searchTextbox.val();

        if(/^\s*\S+\s+/.test(text)) {
            appendKeyword(text);
        }

        $(window).trigger('suggest-reload', text);

    }).on('keydown', function (event) {
        // Backspace
        if (event.keyCode == 8 && $searchTextbox.val() == '') {
            event.preventDefault();
            var $lastLabel = $searchLabelWrapper.children().last();
            var text = $lastLabel.text();

            var lastSpaceIndex =  text.lastIndexOf(' '); // 最后一个空格的位置
            if (lastSpaceIndex >= 0) {
                $lastLabel.text(text.substr(0, lastSpaceIndex));
                text = text.substr(lastSpaceIndex + 1);
            }
            else {
                $lastLabel.remove();
            }

            $searchTextbox.val(text);
        }
    });

    $window.on('suggest-select', function (event, suggest) {
        $searchTextbox.val(suggest).focus();
    });

    // On Key
    $searchButton.on({
        keydown: function (event) {
            // Break
            if (event.keyCode == 8) {
                event.preventDefault();
            }
            // Tab
            else if (event.keyCode == 9) {
                event.preventDefault();
                $window.trigger('suggest-blur');
                $searchTextbox.focus();
            }
            // !Enter
            else if (event.keyCode != 13) {
                event.preventDefault();
                $window.trigger('suggest-keydown', event.keyCode);
            }
        },
        keyup: function (event) {
            if (event.keyCode == 9) {
                $window.trigger('suggest-focus');
                return false;
            }
        }
    });

    /**
     *
     * @param text
     */
    function appendKeyword(text) {
        if (/^\s*$/.test(text)) {
            return;
        }

        var $lastLabel = $searchLabelWrapper.children().last();

        // 按空白符切割
        text.trim().split(/\s+/).forEach(function (word) {
            var engineName = searchConfig.matchEngine(word);
            if(engineName) {
                var color = searchConfig.getEngine(engineName).color || '#999';
                $lastLabel = $('<label>').text(word).attr('data-engine', engineName).css({
                    'background': color,
                    'border-color': color
                });
                $searchLabelWrapper.append($lastLabel);
            }
            // 上一个标签不存在 或者 是关键词
            else if (!$lastLabel.length || $lastLabel.attr('data-engine')) {
                $lastLabel = $('<label>').text(word);
                $searchLabelWrapper.append($lastLabel);
            }
            else {
                $lastLabel.text($lastLabel.text() + ' ' + word);
            }
        });
        $searchTextbox.val('');
    }
    
    // Get Search Config
    async.reduce(['data/search.default.json', 'data/search.develop.json', 'data/search.design.json'], {}, function(memo, item, callback) {
        $.getJSON(item, function (json) {
            for (var key in json) {
                memo[key] = json[key];
            }
            callback(null, memo);
        });
    }, function(err, result) {
        searchConfig = new (require('./search/config'))(result);

        var searcher = new (require('./search/index'))(result);

        $searchForm.submit(function (event) {
            event.preventDefault();

            appendKeyword($searchTextbox.val());

            var engines = [],
                querys = [];

            $searchLabelWrapper.children().each(function (index, element) {
                var $element = $(element);
                var engine = $element.attr('data-engine');
                if (engine) {
                    engines.push(engine);
                }
                else {
                    querys.push($element.text());
                }
            });

            searcher.submit(querys.join(' '), engines);

            $searchTextbox.focus();
        });
    });

    // Button Color Change
    (function () {
        // Color
        var colors = ['#AC033B', '#ED8CB5', '#F08608', '#7DA457', '#0088EE'];

        function randomColor() {
            var $this = $(this);
            var random;
            do {
                random = Math.floor(Math.random() * colors.length);;
            } while (colors[random].toUpperCase() == _.rgbToHex($this.css('background-color')));
            $this.css('background-color', colors[random]);
        }
        randomColor.apply($searchButton.on('transitionend webkitTransitionEnd', randomColor));
    }());
}(window));

require('./suggest/index');
require('./drag/index')