define([],
    function() {
        var win, target, type, multi;
        var loadFile = {
            loadFotoWin: function(t, sort, dir) {
                target = t;
                type = sort;
                multi = '';
                win = window.open(location.hostname + "/adm/file.php?type=" + type + "&dir=" + dir, "Message Api",
                    "width=300, height=300")
                win.postMessage("", location.hostname);
            },
            displayMessage: function(evt) {
                if (type == 'singiel') {
                    target.val(evt.data)
                    win.close();
                } else {
                    multi += (evt.data + ",")
                    target.val(multi)
                }
            }
        }
        window.addEventListener("message", loadFile.displayMessage, true);
        return loadFile;
    })