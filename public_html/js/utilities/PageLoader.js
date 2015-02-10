define(['jquery','utilities/OmnyApiRequester'],
    function($,omnyApiRequester) {
        var PageLoader = {};
        PageLoader.loadPage = function(pageName, callback) {
            if (pageName == "") {
                pageName = "default";
            }
            if(pageName.indexOf(".")>=0) {
                pageName = pageName.split(".");
                pageName = pageName[0];
            }
            
            omnyApiRequester.apiRequest("pages", "detailed", {
                data: {
                    page: pageName
                },
                success: callback
            });
        };

        return PageLoader;
    }
);


