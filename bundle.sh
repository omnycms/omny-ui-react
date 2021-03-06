npm install requirejs

mkdir output

cp public_html/ output/$1 -r
rm -rf output/$1/jsx
node node_modules/requirejs/bin/r.js -o build.js
mv output/js/app.js output/$1/js/app.js -f
npm install -g mustache
mustache rewrite.json public_html/index-minified.html > output/$1/index.html