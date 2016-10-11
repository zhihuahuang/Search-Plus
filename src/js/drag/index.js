// 拖拽文件上传
var dragFile = require('./drag-file');

var $background = $('.background');

// 拖拽文件上传
dragFile.bind($background[0], {
    dragenter: function() {
        $background.css('opacity', 0.3);
    },
    dragleave: function() {
        $background.css('opacity', 1);
    },
    drop: function (files) {
        var file = files[0];
        dragFile.imageToDataURL(file, function (err, dataURL) {
            try {
                localStorage.setItem('background-image', dataURL);
                $background.css('opacity', 1).css('background-image', 'url(' + localStorage.getItem('background-image') + ')');
            } catch (exception) {
                if (exception.name == 'QuotaExceededError') {
                    // 超出存储空间
                    console.error(exception);
                }
            }
        });
    }
});

// 如果有默认图片，则设为默认图片
var backgroundImage = localStorage.getItem('background-image');
if (backgroundImage) {
    $background.css('background-image', 'url(' + backgroundImage + ')');
}
