document.addEventListener('DOMContentLoaded', function(e) {

    var SetListeners = (function() {

        var fieldName = 'sortingMainpage'
        SortController.toggleSorting(fieldName, null);

        document.getElementById('alphabetical').addEventListener('click', function() {
                SortController.toggleSorting(fieldName, 'alphabetical');
            });

            document.getElementById('chronological').addEventListener('click', function() {
               SortController.toggleSorting(fieldName, 'chronological'); 
            });

            document.getElementById('lastaired').addEventListener('click', function() {
                SortController.toggleSorting(fieldName, 'lastaired');
            });

        document.getElementById('delete').addEventListener('click', function() {
            chrome.storage.sync.clear();
        });
    })();

});