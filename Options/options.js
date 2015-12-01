document.addEventListener('DOMContentLoaded', function(e) {

    var SetListeners = (function() {

        var fieldName = 'sortingMainpage'
        SortController.toggleSorting(fieldName, null, false);
        var sorting = SortController.getSorting(fieldName);

        document.getElementById('alphabetical').addEventListener('click', function() {
                SortController.toggleSorting(fieldName, 'alphabetical', true);
                sorting = 'alphabetical';
            });

            document.getElementById('chronological').addEventListener('click', function() {
               SortController.toggleSorting(fieldName, 'chronological', true);
               sorting = 'chronological';
            });

            document.getElementById('lastaired').addEventListener('click', function() {
                SortController.toggleSorting(fieldName, 'lastaired', true);
                sorting = 'lastaired';
            });

            document.getElementById('delete').addEventListener('click', function() {
                chrome.storage.sync.clear();
            });

            document.getElementById('confirm').addEventListener('click', function() {
                SortController.setSorting('sortingMainpage', sorting, false)
                
                var torrent = getLinks('torrent-input');
                console.log(torrent)
                var streaming = getLinks('streaming-input');
                var subtitles = getLinks('subtitles-input');

                chrome.storage.sync.get(null, function(itemsSet) {
                    keys = Object.keys(itemsSet);
                    var jsonfile = {};
                    if (keys.length == 0) {
                        window.location.href = "/Popup/popup.html";
                    } else {
                        for (var i = keys.length-1; i >= 0; i--) {
                            var k = JSON.parse(itemsSet[keys[i]]);
                            k.torrent = k.torrent == localStorage.getItem('torrent-input') ? torrent : k.torrent;
                            k.streaming = k.streaming == localStorage.getItem('streaming-input') ? streaming : k.streaming;
                            k.subtitles = k.subtitles == localStorage.getItem('subtitles-input') ? subtitles : k.subtitles;

                            StorageController.setStorage(k, function() {
                                console.log(k)
                                setLinks('torrent-input', torrent)
                                setLinks('streaming-input', streaming)
                                setLinks('subtitles-input', subtitles)
                                window.location.href = "/Popup/popup.html";
                            });
                        }
                    }
                });
            });
    })();

    fillLinks('torrent-input');
    fillLinks('streaming-input');
    fillLinks('subtitles-input');

    function fillLinks(fieldId) {
        var link = localStorage.getItem(fieldId)
        if (link != null) {
            console.log(fieldId)
            document.getElementById(fieldId).value = link;
        }
    }

    function setLinks (argument, value) {
        localStorage.setItem(argument, value)
    }

    function getLinks (fieldId) {
        return document.getElementById(fieldId).value;
    }


});