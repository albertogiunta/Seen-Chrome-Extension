 /* ---------------------------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {

	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
	var DomController = (function() {

		_getElements();

        // Get header's links elements
        function _getElements() {
            document.getElementById('author').addEventListener('click', _createTabForLink);
            document.getElementById('review').addEventListener('click', _createTabForLink);
            document.getElementById('store').addEventListener('click', _createTabForLink);
            document.getElementById('donation').addEventListener('click', _createTabForLink);
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

		var r; // variable for search results (return by theMovieDb)
		
		var fieldName = 'sortingResults';
		SortController.toggleSorting(fieldName, null, false)
		
		_setGeneralListeners();

		function renderSearch(data) {
			r = JSON.parse(data);

			if (r.results.length == 0) {
				document.getElementById("title").innerHTML = "No results found!";
			} else {
				// dom caching
				var main = document.getElementById('main');
				var searchForm =  document.getElementById('search-input');

				_setTitle(searchForm.value);
				_resetPage(searchForm, main);
				
				_createResultsTable();

				_setAdditionBtnsListeners();
			}
		}

		function _setTitle(searchString) {
			document.getElementById("title").innerHTML = r.results.length + " results found for \"" + searchString + "\"";
		}

		function _resetPage(searchForm, main) {
			while (main.firstChild) {
				main.removeChild(main.firstChild);
			}
			searchForm.value = "";
			searchForm.focus();
		}

		function _createResultsTable() {
				var table = document.createElement('table');
				table.setAttribute('class', 'table-light overflow-hidden bg-white rounded');

				    var thead = document.createElement('thead');

				        var tr = document.createElement('tr');
				            var th1 = document.createElement('th'); // column for + button
				            var th2 = document.createElement('th'); // column for tvs name
				            th2.innerHTML = 'Name';
				            var th3 = document.createElement('th'); // column for tvs year
				            th3.innerHTML = 'Year';
				            
				    var tbody = document.createElement('tbody');

			main.appendChild(table);
			    table.appendChild(thead);
			        thead.appendChild(tr);
			            tr.appendChild(th1);
			            tr.appendChild(th2);
			            tr.appendChild(th3);
			    table.appendChild(tbody);

			_createResultList(_remapResults(), tbody); // creating the result list
		}

		

		function _createResultList (data, tbody) {
			for (var i = 0; i < data.length; i++) {
			    var row =  document.createElement("tr");

			    	var linkCol = document.createElement("td")
			    	var link = document.createElement("a");
				    link.setAttribute("class", "tvs-a");
				    link.setAttribute("data-tvsid", data[i].id);
				    link.setAttribute("data-tvsname", data[i].name);
				    link.setAttribute("href", "#");
				    link.appendChild(SvgController.getSvgElement(SvgController.getAdd()));

				    var name = document.createElement("td");
				    name.appendChild(document.createTextNode(data[i].name));

				    var year = document.createElement("td");
				    year.appendChild(document.createTextNode(data[i].year));

			    tbody.appendChild(row);
				    row.appendChild(linkCol);
					    linkCol.appendChild(link);
				    row.appendChild(name);
				    row.appendChild(year);
			}
		}

		function _remapResults() {
			var tvs = [];
			for (var i = 0; i < r.results.length; i++) {
			    tvs[i] = {};
			    tvs[i].id = "" + r.results[i].id; 								// set id
			    tvs[i].name = r.results[i].name; 								// set name
			    var date = r.results[i].first_air_date;							
			    tvs[i].year = date ? date.substring(0,4) : "";	// set year
			    tvs[i].popularity = r.results[i].popularity;
			}
			return SortController.sort(tvs, null, fieldName);
		}

		
		/* ---------------------------------------------------------------------------------------------- */
		function _setGeneralListeners() {
			
			
			// if the search button  is clicked it will fire a search		
			document.getElementById("search").addEventListener('click', function() {
				SearchController.search();
			});

			// if enter is pressed when the search input form has focus, it will fire a search
			document.getElementById('search-input').addEventListener('keypress', function() {
			    if (event.keyCode == 13) {
			    	SearchController.search();
			    } 
			});

			// if esc is pressed, the search input form will lose focus
			document.onkeydown = function() {
			    if (event.keyCode == 27) {
			        document.getElementById('search-input').blur();
			    }
			};

			document.getElementById('alphabetical').addEventListener('click', function() {
				SortController.toggleSorting(fieldName, 'alphabetical', false)
				_refreshTable();
			});

			document.getElementById('popularity').addEventListener('click', function() {
				SortController.toggleSorting(fieldName, 'popularity', false)		
				_refreshTable();
			});

			document.getElementById('year').addEventListener('click', function() {
				SortController.toggleSorting(fieldName, 'year', false)
				_refreshTable();
			});
		}

		function _refreshTable () {
			if (r != undefined) {
				var main = document.getElementById('main');
				var searchForm =  document.getElementById('search-input');
				_resetPage(searchForm, main);
				_createResultsTable();
				_setAdditionBtnsListeners();
			}
		}

		function _setAdditionBtnsListeners() {
			// listener for every "add to collection" button		
			var addBtn = document.getElementsByClassName("tvs-a")
			for (var i = 0; i < addBtn.length; i++) {
			    addBtn[i].addEventListener("click", function() {
			        var name = this.getAttribute("data-tvsname");
			        var id = this.getAttribute("data-tvsid");
			        AdditionController.addToCollection(id, name);
			    });
			}
		}

		/* ---------------------------------------------------------------------------------------------- */
		return {
			renderSearch: renderSearch
		};
	})();


	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
	var SearchController = (function () {

		var searchForm = document.getElementById('search-input');

		function _getString() {
			return searchForm.value;
		}

		function search () {
			if (_getString().length > 0) {
				json = theMovieDb.search.getTv({"query":escape(_getString())}, _successSearchCB, _errorSearchCB);
			}
		}

		function _successSearchCB(data) {
			DomController.renderSearch(data);
		}

		function _errorSearchCB(data) {
		
		}

		/* ---------------------------------------------------------------------------------------------- */
		return {
			search: search
		};

	})();


	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
	var AdditionController = (function() {

		function addToCollection(id, name) {
			theMovieDb.tv.getById({"id":id}, 
				function(data) {
			        var r = JSON.parse(data);
			        status = r.status;
			        theMovieDb.tvSeasons.getById({"id":id, "season_number":1}, 
			        	function(data) {
			        		_successSeasonCB(data, id, name, status);
		        		}, function() {
		        		});
	    		}, function() {
	    		});	
		}

		function _successSeasonCB (data, id, name, status) {
	        var r = JSON.parse(data);
	        var subtitles = 'http://www.opensubtitles.org/en/search/searchonlytvseries-on/season-(S)/episode-(E)/moviename-(N+)';
           	var torrent = 'https://torrentz.eu/search?q=(N)+s(S)e(E)';
           	var streaming = 'http://www.alluc.ee/stream/(N)+s(S)+e(E)'
	        
	        var seasEpisodes = r.episodes.length;

	        var currentDate = new Date();
	        var leftToSee = 0;
	        if (Date.parse(r.episodes[seasEpisodes-1].air_date) < currentDate) {
	            leftToSee = seasEpisodes;
	        } else {
	            for (var i = 0; i < seasEpisodes; i++) {
	                var airDate = Date.parse(r.episodes[i].air_date);
	                if (airDate > currentDate) {
	                    break;
	                }
	                leftToSee++;
	            }
	        }

        	var selectedValues = JSON.stringify({'tvsName': name, 
                                                  'tvsId': id, 
                                                  'episodeNumber': r.episodes[0].episode_number,
                                                  'seasonNumber': r.episodes[0].season_number,
                                                  'episodeName': r.episodes[0].name,
                                                  'seasEpisodes': seasEpisodes,
                                                  'leftToSee': leftToSee,
                                                  'episodeAirdate': r.episodes[0].air_date,
                                                  'tvsStatus': status,
                                                  'seasFinished': false,
                                                  'tvsFinished': false,
                                                  'subtitles': localStorage.getItem('subtitles-input'),
                                                  'torrent': localStorage.getItem('torrent-input'),
                                                  'streaming': localStorage.getItem('streaming-input'),
                                                  'additionDate': new Date()
                                              });

	        var jsonfile = {};
	        jsonfile[id] = selectedValues;
	        chrome.storage.sync.set(jsonfile, function() {});
	        window.location.href="/Popup/popup.html";
		}

		function _errorSeasonCB (data) {
		}

		return {
			addToCollection: addToCollection
		};
	})();
});
/* ---------------------------------------------------------------------------------------------- */