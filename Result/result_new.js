 /* ---------------------------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {

	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
	var SvgController = (function () {
		var addPath =  "M21.678,16.001l9.18-9.172c0.757-0.755,1.174-1.76,1.174-2.828s-0.417-2.073-1.174-2.829 c-0.755-0.755-1.762-1.171-2.831-1.171s-2.075,0.416-2.831,1.171l-9.182,9.172L6.833,1.172C6.077,0.416,5.072,0,4.001,0 c-1.069,0-2.074,0.416-2.83,1.172c-1.561,1.56-1.562,4.097,0,5.657l9.182,9.172l-9.181,9.172c-1.562,1.56-1.562,4.097,0,5.658 c0.756,0.755,1.762,1.171,2.831,1.171s2.075-0.416,2.831-1.172l9.181-9.172l9.181,9.171c0.756,0.755,1.761,1.172,2.83,1.172 c1.07,0,2.076-0.416,2.832-1.172c1.562-1.561,1.562-4.098,0-5.657L21.678,16.001z M29.442,29.415 c-0.757,0.755-2.075,0.756-2.832,0l-9.888-9.878c-0.391-0.391-1.024-0.391-1.415,0l-9.889,9.879c-0.757,0.755-2.075,0.755-2.832,0 c-0.78-0.78-0.78-2.049,0-2.829l9.889-9.879c0.188-0.188,0.293-0.441,0.293-0.707c0-0.265-0.105-0.52-0.293-0.707l-9.89-9.879 c-0.78-0.78-0.78-2.049,0-2.829C2.964,2.208,3.467,2,4.001,2c0.536,0,1.038,0.208,1.417,0.586l9.889,9.879 c0.391,0.391,1.024,0.391,1.415,0l9.889-9.878c0.757-0.756,2.075-0.756,2.832-0.001c0.378,0.378,0.587,0.881,0.587,1.415 s-0.209,1.036-0.587,1.414l-9.888,9.879c-0.391,0.391-0.391,1.023,0,1.414l9.888,9.878C30.223,27.366,30.223,28.635,29.442,29.415z";

		function getSvgDiv() {
			var div = document.createElement('div');
			div.setAttribute('class', 'iconsvg');
			div.innerHTML = '<svg class="iconsvg" viewBox="0 0 64 64" style="fill:currentcolor"><path d="'+ addPath + '" transform="translate(20) rotate(45)"></path></svg>';
			return div;
		}

		return {
			getSvgDiv: getSvgDiv
		};

	})();

	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
	var DomController = (function() {

		var r; // variable for search results (return by theMovieDb)
		_setListeners();

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

				_setListeners();
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
				    link.appendChild(SvgController.getSvgDiv());

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
			    tvs[i].year = date ? " (" + date.substring(0,4) + ") " : "";	// set year
			}
			return tvs;
		}

		/* ---------------------------------------------------------------------------------------------- */
		function _setListeners() {

			// if the search button  is clicked it will fire a search		
			document.getElementById("search-btn").addEventListener('click', function() {
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

			// if the back button is clicked it will redirect to the main html page
			document.getElementById('back-btn').addEventListener('click', function() {
			    window.location.href="/Popup/popup.html";
			}); 

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
			theMovieDb.tv.getById({"id":id}, function(data) {
		        var r = JSON.parse(data);
		        status = r.status;
		        theMovieDb.tvSeasons.getById({"id":id, "season_number":1}, function(data) {
		        	_successTvCB(data, id, name, status);
		        }, _errorTvCB);
	    	}, function() {});
		}

		function _successTvCB (data, id, name, status) {
	        var r = JSON.parse(data);
	        
	        var currSeasNumEps = r.episodes.length;

	        var currentDate = new Date();
	        var leftToSee = 0;
	        if (Date.parse(r.episodes[currSeasNumEps-1].air_date) < currentDate) {
	            leftToSee = currSeasNumEps;
	        } else {
	            for (var i = 0; i < currSeasNumEps; i++) {
	                var airDate = Date.parse(r.episodes[i].air_date);
	                if (airDate > currentDate) {
	                    break;
	                }
	                leftToSee++;
	            }
	        }

	        var save = r.id, selectedValues = JSON.stringify({'name': name, 
	                                                               'id': id, 
	                                                               'nextEp': '01', 
	                                                               'nextSeas': '01', 
	                                                               'epName': r.episodes[0].name,
	                                                               'currSeasNumEps': currSeasNumEps,
	                                                               'leftToSee': leftToSee,
	                                                               'lastEpAirDate': null,
	                                                               'status': status,
	                                                               'finishedSeas': false,
	                                                               'subtitles': "http://www.opensubtitles.org/en/search/searchonlytvseries-on/season-(S)/episode-(E)/moviename-(N)",
	                                                               'torrent':'https://torrentz.eu/search?q=(N)+s(S)e(E)',
	                                                               'streaming':''});

	        var jsonfile = {};
	        jsonfile[save] = selectedValues;
	        chrome.storage.sync.set(jsonfile, function() {});
	        window.location.href="/Popup/popup.html";

		}

		function _errorTvCB (data) {

		}

		return {
			addToCollection: addToCollection
		};
	})();
});
/* ---------------------------------------------------------------------------------------------- */