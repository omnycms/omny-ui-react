define(['jquery','utilities/CssManager'],
        function($,cssManager) {
            var ThemeLoader = {};
            ThemeLoader.loadTheme = function(themeName, jsHost, callback) {
                var port = window.location.port?":"+window.location.port:"";
                var cssFile = "//"+window.location.hostname+port+"/themes/" + themeName + "/theme.css";
                cssManager.addCssFile(cssFile);
                var themeJs = jsHost+"/themes/" + themeName + "/theme.js";
                require([themeJs], function(util) {
                    callback(util); 
                 }, function(error) {
                     console.log(error);
                 });
            };

            return ThemeLoader;
        }
);