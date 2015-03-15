require(["jquery","react","jsx!modules/ModuleCollectionRenderer/ModuleCollectionRenderer"],
function($,React) {
    for(var section in omnyTemplateModules) {
        if(omnyTemplateModules[section].length>0) {
            var element = $("div[data-section="+section+"] div.omny-template-section")[0];
            React.render(<OmnyModuleCollectionRenderer editable={false} modules={omnyTemplateModules[section]} />, element);  
        }
    }
    for(var section in omnyPageModules) {
        if(omnyPageModules[section].length>0) {
            var element = $("div[data-section="+section+"] div.omny-page-section")[0];
            React.render(<OmnyModuleCollectionRenderer editable={false} modules={omnyPageModules[section]} />, element);  
        }
    }
});