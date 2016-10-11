;
(function () {
    function imageToDataURL( /*Blob*/ image, callback) {
        callback = callback || function () {};

        if (!image.type.match(/image/)) {
            callback(new Error('File type is not image'));
        }

        var fileReader = new FileReader();

        fileReader.onloadend = function (e) {
            callback(null, this.result);
        }
        fileReader.readAsDataURL(image);
    }

    function dragFile(element, handler) {
        var dragEnterHandler,
            dragOverHandler,
            dragLeaveHandler,
            dropHandler;
        dragEnterHandler = dragOverHandler = dragLeaveHandler = dropHandler = function () {};

        if (typeof handler === 'function') {
            dropHandler = handler;
        } else if (typeof handler === 'object') {
            dragEnterHandler = handler.dragenter || dragEnterHandler;
            dragOverHandler = handler.dragover || dragOverHandler;
            dragLeaveHandler = handler.dragleave || dragLeaveHandler;
            dropHandler = handler.drop || dropHandler;
        }

        element.addEventListener("dragenter", function (event) {
            event.stopPropagation();
            event.preventDefault();
            dragEnterHandler(event);
        }, false);　　
        element.addEventListener("dragover", function (event) {
            event.stopPropagation();
            event.preventDefault();
            dragOverHandler();
        }, false);
        element.addEventListener("dragleave", function (event) {
            event.stopPropagation();
            event.preventDefault();
            dragLeaveHandler();
        }, false);
        element.addEventListener("drop", function (event) {　　　　
            event.stopPropagation();
            event.preventDefault();
            dropHandler(event.dataTransfer.files, event);
        }, false);
    }

    exports.bind = dragFile;
    exports.imageToDataURL = imageToDataURL;
}());