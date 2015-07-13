document.addEventListener('DOMContentLoaded', function() {
	var srcStr = localStorage.getItem("search-str");
	localStorage.removeItem("search-str");
	if (srcStr) {
	    document.getElementById("title").innerHTML = "Results found for \"" + srcStr + "\"";
	    srcStr = escape(srcStr);
	    json = theMovieDb.search.getTv({"query":srcStr}, successSearch, errorSearch);
	} else {
	    document.getElementById("title").innerHTML = "No results found!";
	}
});

function successSearch(data) {
    var res = JSON.parse(data);
    document.getElementById("result_list").appendChild(createList(createArray(res))); // creating the result list
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

// rimappo il json prendendo solo i valori che mi servono (id, nome, anno)
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
function createList(data) {
    var list = document.createElement("ul");
    list.setAttribute("id", "tvs-ul");
    for (var i = 0; i < data.length; i++) {
        
        var item = document.createElement("li");
        item.setAttribute("class", "tvs-li")

        var link = document.createElement("a");
        link.setAttribute("class", "tvs-a");
        link.setAttribute("data-tvsid", data[i].id);
        link.setAttribute("data-tvsname", data[i].name);
        link.setAttribute("href", "#");
        var node = document.createTextNode("CTA");
        link.appendChild(node);
        
        item.appendChild(document.createTextNode(data[i].name + data[i].year));
        item.appendChild(link);
        list.appendChild(item);
    }
    return list;
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
                                                           'status': status});

    var jsonfile = {};
    jsonfile[save] = selectedValues;
    chrome.storage.sync.set(jsonfile, function() {});
    window.location.href="popup.html";
}

function errorAdd(data) {
	console.log("Error occurred");
}
