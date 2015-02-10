define(['jquery'],
        function($) {
            var CssManager = {};
            CssManager.addCssFile = function(url) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.setAttribute("rel","stylesheet");
                link.setAttribute("href",url);
                head.appendChild(link);
            };

            return CssManager;
        }
);