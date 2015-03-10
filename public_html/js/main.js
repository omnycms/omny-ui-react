require(["jsx!modules/PageRenderer/PageRenderer","utilities/PageLoader"],
function(pageRenderer,pageLoader) {
    var pageName = window.location.pathname.substring(1);
    pageLoader.loadPage(pageName,function(data, siteDetails) {
        document.title = data.page.title;
        var renderer = new pageRenderer(pageName,data, siteDetails);
        renderer.render(document.body);
    });
    
});


