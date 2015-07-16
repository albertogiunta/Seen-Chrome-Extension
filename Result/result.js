document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById("search-btn");
    btn.addEventListener('click', function() {
        var input =  document.getElementById('search-input');
        var srcStr = input.value;
         input.focus();
         input.value = "";
    	if (srcStr) {
    	    document.getElementById("title").innerHTML = "Results found for \"" + srcStr + "\"";
    	    srcStr = escape(srcStr);
    	    json = theMovieDb.search.getTv({"query":srcStr}, successSearch, errorSearch);
    	} else {
    	    document.getElementById("title").innerHTML = "No results found!";
    	}
    });
    document.getElementById('back-btn').addEventListener('click', function() {
        window.location.href="/Popup/popup.html";
    }); 
});


function successSearch(data) {
    var res = JSON.parse(data);
    var tbody = document.getElementsByTagName("tbody")[0];
    createList(createArray(res), tbody); // creating the result list
    // adding the listener for every "add to collection" button
    var cta = document.getElementsByClassName("tvs-a")
    for (var i = 0; i < cta.length; i++) {
        cta[i].addEventListener("click", function() {
            selectedName = this.getAttribute("data-tvsname");
            selectedId = this.getAttribute("data-tvsid");
            addTvs();
        });
    }
};

function errorSearch(data) {
	console.log("Error callback: " + data);
}; 

/*
Rimapping the json and only getting useful values (id, name, year)
*/
function createArray(data) {
    var tvs = [];
    for (var i = 0; i < data.results.length; i++) {
        tvs[i] = {};
        tvs[i].id = "" + data.results[i].id;
        tvs[i].name = data.results[i].name;
        var date = data.results[i].first_air_date;
        tvs[i].year = date ? " (" + date.substring(0,4) + ") " : "";
    }
    return tvs;
}

/* 
Creating html list
*/
function createList(data, tbody) {
    for (var i = 0; i < data.length; i++) {
       
        var row =  document.createElement("tr");

        var link = document.createElement("td")
        var addLink = document.createElement("a");
        addLink.setAttribute("class", "tvs-a");
        addLink.setAttribute("data-tvsid", data[i].id);
        addLink.setAttribute("data-tvsname", data[i].name);
        addLink.setAttribute("href", "#");
        addLink.appendChild(document.createTextNode("+"));
        link.appendChild(addLink);

        var name = document.createElement("td");
        name.appendChild(document.createTextNode(data[i].name));

        var year = document.createElement("td");
        year.appendChild(document.createTextNode(data[i].year));

        row.appendChild(link);
        row.appendChild(name);
        row.appendChild(year);

        tbody.appendChild(row);
    }
}

/*
Getting first infos about tvs and calling method for further infos about first episode
*/
function addTvs() {
    theMovieDb.tv.getById({"id":selectedId}, function(data) {
        var res = JSON.parse(data);
        status = res.status;
        
        theMovieDb.tvSeasons.getById({"id":selectedId, "season_number":1}, 
        	// success callback
        	function(data){
    	        var res = JSON.parse(data);
    	        currSeasNumEps = res.episodes.length;

                var currentDate = new Date();
                leftToSee = 0;
                if (Date.parse(res.episodes[currSeasNumEps-1].air_date) < currentDate) {
                    leftToSee = currSeasNumEps;
                } else {
                    for (var i = 0; i < currSeasNumEps; i++) {
                        var airDate = Date.parse(res.episodes[i].air_date);
                        if (airDate > currentDate) {
                            break;
                        }
                        leftToSee++;
                    }
                }

    	        theMovieDb.tvEpisodes.getById({"id":selectedId, "season_number": 1, "episode_number": 1}, successAdd, errorAdd);
        	}, function(data) { // error callback
            	console.log("Error occurred");
        });
    }, function(data) {
        console.log("Error occurred");
    });
}

/*
It actually saves the data in chrome.storage.sync
*/
function successAdd(data) {
    result = JSON.parse(data);
    epNum = (result.episode_number < 10 ? '0' : '') + result.episode_number;
    seasNum = (result.season_number < 10 ? '0' : '') + result.season_number;
    var save = selectedId, selectedValues = JSON.stringify({'name':selectedName, 
                                                           'id':selectedId, 
                                                           'nextEp': epNum, 
                                                           'nextSeas': seasNum, 
                                                           'epName': result.name,
                                                           'currSeasNumEps': currSeasNumEps,
                                                           'leftToSee': leftToSee,
                                                           'lastEpAirDate': null,
                                                           'status': status,
                                                           'finishedSeas': false});

    var jsonfile = {};
    jsonfile[save] = selectedValues;
    chrome.storage.sync.set(jsonfile, function() {});
    window.location.href="/Popup/popup.html";
}

function errorAdd(data) {
	console.log("Error occurred");
}
