define(["utilities/OmnyApiRequester","utilities/ModuleManager","react"],
    function(apiRequester,moduleManager,React) {
      var OmnySiteManager = React.createClass({
          getInitialState: function() {
            return {sites: []};
          },
          componentDidMount: function(){
            var siteManager = this;
            var fulfill = this.props.fulfill;
            apiRequester.apiRequest("sites","",{
              success:function(sites) {
                siteManager.setState({sites: sites},fulfill);
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
            var promise = new Promise(function(fulfill,reject) {
              React.render(<OmnySiteManager fulfill={fulfill} />, element);
            })
            return promise;

          }
      }
      return SiteManager;
    }
);
