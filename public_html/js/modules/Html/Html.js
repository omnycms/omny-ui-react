define(["utilities/ModuleManager"],
    function(moduleManager) {
        function Html(data, editable) {
            this.render = function(element) {
                //don't run if we've preprocessed the module
                if(element.hasChildNodes()) {
                    return;
                }
                var div = document.createElement("div");
                if(!data) {
                    data = {"omnyClass":"Omny.Html","Html":"Sample text"};
                }
                div.innerHTML=data.Html;
                if(editable) {
                    require(["lib/ckeditor/ckeditor"], function(ckeditor) {
                        window.CKEDITOR.disableAutoInline = true;
                        var toolBarItems = ["Bold","Italic","Underline","Undo","Redo","Sourcedialog"];
                        var toolbar = {"toolbar":[toolBarItems]};
                        var editor = window.CKEDITOR.inline(div,toolbar);
                        $(div).attr("contenteditable","true");
                        editor.on("instanceReady", function() {
                            editor.setReadOnly(false);
                        });
                        moduleManager.setSaveFunction(div,function() {
                            return {"omnyClass":"Omny.Html","data":{"Html":editor.getData()}};
                        });
                    });
                }

                element.appendChild(div);
            };
            this.renderToString = function() {
                var promise = new Promise(function(fulfill,reject) {
                  fulfill(data.html);
                })
                return promise;
            }
        }

        return Html;
    }
);
