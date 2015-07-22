define(["react","utilities/OmnyApiRequester"],
    function(React,apiRequester) {
      var OmnyMenu = React.createClass({
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
              React.render(<OmnyMenu data={data} fulfill={fulfill} />, element);
            })
            return promise;
          }
          this.renderToStaticString = function() {
              return React.renderToStaticMarkup(<OmnyMenu data={data} />);
          }
      }
      return Menu;
    }
);
