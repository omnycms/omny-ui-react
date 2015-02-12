define(["utilities/OmnyApiRequester","utilities/ModuleManager"],
    function(apiRequester,moduleManager) {
      var OmnySiteManager = React.createClass({
          getInitialState: function() {
            return {sites: []};
          },
          componentDidMount: function(){
            var siteManager = this;
            apiRequester.apiRequest("sites","",{
              success:function(sites) {
                siteManager.setState({sites: sites});
                console.log(siteManager.getDOMNode());
              }
            });
          },
          render: function() {
              return <div>
                 {this.state.sites.map(function(site, i){
                      return <div className="omny-site" key={i} >{site.siteName}</div>;
                  })}
              </div>;
            }
      });

      function SiteManager(data) {
          this.render = function(element) {
              React.render(<OmnySiteManager />, element);
          }
      }
      return SiteManager;
    }
);
