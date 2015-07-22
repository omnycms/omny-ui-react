define(['react'],
    function(React) {
        window.OmnyModuleRenderer = React.createClass({displayName: "OmnyModuleRenderer",
          getInitialState: function() {
              var instance = null;
              if(typeof window.moduleCache !="undefined") {
                var moduleName = this.getModuleName();
                if(typeof window.moduleCache[moduleName] != "undefined") {
                    instance = new window.moduleCache[moduleName](this.props.module.data,false, this.getModuleUrl(moduleName));
                }
              }
              return {moduleInstance: instance};
          },
          componentDidMount: function(){
            var editable = this.props.editable=="true";
            if(!editable &&typeof this.state.moduleInstance !="undefined" && typeof this.state.moduleInstance.renderToStaticString !="undefined") {
                return;
            }
            var node = this.getDOMNode();
            var moduleInstance = $(this.getDOMNode()).find(".omny-module-instance")[0];

            var moduleData = this.props.module.data;
            var moduleName = this.props.module.omnyClass;
            var requireUrl = this.getModuleUrl(moduleName);
            
            $(node).find(".omny-delete-module").click(function() {
                $(node).remove();
            });
            
            var promises = this.props.promises;
            
            console.log(this.props.editable);
            
            require([requireUrl],function(module) {
                var instance = new module(moduleData, editable, requireUrl);
                var promise = instance.render(moduleInstance);
                if(!promise) {
                  promise = new Promise(function (fulfill, reject){
                    fulfill();
                  });
                }
                promises.push(promise);
            });
          },
          getModuleUrl: function(moduleName) {
            if(moduleName.indexOf("Omny.")==0) {
                moduleName = moduleName.substring(5);
            }
            var moduleUrl = "modules/"+moduleName+"/"+moduleName
            if(this.props.module.url) {
              moduleUrl = this.props.module.url;
            }
            var requireUrl = moduleUrl;
            return requireUrl;
          },
          getModuleName: function(moduleName) {
             var moduleName = this.props.module.omnyClass;
             if(moduleName.indexOf("Omny.")==0) {
                moduleName = moduleName.substring(5);
            }
            return moduleName;
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
            var editable = this.props.editable=="true";
            if(!editable &&typeof this.state.moduleInstance !="undefined" && this.state.moduleInstance!=null && typeof this.state.moduleInstance.renderToStaticString != "undefined") {
                var instance = this.state.moduleInstance;
                return React.createElement("div", {className: classes}, dragHandle, React.createElement("div", {dangerouslySetInnerHTML: {__html: instance.renderToStaticString()}, className: "omny-module-instance"}))
            }
            
            return React.createElement("div", {className: classes}, dragHandle, React.createElement("div", {className: "omny-module-instance"}));
          }
        });
        function ModuleRenderer(module) {
            this.render = function(element) {
                React.render(React.createElement(OmnyModuleRenderer, {module: module}), element)
            }
            this.renderToString = function() {
                var promise = new Promise(function(fulfill,reject) {
                    React.renderToString(React.createElement(OmnyModuleRenderer, {module: module}))
                })
                return promise;
            }
        }
        return ModuleRenderer;
    }
);
