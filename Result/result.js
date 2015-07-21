document.addEventListener('DOMContentLoaded', function() {

    add = "M21.678,16.001l9.18-9.172c0.757-0.755,1.174-1.76,1.174-2.828s-0.417-2.073-1.174-2.829 c-0.755-0.755-1.762-1.171-2.831-1.171s-2.075,0.416-2.831,1.171l-9.182,9.172L6.833,1.172C6.077,0.416,5.072,0,4.001,0 c-1.069,0-2.074,0.416-2.83,1.172c-1.561,1.56-1.562,4.097,0,5.657l9.182,9.172l-9.181,9.172c-1.562,1.56-1.562,4.097,0,5.658 c0.756,0.755,1.762,1.171,2.831,1.171s2.075-0.416,2.831-1.172l9.181-9.172l9.181,9.171c0.756,0.755,1.761,1.172,2.83,1.172 c1.07,0,2.076-0.416,2.832-1.172c1.562-1.561,1.562-4.098,0-5.657L21.678,16.001z M29.442,29.415 c-0.757,0.755-2.075,0.756-2.832,0l-9.888-9.878c-0.391-0.391-1.024-0.391-1.415,0l-9.889,9.879c-0.757,0.755-2.075,0.755-2.832,0 c-0.78-0.78-0.78-2.049,0-2.829l9.889-9.879c0.188-0.188,0.293-0.441,0.293-0.707c0-0.265-0.105-0.52-0.293-0.707l-9.89-9.879 c-0.78-0.78-0.78-2.049,0-2.829C2.964,2.208,3.467,2,4.001,2c0.536,0,1.038,0.208,1.417,0.586l9.889,9.879 c0.391,0.391,1.024,0.391,1.415,0l9.889-9.878c0.757-0.756,2.075-0.756,2.832-0.001c0.378,0.378,0.587,0.881,0.587,1.415 s-0.209,1.036-0.587,1.414l-9.888,9.879c-0.391,0.391-0.391,1.023,0,1.414l9.888,9.878C30.223,27.366,30.223,28.635,29.442,29.415z";

    var btn = document.getElementById("search-btn");
    btn.addEventListener('click', function() {
       doClick();
    });

    var enter = document.getElementById('search-input');
    enter.addEventListener('keypress', function() {
        if (event.keyCode == 13) {
            doClick();
        } 
    });

    document.onkeydown = function() {
        if (event.keyCode == 27) {
            document.getElementById('search-input').blur();
        }
    };


    function doClick() {
        var input =  document.getElementById('search-input');
        notEscsrcStr = input.value;
        input.focus();
        input.value = "";
        srcStr = escape(notEscsrcStr);
        var main = document.getElementById('main');
        while (main.firstChild) main.removeChild(main.firstChild);
        json = theMovieDb.search.getTv({"query":srcStr}, successSearch, errorSearch);
    }

    document.getElementById('back-btn').addEventListener('click', function() {
        window.location.href="/Popup/popup.html";
    }); 
});


function successSearch(data) {
    var res = JSON.parse(data);

    if (res.results.length > 0) {
        document.getElementById("title").innerHTML = res.results.length + " results found for \"" + notEscsrcStr + "\"";
        var table = document.createElement('table');
        table.setAttribute('class', 'table-light overflow-hidden bg-white rounded');

            var thead = document.createElement('thead');
            thead.setAttribute('class', '');

                var tr = document.createElement('tr');
                    var th1 = document.createElement('th');
                    var th2 = document.createElement('th');
                    th2.innerHTML = 'Name';
                    var th3 = document.createElement('th');
                    th3.innerHTML = 'Year';
            var tbody = document.createElement('tbody');

        var maintablediv = document.getElementById('main');
        maintablediv.appendChild(table);
            table.appendChild(thead);
                thead.appendChild(tr);
                    tr.appendChild(th1);
                    tr.appendChild(th2);
                    tr.appendChild(th3);
            table.appendChild(tbody);

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
    } else {
        document.getElementById("title").innerHTML = "No results found!";
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
        addLink.appendChild(getSvg('add', add));
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

function getSvg(id, svg) {
    var div = document.createElement('div');
    div.setAttribute('class', 'iconsvg');
    div.innerHTML = '<svg class="iconsvg" viewBox="0 0 64 64" style="fill:currentcolor"><path d="'+ svg + '" transform="translate(20) rotate(45)"></path></svg>';
    return div;
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
