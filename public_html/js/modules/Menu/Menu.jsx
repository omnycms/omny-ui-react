define(["utilities/OmnyApiRequester"],
    function(apiRequester) {
      var OmnyMenu = React.createClass({
          getInitialState: function() {
            return {menuItems: []};
          },
          componentDidMount: function(){
            var menu = this;
            apiRequester.apiRequest("menus","default/entries",{
              success:function(menuItems) {
                menu.setState({menuItems: menuItems});
              }
            });
          },
          render: function() {
              return <ul>
                 {this.state.menuItems.map(function(menuItem, i){
                      return <li key={i}>
                        <a href={menuItem.link}>{menuItem.title}</a>
                        </li>;
                  })}
              </ul>;
            }
      });

      function Menu(data) {
          this.render = function(element) {
              React.render(<OmnyMenu />, element);
          }
      }
      return Menu;
    }
);
