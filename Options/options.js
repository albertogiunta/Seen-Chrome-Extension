document.addEventListener('DOMContentLoaded', function(e) {

    var SetListeners = (function() {

        _getElements();

        // Get header's links elements
        function _getElements() {
            document.getElementById('author').addEventListener('click', _createTabForLink);
            document.getElementById('review').addEventListener('click', _createTabForLink);
            document.getElementById('store').addEventListener('click', _createTabForLink);
            document.getElementById('donation').addEventListener('click', _createTabForLink);
            document.getElementById('tweet').addEventListener('click', _createTabForLink);
            document.getElementById('github').addEventListener('click', _createTabForLink);
        }

        // Open tab on click
        function _createTabForLink() {
            if (this.href) {
                chrome.tabs.create({
                    active: true,
                    url: this.href
                });
            }
        }

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
                
                //  getting the value of the inserted links
                var torrent = getLinks('torrent-input');
                var streaming = getLinks('streaming-input');
                var subtitles = getLinks('subtitles-input');

                chrome.storage.sync.get(null, function(itemsSet) {
                    keys = Object.keys(itemsSet);
                    var jsonfile = {};
                    if (keys.length == 0) {
                        window.location.href = "/Popup/popup.html";
                    } else {
                        function _getLink (value) {
                            if (value.slice(0, 4) != 'http' && value.length != 0) {
                                value = 'http://' + value;
                            }
                            return value;
                        }
                        
                        for (var i = keys.length-1; i >= 0; i--) {
                            var k = JSON.parse(itemsSet[keys[i]]);
                            k.torrent = k.torrent == localStorage.getItem('torrent-input') ? _getLink(torrent) : k.torrent;
                            k.streaming = k.streaming == localStorage.getItem('streaming-input') ? _getLink(streaming) : k.streaming;
                            k.subtitles = k.subtitles == localStorage.getItem('subtitles-input') ? _getLink(subtitles) : k.subtitles;


                            StorageController.setStorage(k, function() {
                                setLinks('torrent-input', _getLink(torrent))
                                setLinks('streaming-input', _getLink(streaming))
                                setLinks('subtitles-input', _getLink(subtitles))
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