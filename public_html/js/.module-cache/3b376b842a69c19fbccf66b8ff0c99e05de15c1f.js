define(["react","utilities/OmnyApiRequester"],
    function(React,apiRequester) {
      var OmnyMenu = React.createClass({displayName: "OmnyMenu",
          getInitialState: function() {
            return {menuItems: []};
          },
          componentDidMount: function(){
            var menu = this;
            var fulfill = this.props.fulfill;
            apiRequester.apiRequest("menus","default/entries",{
              success:function(menuItems) {
                menu.setState({menuItems: menuItems},fulfill);
              }
            });
          },
          render: function() {
              return React.createElement("ul", null, 
                 this.state.menuItems.map(function(menuItem, i){
                      return React.createElement("li", {key: i}, 
                        React.createElement("a", {href: menuItem.link}, menuItem.title)
                        );
                  })
              );
            }
      });

      function Menu(data) {
          this.render = function(element) {
            var promise = new Promise(function(fulfill,reject) {
              React.render(React.createElement(OmnyMenu, {fulfill: fulfill}), element);
            })
            return promise;
          }
      }
      return Menu;
    }
);
