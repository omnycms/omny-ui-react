define(['jquery','utilities/OmnyApiRequester'],
    function($,omnyApiRequester) {
        var DevModules = {};
        DevModules.getModules = function(callback) {
            omnyApiRequester.apiRequest("extensibility", "ui/devmodules", {
                success: callback
            });
        };

        return DevModules;
    }
);
