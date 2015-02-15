define(['utilities/OmnyApiRequester'],
    function(omnyApiRequester) {
        var UiModules = {};
        UiModules.siteCache = {};
        UiModules.getInstalledModules = function(callback, site) {
          if(!site) {
            site = omnyApiRequester.getHostname();
          }
          if(typeof UiModules.siteCache[site] !="undefined") {
            callback(UiModules.siteCache[site])
          }
          omnyApiRequester.apiRequest("extensibility", "ui/modules/installed/all", {
              success: function(result) {
                for(var i=0; i<result.length; i++) {
                  result[i].url = UiModules.getModuleUrlWithoutSuffix(result[i]);
                }
                UiModules.siteCache[site] = result;
                callback(result);
              },
              site: site
          });
        };

        UiModules.getBaseUrl = function() {
          return "https://s3.amazonaws.com/modules.omny.ca";
        };

        UiModules.getModuleUrlWithoutSuffix = function(module) {
          return UiModules.getBaseUrl()+"/"+module.creator+"/"+module.name+"/"+module.version+"/"+module.name;
        };

        return UiModules;
    }
);
