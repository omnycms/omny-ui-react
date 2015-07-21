define(['react',"modules/ModuleRenderer/ModuleRenderer"],
    function(React) {
        window.OmnyModuleCollectionRenderer = React.createClass({
          render: function() {
            console.log(this.props.modules);
            var editable = this.props.editable;
            var dropLocation;
            if(editable) {
                dropLocation=<div className="omny-drop-location" style={{display:"none"}}>Drop stuff here</div>
            }
            var promises = this.props.promises;
            console.log("load immediately "+this.props.loadImmediately);
            var loadImmediately = this.props.loadImmediately;
            return <div>
            {this.props.modules.map(function(result,index) {
                return <OmnyModuleRenderer promises={promises} loadImmediately={loadImmediately} editable={editable} key={index} module={result} />;
             })}
             {dropLocation}
            </div>;
          }
        });
        function ModuleCollectionRenderer(modules) {
            this.render = function(element) {
                React.render(<OmnyModuleCollectionRenderer editable="false" modules={modules} />, element)
            }
            this.renderToString = function() {
              return React.renderToString(<OmnyModuleCollectionRenderer editable="false" modules={modules} />)
            }
        }
        return ModuleCollectionRenderer;
    }
);
