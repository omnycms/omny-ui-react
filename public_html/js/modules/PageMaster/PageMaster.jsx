define(["react","jquery","jqueryui","utilities/ModuleManager","utilities/QueryStringReader",
  "utilities/PageLoader","utilities/CssManager","utilities/DevModules", "utilities/UiModules"
  ,"jsx!modules/PageRenderer/PageRenderer"],
    function(React,$,jqui,moduleManager,queryStringReader,
      pageLoader,cssManager,devModules, uiModules) {
        var OmnyModuleList = React.createClass({
            getInitialState: function() {
              return {devmodules: [], uimodules: []};
            },
            componentDidMount: function(){
                var node = this.getDOMNode();
                var pageNode = $(node).parent().parent().find(".omny-page");
                var saveButton = $(node).find(".omny-save-button");
                saveButton.click(function() {
                    console.log(moduleManager.getJson(pageNode));
                });
                var updateDraggable = function() {
                  $(node).find(".omny-draggable-module").draggable({
                      connectToSortable: ".omny-module-section .omny-module-section",
                      appendTo: "body",
                      helper: 'clone',
                      revert: "invalid",
                      start: function() {
                          $(".omny-module-sidebar").hide();
                      },
                      stop: function(event, ui) {
                          $(".omny-module-sidebar").show();
                      }
                  });
                }
                updateDraggable();
                var moduleList = this;
                devModules.getModules(function(modules) {
                  for(var i=0; i<modules.length; i++) {
                    modules[i].name = decodeURIComponent(modules[i].name);
                  }
                  moduleList.setState({devmodules: modules}, updateDraggable);
                });
                uiModules.getInstalledModules(function(modules) {
                  moduleList.setState({uimodules: modules}, updateDraggable);
                });
            },
            render: function() {
                return <div>
                    {this.props.modules.map(function(module, i){
                        return <div className="omny-draggable-module" data-omny-module={module.module} key={i} >{module.name}</div>;
                    })}
                    {this.state.uimodules.map(function(module, i){
                         return <div className="omny-draggable-module" data-omny-module={module.name} data-omny-url={module.url} key={i} >{module.name}</div>;
                     })}
                    {this.state.devmodules.map(function(module, i){
                         return <div className="omny-draggable-module" data-omny-module={module.name} data-omny-url={module.url} key={i} >{module.name}</div>;
                     })}

                    <button className="omny-save-button">Save</button>
                </div>;
              }
        });
        var OmnyPageMaster = React.createClass({
          componentDidMount: function(){
            var node = this.getDOMNode();
            var pageName = queryStringReader.getParameter("page");
            var pageNode = $(node).find(".omny-page");
            pageLoader.loadPage(pageName,function(pageData) {
                React.render(<OmnyPageRenderer key="omny-page" editable="true" pagename={pageName} pagedata={pageData} />, pageNode[0]);
                $(".omny-module-section .omny-module-section").sortable({
                    items: ".omny-editable-module",
                    placeholder: "ui-state-highlight",
                    connectWith: ".omny-module-section",
                    dropOnEmpty: true,
                    forcePlaceholderSize: true,
                    forceHelperSize: true,
                    tolerance: "pointer",
                    cancel: '[contenteditable]',
                    stop: function(event, ui) {
                        if (ui.item.hasClass("omny-draggable-module")) {
                            var x = document.createElement("div");
                            var mod = {"omnyClass":ui.item.attr("data-omny-module")};
                            if(typeof ui.item.attr("data-omny-url") != "undefined") {
                              mod.url = ui.item.attr("data-omny-url");
                            }
                            React.render(<OmnyModuleRenderer module={mod} editable={true} />,x);
                            ui.item.replaceWith(x.childNodes[0]);
                        }
                    }
                });
            });
            var sideBar = $(node).find(".omny-module-sidebar");
            React.render(<OmnyModuleList key="omny-default-modules" modules={moduleManager.getDefaultModules()} />, sideBar[0]);
          },
          render: function() {
            return <div>
                <div key="omny-sidebar" className="omny-module-sidebar" />
                <div className="omny-page" />
            </div>;
          }
        });
        function PageMaster(data) {
            this.render = function(element) {
                React.render(<OmnyPageMaster />, element);
            }
        }
        cssManager.addCdnCss("/js/modules/PageMaster/PageMaster.css")
        return PageMaster;
    }
);
