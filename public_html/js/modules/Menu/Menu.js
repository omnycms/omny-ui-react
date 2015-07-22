define(["react","utilities/OmnyApiRequester"],
    function(React,apiRequester) {
      var OmnyMenu = React.createClass({displayName: "OmnyMenu",
          getInitialState: function() {
            if(typeof this.props.data !="undefined" && typeof this.props.data.menuItems !="undefined") {
              return {menuItems: this.props.data.menuItems};
            }
            return {menuItems: []};
          },
          componentDidMount: function(){
            var menu = this;
            var fulfill = this.props.fulfill;
            if(typeof this.props.data !="undefined" && typeof this.props.data.menuItems !="undefined") {
              menu.setState({menuItems: this.props.data.menuItems},fulfill);
            } else {
              apiRequester.apiRequest("menus","default/entries",{
                success:function(menuItems) {
                  menu.setState({menuItems: menuItems},fulfill);
                }
              });
            }
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
              React.render(React.createElement(OmnyMenu, {data: data, fulfill: fulfill}), element);
            })
            return promise;
          }
          this.renderToStaticString = function() {
              return React.renderToStaticString(React.createElement(OmnyMenu, {data: data}));
          }
      }
      return Menu;
    }
);
