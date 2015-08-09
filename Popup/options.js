var OptionsController = (function() {
	function viewOptionsMenu(main) {
		var id = main.getAttribute('data-tvs');
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

		_setGeneralListeners(k, btns.confirmbtn, btns.deletechangesbtn, main, links, hiddenStuff);
		_setButtonsListeners(k, btns.seasonseen, btns.airedseen, btns.deletetvs);
	}

	function _hideStuff (main, hiddenStuff) {
		while (main.firstChild) {
			hiddenStuff.push(main.firstChild);
			main.removeChild(main.firstChild);
		}
	}

	function _htmlMainTexts (k) {
		var maindiv = document.createElement('div');
		maindiv.setAttribute('class', 'overflow-scroll flex-auto overflow-hidden p0');

		var pname = document.createElement('h3');
		pname.setAttribute('class', 'center pb0.4 m0 maintitle divider');
		pname.innerHTML = k.tvsName;

		return {
			maindiv: maindiv,
			pname: pname,
		}
	}

	function _htmlLinkTextFields (k) {
		var divtip = document.createElement('div');
		divtip.setAttribute('class', 'flex flex-center header');

		var ptip = document.createElement('p');
		ptip.setAttribute('class', 'flex-none left h6 m0');
		ptip.innerHTML = "Smart Links TIP: (N) &#8594; TvSeries Name / (S) &#8594; n &#176; Season / (E) &#8594; n &#176; Episode</br>";

		var divsubs = document.createElement('div');
		divsubs.setAttribute('class', 'flex flex-center');

		var psubs = document.createElement('p');
		psubs.setAttribute('class', 'flex-none col-2 left h6 m0');
		psubs.innerHTML = "Subtitles: ";

		var fsubs = document.createElement('input');
		fsubs.setAttribute('id', 'subs-input');
		fsubs.setAttribute('class', 'flex-auto h5 field not rounded');
		fsubs.setAttribute('type', 'search');
		fsubs.value = k.subtitles;


		var divtorrent = document.createElement('div');
		divtorrent.setAttribute('class', 'flex flex-center');

		var ptorrent = document.createElement('p');
		ptorrent.setAttribute('class', 'flex-none col-2 left h6 m0');
		ptorrent.innerHTML = "Torrent: ";

		var ftorrent = document.createElement('input');
		ftorrent.setAttribute('id', 'torrent-input');
		ftorrent.setAttribute('class', 'flex-auto h5 field not rounded');
		ftorrent.setAttribute('type', 'search');
		ftorrent.value = k.torrent;

		var divstreaming = document.createElement('div');
		divstreaming.setAttribute('class', 'flex flex-center');

		var pstreaming = document.createElement('p');
		pstreaming.setAttribute('class', 'flex-none col-2 left h6 m0');
		pstreaming.innerHTML = "Streaming: ";

		var fstreaming = document.createElement('input');
		fstreaming.setAttribute('id', 'streaming-input');
		fstreaming.setAttribute('class', 'flex-auto h5 field not rounded');
		fstreaming.setAttribute('type', 'search');
		fstreaming.value = k.streaming;

		return {
			divtip: divtip,
			ptip: ptip,
			divsubs: divsubs,
			psubs: psubs,
			fsubs: fsubs,
			divtorrent: divtorrent,
			ptorrent: ptorrent,
			ftorrent: ftorrent,
			divstreaming: divstreaming,
			pstreaming: pstreaming,
			fstreaming: fstreaming
		}
	}

	function _htmlButtons (k) {
		var pops = document.createElement('p');
		pops.setAttribute('class', 'center mb1 h5 link-btn-container');

		var seasonseen = document.createElement('button');
		var airedseen = document.createElement('button');

		if (k.leftToSee) {
			airedseen.setAttribute('class', 'btn btn-outline mb1 ml1 navy outlined');
			airedseen.innerHTML = 'Set all aired as seen';
			seasonseen.setAttribute('class', 'btn btn-outline mb1 ml1 navy outlined');
			seasonseen.innerHTML = 'Set season ' + k.seasonNumber + ' as seen';
		} else {
			airedseen.setAttribute('class', 'btn btn-outline mb1 ml1 navy outlined inactive-btn');
			airedseen.innerHTML = 'You\'re already up to date';
			seasonseen.setAttribute('class', 'btn btn-outline mb1 ml1 navy outlined inactive-btn');
			seasonseen.innerHTML = 'You\'re already up to date';
		}

		var deletetvs = document.createElement('button');
		deletetvs.setAttribute('class', 'btn btn-outline mb1 ml1 navy outlined');
		deletetvs.innerHTML = 'Delete "' + k.tvsName + '" from collection';

		var promptdiv = document.createElement('div');
		promptdiv.setAttribute('class', 'flex mt2');

		var confirmbtn = SvgController.getSvgElement(SvgController.getCheck());
		var deletechangesbtn = SvgController.getSvgElement(SvgController.getCross());

		return {
			pops: pops,
			seasonseen: seasonseen,
			airedseen: airedseen,
			deletetvs: deletetvs,
			promptdiv: promptdiv,
			confirmbtn: confirmbtn,
			deletechangesbtn: deletechangesbtn
		}
	}

	function _htmlAppendElements (main, mainText, links, btns) {
		main.appendChild(mainText.maindiv);
		mainText.maindiv.appendChild(mainText.pname);
			mainText.maindiv.appendChild(btns.pops);
				btns.pops.appendChild(btns.seasonseen);
				btns.pops.appendChild(btns.airedseen);
				btns.pops.appendChild(btns.deletetvs);
			mainText.maindiv.appendChild(links.divtip);
				links.divtip.appendChild(links.ptip);
			mainText.maindiv.appendChild(links.divsubs);
				links.divsubs.appendChild(links.psubs);
				links.divsubs.appendChild(links.fsubs);
			mainText.maindiv.appendChild(links.divtorrent);
				links.divtorrent.appendChild(links.ptorrent);
				links.divtorrent.appendChild(links.ftorrent);
			mainText.maindiv.appendChild(links.divstreaming);
				links.divstreaming.appendChild(links.pstreaming);
				links.divstreaming.appendChild(links.fstreaming);
			mainText.maindiv.appendChild(btns.promptdiv);
				btns.promptdiv.appendChild(btns.confirmbtn);
				btns.promptdiv.appendChild(btns.deletechangesbtn);
	}

	/* ---------------------------------------------------------------------------------------------- */

	function _setGeneralListeners(k, confirmbtn, deletetvs, main, links, hiddenStuff) {
		links.fsubs.select();
		confirmbtn.addEventListener('click', function () {
			k.subtitles = _getLink(links.fsubs.value);
			k.torrent = _getLink(links.ftorrent.value);
			k.streaming = _getLink(links.fstreaming.value);

			function _getLink (value) {
				 if (value.slice(0, 6) != 'http://') {
					value = 'http://' + value;
				}
				return value;
			}

			StorageController.setStorage(k, function(){
				window.location.href="/Popup/popup.html";
			});
		});

		deletetvs.addEventListener('click', function () {
			while (main.firstChild) {
				main.removeChild(main.firstChild);
			}
			for (i = 0; i < hiddenStuff.length; i++) {
				main.appendChild(hiddenStuff[i]);
			}
		});
	}

	function _setButtonsListeners(k, seasonseen, airedseen, deletetvs) {
		seasonseen.addEventListener('click', function () {
			theMovieDb.tv.getById({"id":k.tvsId}, function(data){
				var tv = JSON.parse(data);
				k.tvsStatus = tv.status;
				if (k.seasonNumber+1 <= tv.seasons[tv.seasons.length-1].season_number){
					theMovieDb.tvSeasons.getById({"id": k.tvsId, "season_number": (k.seasonNumber+1)}, function(data) {
						ButtonsController.getFirstEpisodeOfSeason(JSON.parse(data), k, false);
					}, function() {
					});
				} else {
					theMovieDb.tvSeasons.getById({"id": k.tvsId, "season_number": k.seasonNumber}, function (data) {
						ButtonsController.getLastAiredEpisodeInSeason(tv, JSON.parse(data), k);
					}, function(){
					});
				}
			}, function(){
			});
		});

		airedseen.addEventListener('click', function () {
			theMovieDb.tv.getById({"id": k.tvsId}, function(data) {
				var r = JSON.parse(data);
				k.tvsStatus = r.status;
				theMovieDb.tvSeasons.getById({"id": k.tvsId, "season_number": ButtonsController.getLastSeasonNumber(r)}, function(data) {
					console.log(data)
					ButtonsController.getLastAiredEpisodeInSeason(r, JSON.parse(data), k)
				}, function(){
				});
			}, function(){
			});
		});


		deletetvs.addEventListener('click', function () {
			chrome.storage.sync.remove(k.tvsId, function() {});
			window.location.href = "/Popup/popup.html";
		});
	}

	return {
		renderOptionsMenu: renderOptionsMenu
	}
})();

var ButtonsController = (function () {

	function getLastSeasonNumber (tv) {
		console.log(tv.seasons[tv.seasons.length-1].season_number);
		return tv.seasons[tv.seasons.length-1].season_number;
	}

	function getLastAiredEpisodeInSeason (tv, s, k) {
		if (k.leftToSee) {
			for (var i = 0; i < s.episodes.length; i++) {
				var date = new Date();
				var airDate = Date.parse(s.episodes[i].air_date);
				if (date < airDate || i == s.episodes.length-1) {
					console.log(s.season_number, tv.seasons.length)
					k.episodeNumber = s.episodes[i].episode_number;
					k.seasonNumber =  s.season_number;
					k.episodeName = s.episodes[i].name;
					k.seasEpisodes = s.episodes.length;
					k.leftToSee = null;
					k.seasFinished = i == s.episodes.length-1 && i != 0 ? true : false;
					k.tvsFinished = k.seasFinished && k.tvsStatus == 'Ended' ? true : false;
					k.episodeAirdate = k.tvsStatus != 'Ended' && !k.seasFinished ? s.episodes[i].air_date : null;
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
		k.episodeAirdate = k.leftToSee == 0 ? r.episodes[0].air_date : null;
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
