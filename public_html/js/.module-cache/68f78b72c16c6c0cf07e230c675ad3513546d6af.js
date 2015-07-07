define(['react',"jsx!modules/ModuleRenderer/ModuleRenderer"],
    function(React) {
        window.OmnyModuleCollectionRenderer = React.createClass({displayName: "OmnyModuleCollectionRenderer",
          render: function() {
            console.log(this.props.modules);
            var editable = this.props.editable;
            var dropLocation;
            if(editable) {
                dropLocation=React.createElement("div", {className: "omny-drop-location", style: {display:"none"}}, "Drop stuff here")
            }
            var promises = this.props.promises;
            return React.createElement("div", null, 
            this.props.modules.map(function(result,index) {
                return React.createElement(OmnyModuleRenderer, {promises: promises, editable: editable, key: index, module: result});
             }), 
             dropLocation
            );
          }
        });
        function ModuleCollectionRenderer(modules) {
            this.render = function(element) {
                React.render(React.createElement(OmnyModuleCollectionRenderer, {editable: "false", modules: modules}), element)
            }
        }
        return ModuleCollectionRenderer;
    }
);
