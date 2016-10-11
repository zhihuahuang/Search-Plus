<?php
/*
preg_match('/MSIE/', $_SERVER['HTTP_USER_AGENT'], $matches);
if (!empty($matches)) :
?> <meta charset=UTF-8><h1>我们不支持IE浏览器，请使用Chrome、Firefox、Opera等高级浏览器 或 使用浏览器的极速模式！</h1> <?php
    die(0);
endif;
*/
?> <!DOCTYPE html><html lang=en><head><meta charset=UTF-8><meta name=viewport content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"><meta name=renderer content=webkit|ie-stand|ie-comp><meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1"><title>Search+</title><link rel=stylesheet href=css/style.css><link rel="shortcut icon" href=favicon.ico><style>a {
            text-decoration: none;
        }
        
        .icon-help,
        .icon-statement {
            display: inline-block;
            
            float: left;
            
            font-size: 14px;
            border: 2px #FFF solid;
            border-radius: 200px;
            width: 20px;
            height: 20px;
            color: #FFF;
            overflow: hidden;
            transition: all 0.6s;
        }

        .icon-help:before,
        .icon-statement:before {
            content: "?";
            
            float: left;
            
            display: inline-block;
            width: 20px;
            line-height: 20px;
            
            font-weight: bold;
            text-align: center;
        }
        
        .icon-help:before {
            content: "?";
        }
        
        .icon-statement:before {
            content: "!";
        }
        
        .icon-help:hover,
        .icon-statement:hover {
            width: 60px;
        }
    
        .copyright {
            line-height: 24px;
        }
        
        .overlay  {
            position: absolute;
            
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            
            
            color: #FFF;
            background-color: rgba(0,0,0,0.7);
        }
        
        .help em {
            background: #FFF;
            color: #333;
            
            border-radius: 3px;
            padding: 2px;
            margin: 2px;
            
            font-size: 14px;
        }</style></head><body><div class=background style="background-image: url('image/beijing.jpg')"></div><header></header><div class=main><div class=container><form id=search_form class=search-form><div class=search-textbox-wrapper><div class=search-label-wrapper></div><input type=text class=search-textbox autofocus></div><button>Search</button></form><ul id=suggest_list class=suggest-list hidden><li class="suggest suggest-${from}" data-key-name=${key.name} data-key-code=${key.code}>${suggest}</li></ul><form id=suggest_hidden></form></div></div><footer class=footer><span class=copyright>Copyright By Zevo 2013-2016. All Rights Reserved.</span></footer><script src=http://cdn.staticfile.org/zepto/1.1.6/zepto.min.js></script><script src=http://cdn.staticfile.org/async/1.5.0/async.min.js></script><script src=js/main.js></script></body></html>