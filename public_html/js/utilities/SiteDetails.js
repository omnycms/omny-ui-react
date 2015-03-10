define(["utilities/OmnyApiRequester"],
    function(omnyApiRequester) {
        var SiteDetails = {};
        SiteDetails.siteCache = {};
        SiteDetails.getSiteDetails = function(hostname, callback) {
            if(typeof SiteDetails.siteCache[hostname]!="undefined") {
                callback(SiteDetails.siteCache[hostname])
            } else {
                omnyApiRequester.apiRequest("sites", hostname, {
                    success: function(details) {
                        SiteDetails.siteCache[hostname] = details;
                        callback(details);
                    },
                    site: hostname
                });
            }
        };

        return SiteDetails;
    }
);





