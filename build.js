({
    baseUrl: 'public_html/js',
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
        ext: "https://modules.omny.ca"
    },
    name: "app",
    out: "output/js/app.js"
})