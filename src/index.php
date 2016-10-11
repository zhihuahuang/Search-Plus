<?php
/*
preg_match('/MSIE/', $_SERVER['HTTP_USER_AGENT'], $matches);
if (!empty($matches)) :
?>
<meta charset="UTF-8">
<h1>我们不支持IE浏览器，请使用Chrome、Firefox、Opera等高级浏览器 或 使用浏览器的极速模式！</h1>
<?php
    die(0);
endif;
*/
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <!-- 360浏览器优先极速模式 -->
    <meta name="renderer" content="webkit|ie-stand|ie-comp">
    <!-- IE -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Search+</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="shortcut icon" href="favicon.ico">
    <style>
        a {
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
        }
    </style>
</head>
<body>
    <div class="background" style="background-image: url('image/beijing.jpg');"></div>
    <header>
        <!-- a class="icon-help" href="#help">帮助</a>
        <a class="icon-statement" href="#statement">声明</a -->
    </header>
    <div class="main">
        <div class="container">
            <form id="search_form" class="search-form">
                <!--input name="query" autocomplete="off" autofocus placeholder="网站+搜索词，例如：百度 疯狂动物城"-->
<!--                <div class="search-view search-textbox" contenteditable="true"></div>-->
                <div class="search-textbox-wrapper">
                    <div class="search-label-wrapper"></div>
                    <input type="text" class="search-textbox" autofocus>
                </div>
                <button>Search</button>
            </form>
            <ul id="suggest_list" class="suggest-list" hidden>
                <li class="suggest suggest-${from}" data-key-name="${key.name}" data-key-code="${key.code}">${suggest}</li>
            </ul>
            <form id="suggest_hidden"></form>
        </div>
    </div>
    <footer class="footer">
        <!-- a class="icon-help" href="#help">帮助</a>
        <a class="icon-statement" href="#statement">声明</a-->
        <span class="copyright">Copyright By Zevo 2013-2016. All Rights Reserved.</span>
    </footer>
    <!--div class="overlay">
        <div class="help">
            <ol>
                <li>
                    <strong>站点 搜索词</strong>
                    <p>使用站点+空格+搜索词方式可以在特定的网站中搜索，例如使用<em>谷歌 iPhone7</em>或<em>iPhone7 google</em>就可以在谷歌中搜索iPhone。</p>
                </li>
            </ol>
        </div>
    </div-->
    <script src="http://cdn.staticfile.org/zepto/1.1.6/zepto.min.js"></script>
    <script src="http://cdn.staticfile.org/async/1.5.0/async.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
