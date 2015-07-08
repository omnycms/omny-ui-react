if(typeof console == "undefined") {
    console = {log:function(){}};
}

function versioned(url) {
    if(!version) {
        return url;   
    }
    if(!url.indexOf("/")==0) {
        url = "/"+url;
    }
    return "/version/"+version+url;
}

var port = window.location.port?":"+window.location.port:"";

var requireConfig = {
    baseUrl: omnyBaseUrl+'/js',

    waitSeconds: 20,
    paths: {
        jquery: 'lib/jquery',
        "jqueryui": 'lib/jquery-ui/js/jquery-ui',
        react: "lib/react/react",
        themes: "//"+window.location.hostname+port+'/themes',
        ext: "https://modules.omny.ca"
    }
};
if(typeof version!="undefined") {
       requireConfig.urlArgs = "v="+version;
}
requirejs.config(requireConfig
);

requirejs([
    "main"
],function(main) {
    main.load();
});
