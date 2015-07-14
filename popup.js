document.addEventListener('DOMContentLoaded', function() {
	buildUserList();
	var btn = document.getElementById("search-btn");
	btn.addEventListener("click", handler);
});

/*

*/
function handler() {
	var content = document.getElementById("search-tf").value;
	// if something was insertend in the search field
    if (content) {
		document.getElementById("result").innerHTML = content;
        document.getElementById("search-btn").setAttribute("href", "result.html");
		localStorage.setItem("search-str", content);
    } else {
        document.getElementById("result").innerHTML = "Please, insert st!";
        document.getElementById("search-btn").setAttribute("href", "#");
    }
}

/*
Builds the user tv series list
*/
function buildUserList() {
	// building UL element for user's records
	var ul = document.createElement('ul')
	ul.setAttribute('id', 'user-tvs-ul');
	document.getElementById('user-list').appendChild(ul);
	insertUsersTvs(ul);
}


/*
It gets all info saved in chrome.storage and then puts them in the previously created list, with buttons for incrementing or decrementing
the last seen episode
*/
function insertUsersTvs(ul) {
	//final result = Name E01xS01 (Ep name) + -
	chrome.storage.sync.get(null, function(items) {
		// getting the keys of saved elements (i.e.: 'Name-ID')
		var keys = Object.keys(items);
		for (var i = 0; i < keys.length; i++) {
			var k = JSON.parse(items[keys[i]]);
			console.log(k);

			var li = document.createElement('li');
			li.setAttribute('data-tvs', k.id);
			var node = document.createTextNode(k.name + ' E' + k.nextEp + 'x' + 'S' + k.nextSeas + 
											' (' + k.epName + ' ' + k.leftToSee + ' ' + k.lastEpAirDate + ' ' + k.status + ')');
			li.appendChild(node);

			var increment = document.createElement('a');
			increment.setAttribute('class', 'incr-btn');
			var text = document.createTextNode('+');
			increment.appendChild(text);
			li.appendChild(increment);

			var decrement = document.createElement('a');
			decrement.setAttribute('class', 'decr-btn');
			decrement.setAttribute('href', '#');
			var text = document.createTextNode('-');
			decrement.appendChild(text);
			li.appendChild(decrement);

			var modName = k.name.replace(/\s+/g, '+').toLowerCase();
			var sublink = document.createElement('a');
			sublink.setAttribute('class', 'link-btn');
 			var text = document.createTextNode('Subs');
 			sublink.appendChild(text);
 			li.appendChild(sublink);

			var torrlink = document.createElement('a');
			torrlink.setAttribute('class', 'link-btn');
 			var text = document.createTextNode('Torr');
 			torrlink.appendChild(text);
 			li.appendChild(torrlink);

 			console.log(k.finishedSeas, "    cazziwow");
			if (k.lastEpAirDate == null && k.finishedSeas != true) {
				increment.setAttribute('href', '#');
				sublink.setAttribute('href', 'http://www.opensubtitles.org/en/search/searchonlytvseries-on/season-' + k.nextSeas + '/episode-' + k.nextEp + '/moviename-' + modName);
				torrlink.setAttribute('href', 'https://torrentz.eu/search?q=' + modName + '+s' + k.nextSeas + 'e' + k.nextEp);
			} else {
				increment.setAttribute('data-disabled', true);
				sublink.setAttribute('data-disabled', true);
				torrlink.setAttribute('data-disabled', true);
			}

			ul.appendChild(li);
		}



		// adding listeners for all episodes' + and -
		// when clicked they should overwrite the current record and increment or decrement it
		var incrBtns = document.getElementsByClassName('incr-btn');
		var decrBtns = document.getElementsByClassName('decr-btn');
		var linkBtns = document.getElementsByClassName('link-btn');
		var j = -1;
		for (var i = 0; i < incrBtns.length; i++) {
			if (!incrBtns[i].getAttribute('data-disabled')) {
				incrBtns[i].addEventListener('click', changeEpHandler);
				linkBtns[++j].addEventListener('click', linkHandler);
				linkBtns[++j].addEventListener('click', linkHandler);
			}
			decrBtns[i].addEventListener('click', changeEpHandler);

			function changeEpHandler () {
				var chromeStorageKey = this.parentNode.getAttribute('data-tvs');
				var isIncrement = this.getAttribute('class') == 'incr-btn' ? true : false;
				var selectedTvsLi = this.parentNode;
				chrome.storage.sync.get(chromeStorageKey, function(obj) {
					var selData = getSelectedTvsData(chromeStorageKey, obj);
					theMovieDb.tv.getById({"id":selData.id}, 
											function(data) {
												changeEpisode(isIncrement, data, chromeStorageKey, selData.name, selData.id, 
																selData.currEp, selData.currSeas, selData.epName, selData.currSeasNumEps, 
																selData.leftToSee, selData.lastEpAirDate, selData.status, selData.finishedSeas);
											}, function(data) {
												console.log("error");
											});
				});
			}

			

			function linkHandler () {
				chrome.tabs.create({active: true, url: this.href});
			}
		}
	});
}

