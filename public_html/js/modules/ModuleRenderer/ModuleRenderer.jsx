define(['react'],
    function(React) {
        window.OmnyModuleRenderer = React.createClass({
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
            require(["jsx!modules/"+moduleName+"/"+moduleName],function(module) {
                var instance = new module(moduleData, editable);
                instance.render(moduleInstance);
            });
          },
          render: function(element,container) {
            console.log(this.props.module);
            var classes="omny-module";
            var dragHandle;
            if(this.props.editable=="true") {
                classes+=" omny-editable-module";
                dragHandle = <div>
                <span className="omny-drag-handle glyphicon glyphicon-move">Handle</span>
                <span className="omny-delete-module">Delete</span>
                </div>;
            }
            return <div className={classes}>{dragHandle}<div className="omny-module-instance" /></div>;
          }
        });
        function ModuleRenderer(module) {
            this.render = function(element) {
                React.render(<OmnyModuleRenderer module={module} />, element)
            }
        }
        return ModuleRenderer;
    }
);