define(['react',"utilities/ThemeLoader","jsx!modules/ModuleCollectionRenderer/ModuleCollectionRenderer"],
    function(React,themeLoader) {
        window.OmnyPageRenderer = React.createClass({
          componentDidMount: function(){
            var node = this.getDOMNode();
            var templateModules = this.props.pagedata.templateModules;
            var pageModules = this.props.pagedata.pageModules;
            for(var section in this.props.pagedata.templateModules) {
                var element = $(node).find("div[data-section="+section+"]")[0];
                React.render(<OmnyModuleCollectionRenderer editable="false" modules={templateModules[section]} />, element);
            }
            for(var section in this.props.pagedata.pageModules) {
                var element = $(node).find("div[data-section="+section+"]")[0];
                React.render(<OmnyModuleCollectionRenderer editable={this.props.editable} modules={pageModules[section]} />, element);
            }
            themeLoader.loadTheme(this.props.pagedata.themeName,window.location.origin, function() {
            });
          },
          render: function() {
            console.log(this.props.pagedata);
            var pageModules = this.props.pagedata.pageModules;
            var rawMarkup = this.props.pagedata.themeHtml.replace(/{{([a-zA-Z.]*)}}/g, function(m, key) {
                return "<div class=\"omny-module-section\" data-omny-type=\"section\" data-section=\""+key+"\"></div>";
            });
            return <div dangerouslySetInnerHTML={{__html: rawMarkup}} />;
          }
        });
        function PageRenderer(pageName,pageData) {
            this.render = function(element) {
                React.render(<OmnyPageRenderer editable="false" pagename={pageName} pagedata={pageData} />, element);
            }
        }
        return PageRenderer;
    }
);