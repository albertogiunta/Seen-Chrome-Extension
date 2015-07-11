document.addEventListener('DOMContentLoaded', function() {
	buildUserList();
});

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

			var li = document.createElement('li');
			li.setAttribute('data-tvs', k.name + '-' + k.id);
			var node = document.createTextNode(k.name + ' E' + k.nextEp + 'x' + 'S' + k.nextSeas + ' (' + k.epName + ')');
			li.appendChild(node);

			var increment = document.createElement('a');
			increment.setAttribute('class', 'incr-btn');
			increment.setAttribute('href', '#');
			var text = document.createTextNode('+');
			increment.appendChild(text);
			li.appendChild(increment);

			var decrement = document.createElement('a');
			decrement.setAttribute('class', 'decr-btn');
			decrement.setAttribute('href', '#');
			var text = document.createTextNode('-');
			decrement.appendChild(text);
			li.appendChild(decrement);

			ul.appendChild(li);
		}

		// adding listeners for all episodes' + and -
		// when clicked they should overwrite the current record and increment or decrement it
		var incrBtns = document.getElementsByClassName('incr-btn');
		var decrBtns = document.getElementsByClassName('decr-btn');

		for (var i = 0; i < incrBtns.length; i++) {

			incrBtns[i].addEventListener('click', function() {
				// retrieving the selected tv series' data 
				var chromeStorageKey = this.parentNode.getAttribute('data-tvs');
				var selectedTvsLi = this.parentNode;
				chrome.storage.sync.get(chromeStorageKey, function(obj) {
					var selectedData = getSelectedTvsData(chromeStorageKey, obj);
					var name = selectedData.name;
					var id = selectedData.id;
					var currEp = selectedData.currEp;
					var currSeas = selectedData.currSeas;
					var currSeasNumEps = selectedData.currSeasNumEps;

					// console.log(selectedTvsLi, chromeStorageKey, id, currEp, currSeas, currSeasNumEps);
					// incrementEpisode(chromeStorageKey, currEp, currSeas, currSeasNumEps);
					theMovieDb.tv.getById({"id":id}, 
					function(data) {
						incrementEpisode(data, chromeStorageKey, name, id, currEp, currSeas, currSeasNumEps);
					}, function(data) {
						// do something if error occurs
					});
				});
			});

			decrBtns[i].addEventListener('click', function() {
				// retrieving the selected tv series' data 
				var chromeStorageKey = this.parentNode.getAttribute('data-tvs');
				var selectedTvsLi = this.parentNode;
				chrome.storage.sync.get(dataTvs, function(obj) {
					var selectedData = getSelectedTvsData(chromeStorageKey, obj);
					var currEp = selectedData.currEp;
					var currSeas = selectedData.currSeas;


					decrementEpisode(decrBtns[i], chromeStorageKey, currEp, currSeas);
				});
			});
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
	var currEp = plainJson.nextEp;
	var currSeas = plainJson.nextSeas;
	var currSeasNumEps = plainJson.currSeasNumEps;
	var id = plainJson.id;
	var name = plainJson.name;
	return {
		name: name,
		id: id,
		currEp: currEp,
		currSeas: currSeas,
		currSeasNumEps: currSeasNumEps,
	};
}

function incrementEpisode(data, chromeStorageKey, name, id, currEp, currSeas, currSeasNumEps) {
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
	var nextEp = currEp;
	var nextSeas = currSeas;
	console.log(nextEp, nextSeas);
	console.log(res.episode_count, res.number_of_seasons);

	if (currEp + 1 <= resCurrSeas.episode_count) {
		// same season / next ep
		nextEp++;
	} else if (currEp + 1 > resCurrSeas.episode_count && currSeas + 1 <= res.number_of_seasons) {
		// next season / first ep
		nextSeas++;
		nextEp = 1;
	} else {
		isEnded = true;
		console.log(isEnded);
	}

	if (!isEnded) {
		theMovieDb.tvSeasons.getById({"id": id, "season_number": currSeas}, successSeasonData, errorSeasonData);
	}

	function successSeasonData (data) {
		var res = JSON.parse(data);
		for (var i = 0; i < res.episodes.length; i++) {
			if (res.episodes[i].episode_number == nextEp) {
				var airDate = Date.parse(res.episodes[i].air_date);
				var currentDate = new Date();
				if (airDate > currentDate) {
					isAired = false;
					console.log(isAired);
					return;
				}
				var epName = res.episodes[i].name;
				console.log("wut");
				jsonfile = getJsonForChromeSTorage(name, id, nextEp, nextSeas, epName, currSeasNumEps);
				chrome.storage.sync.set(jsonfile, function() {
					console.log("changed");
				});
				window.location.href="popup.html";
				return;
			}
		}

	}

	function errorSeasonData (data) {
		console.log("error");
		// do something if error occurs
	}
	// check if exists next in same season
	// if yes take next one
	// if not check if exists next season
		// if yes take first episode
		// if not tvs has ended
}

function getJsonForChromeSTorage (name, id, nextEp, nextSeas, epName, currSeasNumEps) {
	// da cambiare
	var valueName = name + "-" + id;
	nextEp = (nextEp < 10 ? '0' : '') + nextEp;
    nextSeas = (nextSeas < 10 ? '0' : '') + nextSeas;
	var save = valueName, selectedValues = JSON.stringify({'name':name, 
                                                               'id':id, 
                                                               'nextEp': nextEp, 
                                                               'nextSeas': nextSeas, 
                                                               'epName': epName,
                                                               'currSeasNumEps': currSeasNumEps});
	var jsonfile = {};
	jsonfile[save] = selectedValues;
	console.log(jsonfile);
	return jsonfile;
}