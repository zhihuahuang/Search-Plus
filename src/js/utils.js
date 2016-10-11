// Utils
module.exports = {
    template: function(tpl, obj, lw, rw) {
        lw = lw || '\\${';
        rw = rw || '}';
        var pattern = new RegExp(lw+'((?:(?!'+rw+').)*)'+rw, 'igm');
        return tpl.replace(pattern, function($0, $1) {
            with(obj) {
               return eval($1);
           } 
        });
    },
    
    rgbToHex: function (rgb) {
        var color = rgb.match(/\d+/g);

        var hex = "#";
        for (var i = 0; i < color.length; ++i) {
            var tmp = (+color[i]).toString(16).toUpperCase();
            hex += tmp.length == 1 ? 0 + tmp : tmp;
        }

        return hex;
    },
    
}