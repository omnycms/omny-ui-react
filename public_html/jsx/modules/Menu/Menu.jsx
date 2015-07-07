define(["react","utilities/OmnyApiRequester"],
    function(React,apiRequester) {
      var OmnyMenu = React.createClass({
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
            var promise = new Promise(function(fulfill,reject) {
              React.render(<OmnyMenu fulfill={fulfill} />, element);
            })
            return promise;
          }
      }
      return Menu;
    }
);