/*
Fetches the tvs data (the one corresponding to the clicked '+' or '-') saved in chrome.storage.sync
Returns currEp, 
		currSeas, 
		currSeasNumEps	
*/
function getSelectedTvsData(chromeStorageKey, obj) {
	var plainJson = JSON.parse(obj[chromeStorageKey]);
	var name = plainJson.name;
	var id = plainJson.id;
	var currEp = plainJson.nextEp;
	var currSeas = plainJson.nextSeas;
	var epName = plainJson.epName;
	var currSeasNumEps = plainJson.currSeasNumEps;
	var leftToSee = plainJson.leftToSee;
	var lastEpAirDate = plainJson.lastEpAirDate;
	var status = plainJson.status;
	var finishedSeas = plainJson.finishedSeas;
	return {
		name: name,
		id: id,
		currEp: currEp,
		currSeas: currSeas,
		epName: epName,
		currSeasNumEps: currSeasNumEps,
		leftToSee: leftToSee,
		lastEpAirDate: lastEpAirDate,
		status: status,
		finishedSeas: finishedSeas
	};
}

/*
It checks if the next or previous episode is available and and if so, it gets and overwrite it in the corresponing chrome.storage.sync slot
*/
function changeEpisode(isIncrement, data, chromeStorageKey, name, id, currEp, currSeas, epName, currSeasNumEps, leftToSee, lastEpAirDate, status, finishedSeas) {
	var isEnded = false;
	var isAired = false;
	var res = JSON.parse(data);
	var resCurrSeas = [];
	for (var i = 0; i < res.seasons.length; i++) {
		if (res.seasons[i].season_number == currSeas) {
			resCurrSeas = res.seasons[i];
			break;
		}
	}
	
	currEp = parseInt(currEp);
	currSeas = parseInt(currSeas);

	status = res.status;
	var nums = updateEpSeasNumber(isIncrement, currEp, currSeas);
	var nextEp = nums.nextEp;
	var nextSeas = nums.nextSeas;
	var hasEnded = nums.hasEnded;

	if (!hasEnded) {
		theMovieDb.tvSeasons.getById({"id": id, "season_number": nextSeas}, successSeasonData, errorSeasonData);
	} else {
		jsonfile = getJsonForChromeSTorage(name, id, currEp, currSeas, '', currSeasNumEps, leftToSee, lastEpAirDate, status, hasEnded);
		chrome.storage.sync.set(jsonfile, function() {});
		window.location.href="popup.html";
		return;
	}

	/*
	It changes the episode and season number whether an increment or decrement is wanted
	*/
	function updateEpSeasNumber(isIncrement, currEp, currSeas) {
		var nextEp;
		var nextSeas;
		var hasEnded = false;
		if (isIncrement) {
			if (currEp + 1 <= resCurrSeas.episode_count) {
				// same season / next ep
				nextEp = currEp + 1;
				nextSeas = currSeas;
			} else if (currEp + 1 > resCurrSeas.episode_count && currSeas + 1 <= res.number_of_seasons) {
				// next season / first ep
				nextEp = 1;
				nextSeas = currSeas + 1;
			} else {
				hasEnded = true;
				console.log(hasEnded);
			}
		} else {
			if (currEp - 1 > 0) {
				// same season / next ep
				nextEp = currEp - 1;
				nextSeas = currSeas;
			} else if (currEp - 1 == 0 && currSeas - 1 > 0) {
				// next season / first ep
				nextEp = "last";
				nextSeas = currSeas - 1;
			} else {
				hasEnded = true;
				console.log(hasEnded);
			}
		}

		return {
			nextEp: nextEp,
			nextSeas: nextSeas,
			hasEnded: hasEnded
		}
	}

	/*
	It sets the data in chrome.storage
	*/
	function successSeasonData (data) {
		var res = JSON.parse(data);
		nextEp = nextEp == "last" ? res.episodes.length : nextEp;
		for (var i = 0; i < res.episodes.length; i++) {
			if (res.episodes[i].episode_number == nextEp) {
				var airDate = Date.parse(res.episodes[i].air_date);
				var currentDate = new Date();
				var epName = res.episodes[i].name;
				var leftToSee = 0;
				var lastEpAirDate = '';
				if (airDate > currentDate) {
					isAired = false;
					lastEpAirDate = res.episodes[i].air_date;
					leftToSee = null;
				} else {
					lastEpAirDate = null;
					for (var j = i; j < res.episodes.length; j++) {
						var airDate = Date.parse(res.episodes[j].air_date);
						if (airDate > currentDate) {
							break;
						}
						leftToSee++;
					}
				}
				jsonfile = getJsonForChromeSTorage(name, id, nextEp, nextSeas, epName, currSeasNumEps, leftToSee, lastEpAirDate, status, false);
				console.log(jsonfile);
				chrome.storage.sync.set(jsonfile, function() {});
				window.location.href="popup.html";
				return;
			}
		}
	}

	function errorSeasonData (data) {
		console.log("error");
	}
}

/*
Utility function for getting all the data to inserti in chrome.storage in json format
*/
function getJsonForChromeSTorage (name, id, nextEp, nextSeas, epName, currSeasNumEps, leftToSee, lastEpAirDate, status, finishedSeas) {
	// da cambiare
	nextEp = (nextEp < 10 ? '0' : '') + nextEp;
    nextSeas = (nextSeas < 10 ? '0' : '') + nextSeas;
	var save = id, selectedValues = JSON.stringify({'name':name, 
                                                           'id':id, 
                                                           'nextEp': nextEp, 
                                                           'nextSeas': nextSeas, 
                                                           'epName': epName,
                                                           'currSeasNumEps': currSeasNumEps,
                                                       	   'leftToSee': leftToSee,
                                                       	   'lastEpAirDate': lastEpAirDate,
                                                       	   'status': status,
                                                       	   'finishedSeas': finishedSeas});
	var jsonfile = {};
	jsonfile[save] = selectedValues;
	return jsonfile;
}