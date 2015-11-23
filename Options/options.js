document.addEventListener('DOMContentLoaded', function(e) {

    var SetListeners = (function() {

        var fieldName = 'sortingMainpage'
        SortController.toggleSorting(fieldName, null);

        document.getElementById('alphabetical').addEventListener('click', function() {
                SortController.toggleSorting(fieldName, 'alphabetical');
            });

            // document.getElementById('popularity').addEventListener('click', function() {
            //    SortController.toggleSorting(fieldName, 'popularity'); 
            // });

            document.getElementById('lastaired').addEventListener('click', function() {
                SortController.toggleSorting(fieldName, 'lastaired');
            });

        document.getElementById('delete').addEventListener('click', function() {
            chrome.storage.sync.clear();
        });
    })();

});