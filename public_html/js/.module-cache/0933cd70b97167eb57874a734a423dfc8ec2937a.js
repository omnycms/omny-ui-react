define(["lib/ckeditor/ckeditor","utilities/ModuleManager"],
    function(ckeditor,moduleManager) {
        function Html(data, editable) {
            this.render = function(element) {
                var div = document.createElement("div");
                if(!data) {
                    data = {"omnyClass":"Omny.Html","Html":"Sample text"};
                }
                div.innerHTML=data.Html;
                if(editable) {
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
                }

                element.appendChild(div);
            };
        }

        return Html;
    }
);
