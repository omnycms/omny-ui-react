require(["jsx!modules/PageRenderer/PageRenderer","utilities/PageLoader"],
function(pageRenderer,pageLoader) {
    var pageName = window.location.pathname.substring(1);
    pageLoader.loadPage(pageName,function(data) {
        document.title = data.page.title;
        var renderer = new pageRenderer(pageName,data);
        renderer.render(document.body);
    });
    
});


