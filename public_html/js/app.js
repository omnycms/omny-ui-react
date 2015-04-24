if(typeof console == "undefined") {
    console = {log:function(){}};
}

function versioned(url) {
    if(!url.indexOf("/")==0) {
        url = "/"+url;
    }
    return "/version/"+version+url;
}

var port = window.location.port?":"+window.location.port:"";

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
        themes: "//"+window.location.hostname+port+'/themes',
        ext: "https://modules.omny.ca"
    }
});

requirejs([
    "jsx!main"
]);
