require(["jquery","react","modules/ModuleCollectionRenderer/ModuleCollectionRenderer",
    "modules/Html/Html","modules/Login/Login","modules/Menu/Menu"],
function($,React) {
    window.pageLoadPromises = [];

    if(typeof omnyTemplateModules!="undefined") {
      for(var section in omnyTemplateModules) {
          if(omnyTemplateModules[section].length>0) {
              var element = $("div[data-section="+section+"] div.omny-template-section")[0];
              React.render(<OmnyModuleCollectionRenderer promises={window.pageLoadPromises} editable={false} modules={omnyTemplateModules[section]} />, element);
          }
      }
    }
    if(typeof omnyPageModules!="undefined") {
      for(var section in omnyPageModules) {
          if(omnyPageModules[section].length>0) {
              var element = $("div[data-section="+section+"] div.omny-page-section")[0];
              React.render(<OmnyModuleCollectionRenderer promises={window.pageLoadPromises} editable={false} modules={omnyPageModules[section]} />, element);
          }
      }
    }
    window.waitForall=function(callback) {
      Promise.all(window.pageLoadPromises).then(callback);
    };
});
