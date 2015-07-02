npm install requirejs

mkdir output

cp public_html output/$1 -r
node node_modules/requirejs/bin/r.js -o build.js
mv output/app.js output/$1/app.js -f
cp public_html/index.html output/index.html
