define(['react'],
    function(React) {
        window.OmnyModuleRenderer = React.createClass({displayName: "OmnyModuleRenderer",
          componentDidMount: function(){
            var node = this.getDOMNode();
            var moduleInstance = $(this.getDOMNode()).find(".omny-module-instance")[0];

            var moduleData = this.props.module.data;
            var moduleName = this.props.module.omnyClass;
            if(moduleName.indexOf("Omny.")==0) {
                moduleName = moduleName.substring(5);
            }
            $(node).find(".omny-delete-module").click(function() {
                $(node).remove();
            });
            console.log(this.props.editable);
            var editable = this.props.editable=="true";
            var moduleUrl = "modules/"+moduleName+"/"+moduleName
            if(this.props.module.url) {
              moduleUrl = this.props.module.url;
            }
            var requireUrl = "jsx!"+moduleUrl;
            var promises = this.props.promises;
            require([requireUrl],function(module) {
                var instance = new module(moduleData, editable, moduleUrl);
                var promise = instance.render(moduleInstance);
                if(!promise) {
                  promise = new Promise(function (fulfill, reject){
                    fulfill();
                  });
                }
                promises.push(promise);
            });
          },
          render: function(element,container) {
            console.log(this.props.module);
            var classes="omny-module";
            var dragHandle;
            if(this.props.editable) {
                classes+=" omny-editable-module";
                dragHandle = React.createElement("div", null, 
                React.createElement("span", {className: "omny-drag-handle glyphicon glyphicon-move"}, "Handle"), 
                React.createElement("span", {className: "omny-delete-module"}, "Delete")
                );
            }
            return React.createElement("div", {className: classes}, dragHandle, React.createElement("div", {className: "omny-module-instance"}));
          }
        });
        function ModuleRenderer(module) {
            this.render = function(element) {
                React.render(React.createElement(OmnyModuleRenderer, {module: module}), element)
            }
        }
        return ModuleRenderer;
    }
);
