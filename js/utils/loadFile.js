define([], function() {
        var win, target, type, multi;
        var loadFile = {
            loadFotoWin: function(t, type, dir) {
                target = t;
                multi = '';
                win = window.open("/adm/file.php?type=" + type + "&dir=" + dir, "Message Api", "width=300, height=300")
                win.postMessage("", location.hostname);
            },
            displayMessage: function(evt) {
                if (type == 'singiel') {
                    target.val(evt.data)
                    win.close();
                } else {
                    multi += (evt.data + ",")
                    target.val(multi);
                }
            }
        }
        window.addEventListener("message", loadFile.displayMessage, true);
        return loadFile;
    })