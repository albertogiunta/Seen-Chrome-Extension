var OptionsController = (function() {
	function viewOptionsMenu(main) {
		var id = main.getAttribute('data-tvs');
		main.setAttribute('class', 'optcontainer')
		chrome.storage.sync.get(id, function(obj) {
			var k = JSON.parse(obj[id]);
			OptionsDOMController.renderOptionsMenu(k, main);
		});
	}

	return {
		viewOptionsMenu: viewOptionsMenu
	}
})();

var OptionsDOMController = (function() {
	function renderOptionsMenu (k, main) {
		var hiddenStuff = new Array();
		_hideStuff(main, hiddenStuff);

		var mainText = _htmlMainTexts(k);
		var links = _htmlLinkTextFields(k);
		var btns = _htmlButtons(k);
		_htmlAppendElements(main, mainText, links, btns);

		_setGeneralListeners(k, btns.archivetvs, btns.deletetvs, btns.confirmbtn, btns.deletechangesbtn, main, links, hiddenStuff);
		// _setButtonsListeners(k, btns.seasonseen, btns.airedseen, btns.deletetvs);
	}

	function _hideStuff (main, hiddenStuff) {
		while (main.firstChild) {
			hiddenStuff.push(main.firstChild);
			main.removeChild(main.firstChild);
		}
	}

	function _htmlMainTexts (k) {
		var pname = document.createElement('p');
		pname.setAttribute('class', 'bold h3 mb0 maintitle flex-auto');
		pname.innerHTML = k.tvsName;

		var maindiv = document.createElement('div');
		maindiv.setAttribute('class', 'flex');

		return {
			pname: pname,
			maindiv: maindiv
		}
	}

	function _htmlLinkTextFields (k) {
		var divtextfieldscontainer = document.createElement('div');
		divtextfieldscontainer.setAttribute('class', 'mt1 navy flex-auto ml0');

		divtextfieldscontainer.appendChild(_getTextField('T', 'torrent-input ' + k.tvsId));
		divtextfieldscontainer.appendChild(_getTextField('S', 'streaming-input '+ k.tvsId));
		divtextfieldscontainer.appendChild(_getTextField('S', 'subtitles-input '+ k.tvsId));

		function _getTextField(label, id) {
			var div = document.createElement('div');
			div.setAttribute('class', '');

			var p = document.createElement('p');
			p.setAttribute('class', 'left m0 h5');
			p.innerHTML = label;

			var input = document.createElement('input');
			input.setAttribute('id', id);
			input.setAttribute('class', 'h5 m0 p0');
			input.setAttribute('type', 'search');

			if (id.indexOf('torrent-input') > -1) {
				input.value = k.torrent;
			} else if (id.indexOf('streaming-input') > -1) {
				input.value = k.streaming;
			} else if (id.indexOf('subtitles-input') > -1) {
				input.value = k.subtitles;
			}

			div.appendChild(p);
			div.appendChild(input);
			return div;
		}

		return {
			textfields: divtextfieldscontainer,
		}
	}

	function _htmlButtons (k) {

		var divleftbtnscontainer = document.createElement('div');
		divleftbtnscontainer.setAttribute('class', 'options ml2 mt1 col-1');
		var archivetvs = SvgController.getSvgElement(SvgController.getArchive());
		var deletetvs = SvgController.getSvgElement(SvgController.getTrash());
		divleftbtnscontainer.appendChild(archivetvs);
		divleftbtnscontainer.appendChild(deletetvs);

		var divrightbtnscontainer = document.createElement('div');
		divrightbtnscontainer.setAttribute('class', 'options mt1 col-1');
		var deletechangesbtn = SvgController.getSvgElement(SvgController.getClose());
		var confirmbtn = SvgController.getSvgElement(SvgController.getConfirm());
		divrightbtnscontainer.appendChild(deletechangesbtn);
		divrightbtnscontainer.appendChild(confirmbtn);

		return {
			leftbtns: divleftbtnscontainer,
			rightbtns: divrightbtnscontainer,
			confirmbtn: confirmbtn,
			deletechangesbtn: deletechangesbtn,
			archivetvs: archivetvs,
			deletetvs: deletetvs
		}
	}

	function _htmlAppendElements (main, mainText, links, btns) {
		main.appendChild(mainText.pname);
		main.appendChild(mainText.maindiv);
		mainText.maindiv.appendChild(btns.leftbtns);
		mainText.maindiv.appendChild(links.textfields);
		mainText.maindiv.appendChild(btns.rightbtns);
	}

	/* ---------------------------------------------------------------------------------------------- */

	function _setGeneralListeners(k, archivetvs, deletetvs, confirmbtn, deletechangesbtn, main, links, hiddenStuff) {
		
		// document.getElementById('subtitles-input'+ k.tvsId).select();
		
		// deletetvs.addEventListener('click', function () {
		// 	while (main.firstChild) {
		// 		main.removeChild(main.firstChild);
		// 	}
		// 	for (i = 0; i < hiddenStuff.length; i++) {
		// 		main.appendChild(hiddenStuff[i]);
		// 	}
		// });

		deletetvs.addEventListener('click', function () {
			chrome.storage.sync.remove(k.tvsId, function() {});
			window.location.href = "/Popup/popup.html";
		});

		confirmbtn.addEventListener('click', function () {
			k.subtitles = _getLink(document.getElementById('subtitles-input '+ k.tvsId).value);
			k.torrent = _getLink(document.getElementById('torrent-input '+ k.tvsId).value);
			k.streaming = _getLink(document.getElementById('streaming-input '+ k.tvsId).value);

			function _getLink (value) {
				console.log(value)
				if (value.slice(0, 4) != 'http' && value.length != 0) {
					value = 'http://' + value;
				}
				return value;
			}

			StorageController.setStorage(k, function(){
				window.location.href="/Popup/popup.html";
			});
		});

		deletechangesbtn.addEventListener('click', function() {
			main.setAttribute('class', 'flex optcontainer')
			while (main.firstChild) {
				main.removeChild(main.firstChild);
			}
			for (i = 0; i < hiddenStuff.length; i++) {
				main.appendChild(hiddenStuff[i]);
			}
		});
	}

	function _setButtonsListeners(k, seasonseen, airedseen, deletetvs) {
		// seasonseen.addEventListener('click', function () {
		// 	theMovieDb.tv.getById({"id":k.tvsId}, function(data){
		// 		var tv = JSON.parse(data);
		// 		k.tvsStatus = tv.status;
		// 		if (k.seasonNumber+1 <= tv.seasons[tv.seasons.length-1].season_number) {
		// 			theMovieDb.tvSeasons.getById({"id": k.tvsId, "season_number": (k.seasonNumber+1)}, function(data) {
		// 				ButtonsController.getFirstEpisodeOfSeason(JSON.parse(data), k, false);
		// 			}, function() {
		// 			});
		// 		} else {
		// 			theMovieDb.tvSeasons.getById({"id": k.tvsId, "season_number": k.seasonNumber}, function (data) {
		// 				ButtonsController.getLastAiredEpisodeInSeason(tv, JSON.parse(data), k);
		// 			}, function(){
		// 			});
		// 		}
		// 	}, function(){
		// 	});
		// });

		// airedseen.addEventListener('click', function () {
		// 	theMovieDb.tv.getById({"id": k.tvsId}, function(data) {
		// 		var r = JSON.parse(data);
		// 		k.tvsStatus = r.status;
		// 		theMovieDb.tvSeasons.getById({"id": k.tvsId, "season_number": ButtonsController.getLastSeasonNumber(r)}, function(data) {
		// 			ButtonsController.getLastAiredEpisodeInSeason(r, JSON.parse(data), k)
		// 		}, function(){
		// 		});
		// 	}, function(){
		// 	});
		// });
	}

	return {
		renderOptionsMenu: renderOptionsMenu
	}
})();

