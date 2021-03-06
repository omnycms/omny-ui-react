define(['react',"utilities/ThemeLoader","modules/ModuleCollectionRenderer/ModuleCollectionRenderer"],
    function(React,themeLoader) {
        window.OmnyPageRenderer = React.createClass({displayName: "OmnyPageRenderer",
          componentDidMount: function(){
            var node = this.getDOMNode();
            var templateModules = this.props.pagedata.templateModules;
            var pageModules = this.props.pagedata.pageModules;
            for(var section in this.props.pagedata.templateModules) {
                var element = $(node).find("div[data-section="+section+"] div.omny-template-section")[0];
                React.render(React.createElement(OmnyModuleCollectionRenderer, {editable: false, modules: templateModules[section]}), element);
            }
            for(var section in this.props.pagedata.pageModules) {
                var element = $(node).find("div[data-section="+section+"] div.omny-page-section")[0];
                React.render(React.createElement(OmnyModuleCollectionRenderer, {editable: this.props.editable, modules: pageModules[section]}), element);
            }
            themeLoader.loadTheme(this.props.pagedata.themeName,window.location.origin, function() {
            });
          },
          render: function() {
            console.log(this.props.pagedata);
            var siteName = this.props.siteDetails.siteName;
            var pageModules = this.props.pagedata.pageModules;
            var rawMarkup = this.props.pagedata.themeHtml.replace(/{{([a-zA-Z.]*)}}/g, function(m, key) {
                if(key=="site.siteName") {
                    return siteName;
                }
                return "<div class=\"omny-module-section\" data-omny-type=\"section\" data-section=\""+key+"\">"
                    +"<div class=\"omny-template-section\" ></div><div class=\"omny-page-section\" >"
                    +"</div></div>";
            });
            return React.createElement("div", {dangerouslySetInnerHTML: {__html: rawMarkup}});
          }
        });
        function PageRenderer(pageName,pageData, siteDetails) {
            this.render = function(element) {
                console.log(siteDetails);
                React.render(React.createElement(OmnyPageRenderer, {editable: false, pagename: pageName, siteDetails: siteDetails, pagedata: pageData}), element);
            }
        }
        return PageRenderer;
    }
);
