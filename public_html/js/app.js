if(typeof console == "undefined") {
    console = {log:function(){}};
}

function versioned(url) {
    if(!url.indexOf("/")==0) {
        url = "/"+url;
    }
    return "/version/"+version+url;
}

requirejs.config({
    baseUrl: omnyBaseUrl+'/js',
    urlArgs: "v="+version,
    waitSeconds: 20,
    jsx: {
        fileExtension: '.jsx',
        harmony: true
    },
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                return true;
            }
        }
    },
    paths: {
        jquery: 'lib/jquery',
        "jqueryui": 'lib/jquery-ui/js/jquery-ui',
        react: "lib/react/react",
        "JSXTransformer": "lib/require-plugins/JSXTransformer",
        themes: 'themes',
        ext: "https://modules.omny.ca"
    }
});

requirejs([
    'jsx!main',
    "jsx!modules/ModuleCollectionRenderer/ModuleCollectionRenderer",
    "jsx!modules/ModuleRenderer/ModuleRenderer",
    "jsx!modules/Html/Html",
    "jsx!modules/Menu/Menu"
]);