var ButtonsController = (function () {

	function getLastSeasonNumber (tv) {
		return tv.seasons[tv.seasons.length-1].season_number;
	}

	function getLastAiredEpisodeInSeason (tv, s, k) {
		if (k.leftToSee) {
			for (var i = 0; i < s.episodes.length; i++) {
				var date = new Date();
				var airDate = Date.parse(s.episodes[i].air_date);
				if (date < airDate || i == s.episodes.length-1) {
					k.episodeNumber = s.episodes[i].episode_number;
					k.seasonNumber =  s.season_number;
					k.episodeName = s.episodes[i].name;
					k.seasEpisodes = s.episodes.length;
					k.leftToSee = null;
					k.seasFinished = i == s.episodes.length-1 && i != 0 ? true : false;
					// k.tvsFinished = k.seasFinished && k.tvsStatus == 'Ended' ? true : false;
					k.tvsFinished = k.seasFinished ? true : false;
					k.episodeAirdate = s.episodes[i].air_date;
					StorageController.setStorage(k, function(){
						window.location.href="/Popup/popup.html";
					});
					break;
				}
			}
		}
	}

	function getFirstEpisodeOfSeason(r, k, flagSpecial) {
		var date = new Date();
		k.leftToSee = 0;
		// check how many new episodes are there
		for (var i = 0; i < r.episodes.length; i++) {
			var airDate = Date.parse(r.episodes[i].air_date);
			if (airDate < date) {
				k.leftToSee++;
			}
		}

		k.episodeNumber = 1;
		k.seasonNumber = r.season_number;
		k.episodeName = r.episodes[0].name;
		k.seasEpisodes = r.episodes.length;
		k.seasFinished = false;
		k.tvsFinished = false;
		k.episodeAirdate = r.episodes[0].air_date;
		StorageController.setStorage(k, function(){
			if (!flagSpecial) {
				window.location.href="/Popup/popup.html";
			}
		});
	}

	return {
		getLastSeasonNumber: getLastSeasonNumber,
		getLastAiredEpisodeInSeason: getLastAiredEpisodeInSeason,
		getFirstEpisodeOfSeason: getFirstEpisodeOfSeason
	}

})();
