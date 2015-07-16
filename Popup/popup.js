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

			k.lastEpAirDate = !k.lastEpAirDate ? " " : k.lastEpAirDate;
			k.leftToSee = !k.leftToSee ? " " : k.leftToSee;
			
			var main = document.getElementById('main');

			var container = document.createElement('div');
			container.setAttribute('class', 'flex mb1');
			container.setAttribute('data-tvs', k.id);
			main.appendChild(container);

				var backbtn = document.createElement('button'); 
				backbtn.setAttribute('class', 'btn rounded-left white bg-blue decr-btn');
				backbtn.innerHTML = '&#60';
				backbtn.addEventListener('click', function() {
					window.location.href = "#"
				});
				container.appendChild(backbtn);

				var maindiv = document.createElement('div');
				maindiv.setAttribute('class', 'overflow-scroll flex-auto overflow-hidden bg-white rounded p0');
				container.appendChild(maindiv);
				
					var pname = document.createElement('p');
					pname.setAttribute('class', 'center h3 pb0.4 m0');
					pname.innerHTML = k.name;
					maindiv.appendChild(pname);

					var pnext = document.createElement('p');
					pnext.setAttribute('class', 'center h5 m0');
					pnext.innerHTML = 'Next to see: <b>' + 'E' + k.nextEp + 'x' + 'S' + k.nextSeas + '</b> <i>' + k.epName + '</i>';
					maindiv.appendChild(pnext);

					var pleft = document.createElement('p');
					pleft.setAttribute('class', 'center h6 m0');
					pleft.innerHTML = '(<b>' + k.leftToSee + '</b> ep. left to see in this season)';
					maindiv.appendChild(pleft);

					var plinks = document.createElement('p');
					plinks.setAttribute('class', 'center pb0 mb0 h6');
					maindiv.appendChild(plinks);

						
						var sub = document.createElement('a');
						sub.setAttribute('class', 'btn button-narrow link-btn');
						sub.innerHTML = 'Subtitles';
						plinks.appendChild(sub);

						var torrent = document.createElement('a');
						torrent.setAttribute('class', 'btn button-narrow link-btn');
						torrent.innerHTML = 'Torrent';
						plinks.appendChild(torrent);

						var streaming = document.createElement('a');
						streaming.setAttribute('class', 'btn button-narrow link-btn');
						streaming.setAttribute('href', '#');
						streaming.innerHTML = 'Streaming';
						plinks.appendChild(streaming);

				var nextbtn = document.createElement('button'); 
				nextbtn.setAttribute('class', 'btn rounded-right white bg-blue incr-btn');
				nextbtn.innerHTML = '&#62';
				container.appendChild(nextbtn);
			
			console.log(k.lastEpAirDate, k.finishedSeas);

			if (k.lastEpAirDate == " " && k.finishedSeas == false) {
				var modName = k.name.replace(/\s+/g, '+').toLowerCase();
				nextbtn.setAttribute('href', '#');
				sub.setAttribute('href', 'http://www.opensubtitles.org/en/search/searchonlytvseries-on/season-' + k.nextSeas + '/episode-' + k.nextEp + '/moviename-' + modName);
				torrent.setAttribute('href', 'https://torrentz.eu/search?q=' + modName + '+s' + k.nextSeas + 'e' + k.nextEp);
				streaming.setAttribute('href', '#');
			} else {
				nextbtn.setAttribute('data-disabled', true);
				sub.setAttribute('data-disabled', true);
				torrent.setAttribute('data-disabled', true);
				streaming.setAttribute('data-disabled', true);
			}
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
				var isIncrement = this.className.split(" ").indexOf('incr-btn') > 1 ? true : false;
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
		window.location.href="/Popup/popup.html";
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
				window.location.href="/Popup/popup.html";
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