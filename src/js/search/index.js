/**
 * spliceURL(url, params)
 *     拼接网址和参数
 *
 * Paramater:
 *     host: 一个不包含"?"的网址
 *     params: 参数 key-value 对
 *
 * Return:
 *     一个拼接后的URL
 */
function spliceURL(host, params) {
    host += '?';
    for (var i in params) {
        host += (i + '=' + params[i] + '&');
    }
    return encodeURI(host.substring(0, host.length - 1));
}

/**
 * openURL(obj)
 *     打开请求的URL
 *     Open Requset URL
 *
 * Parameter:
 *     arg: 传入的参数，应该具备以下的形式
 *          {
 *              url: "",                     必选
 *              data: "",                  可选
 *              target: ["blank"|"self"]     可选
 *              type: ["GET" | "POST"],    可选
 *              charset: "utf-8"             可选,只有当方法为POST时有效
 *          }
 *
 */
function openURL(arg) {
    if (!arg.url) {
        throw new Error('"url" argument does not allow to null!');
    }

    if (!arg.type || arg.type.toUpperCase() !== "POST") {
        arg.url = spliceURL(arg.url, arg.data);

        if (arg.target && arg.target.toLowerCase() === "self") {
            window.location.href = arg.url;
        } else {
            window.open(arg.url);
        }
    } else {
        var form = document.createElement("form");
        form.action = arg.url;
        form.method = arg.type || "GET";
        form.target = "_" + (arg.target || "blank");
        form.acceptCharset = arg.charset || "utf-8";

        var i;
        var input;
        for (i in arg.data) {
            input = document.createElement("input");
            input.setAttribute("name", i);
            input.setAttribute("value", arg.data[i]);
            form.appendChild(input);
        }

        // document.body.appendChild(form);
        form.submit();
        // document.body.removeChild(form);
    }
}

/**
 * 判断是否是数组
 */
function isArray(arg) {
    return arg instanceof Array;
}


module.exports = function (config) {

    return {
        submit: submit
    };

    /**
     * 将 集合 展开
     */
    function expandEngine(engines) {
        var engineMap = {};

        for (var i = 0; i < engines.length; i++) {
            var key = engines[i];

            if (isArray(config[key].engines)) {
                engines = engines.concat(config[key].engines);
            }
            else if (!(key in engineMap)) {
                engineMap[key] = true;
            }
        }

        return Object.keys(engineMap);
    }

    /**
     *
     * @param {string} query
     * @param {string|array} engines
     */
    function submit(query, engines) {
        // 参数检查
        if (!isArray(engines)) {
            engines = !engines || /^\s*$/.test(engines) ? 'default' : engines
            engines = [engines];
        }
        else if (engines.length == 0) {
            engines = ['default'];
        }

        // 展开集合
        engines = expandEngine(engines);

        // 替换 %s
        engines.forEach(function (item) {
            if (!(item in config)) {
                return;
            }

            var engine = Object.create(config[item]);
            // 替换 data 参数中的 %s
            for (var name in engine.data) {
                engine.data[name] = engine.data[name].replace(/%s/ig, query);
            }
            // 替换 url 中的 %s
            engine.url = engine.url.replace(/%s/ig, query);
            openURL(engine);
        });
    }

};