define(["utilities/Guid"],
    function(Guid) {
        var defaultModules = [
            {"name":"HTML", "module" :"Omny.Html"},
            {"name":"Menu", "module" :"Omny.Menu"},
            {"name":"Photo", "module" :"Omny.Photo"},
            {"name":"Youtube", "module" :"Omny.Youtube"}
        ];

        var ModuleManager = {};
        var moduleConfigurationFunctions = {};
        ModuleManager.getDefaultModules = function() {
            return defaultModules;
        };
        ModuleManager.setSaveFunction = function(element,func) {
            var id = Guid.simpleguid();
            $(element).attr("data-omny-config-id",id);
            $(element).addClass("omny-editable-module-element");
            moduleConfigurationFunctions[id] = func;
        };
        ModuleManager.getJson = function(rootElement) {
            
            var results = {};
            $(rootElement).find(".omny-module-section").each(function() {
                var section = $(this).attr("data-section");
                var result = [];
                $(this).find(".omny-editable-module-element").each(function() {
                    var id = $(this).attr("data-omny-config-id");
                    result.push(moduleConfigurationFunctions[id]());
                });
                results[section] = result;
            });
            return results;
        };

        return ModuleManager;
    }
);



