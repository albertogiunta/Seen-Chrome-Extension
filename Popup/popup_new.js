/* ---------------------------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function(e) {
	
	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */	
	var DomController = (function() {
		_setGeneralListeners();

		function renderTvs () {
			// dom caching
			var main = document.getElementById('main');
			_resetPage(main);

			chrome.storage.sync.get(null, function(items) {
				var keys = Object.keys(items);
				for (var i = 0; i < keys.length; i++) {
					var k = JSON.parse(items[keys[i]]);

					var navBtns = _htmlNavigationBtns();
					var mainText = _htmlMainTexts(k);
					var linkBtns = _htmlLinkBtns();

					_toggleBtns(navBtns, mainText, linkBtns, k);

					_htmlAppendElements(main, navBtns, mainText, linkBtns);

				}
				_setTvsListeners(main);
				document.body.scrollTop = ScrollController.getScroll();
			});
		}

		function _resetPage (main) {
			while (main.firstChild) {
				main.removeChild(main.firstChild);
			}
		}

		function _htmlNavigationBtns () {
			var backbtn = document.createElement('button'); 
			backbtn.setAttribute('class', 'btn decr-btn custom-btn');
			backbtn.appendChild(SvgController.getSvgElement(SvgController.getArrowLeft()));

			var nextbtn = document.createElement('button'); 
			nextbtn.setAttribute('class', 'btn incr-btn custom-btn');
			nextbtn.appendChild(SvgController.getSvgElement(SvgController.getArrowRight()));

			function getBackBtn () {
				return backbtn;
			}

			function getNextBtn () {
				return nextbtn;
			}

			return {
				backbtn: getBackBtn,
				nextbtn: getNextBtn
			}
		}

		function _htmlMainTexts (k) {
			var container = document.createElement('div');
			container.setAttribute('class', 'flex mb1');
			container.setAttribute('data-tvs', k.tvsId);

			var maindiv = document.createElement('div');
			maindiv.setAttribute('class', 'overflow-scroll flex-auto overflow-hidden p0');
			
			var pTvsName = document.createElement('p');
			if (k.tvsName.length >= 17 ) {
				pTvsName.setAttribute('class', 'center h3 pb0.4 m0 maintitle');
			} else {
				pTvsName.setAttribute('class', 'center h3 pb0.4 m0 maintitle divider');
			}
			pTvsName.innerHTML = k.tvsName;

			var pNextToSee = document.createElement('p');
			pNextToSee.setAttribute('class', 'center h5 m0');
			if (k.seasFinished) {
				if (k.tvsStatus == "Ended" && k.tvsFinished) {
					pNextToSee.innerHTML = 'No more episodes for this tv series'
				} else {
					pNextToSee.innerHTML = 'Waiting for more episodes being aired'
				}
			} else {
				episodeNumber = (k.episodeNumber < 10 ? '0' : '') + k.episodeNumber;
				seasonNumber = (k.seasonNumber < 10 ? '0' : '') + k.seasonNumber;
				pNextToSee.innerHTML = 'Next to see: <b>' + 'E' + episodeNumber + 'x' + 'S' + seasonNumber + '</b> / <i>' + k.episodeName + '</i>';
			}

			episodeAirdate = k.episodeAirdate == null ? ' ' : k.episodeAirdate;
			leftToSee = k.leftToSee == null ? ' ' : k.leftToSee;

			var pleftToSee = document.createElement('p');
			pleftToSee.setAttribute('class', 'center h6 m0');
			if (k.seasFinished) {
				pleftToSee.innerHTML = '';
			} else if (leftToSee != ' ') {
				pleftToSee.innerHTML = '(<b>' + leftToSee + '</b> ep. left to see in this season)';
			} else if (!k.tvsFinished) {
				pleftToSee.innerHTML = '(Next ep air date is: <b>' + episodeAirdate + '</b>)';
			} else {
				pleftToSee.innerHTML = '';
			}

			function getContainer () {
				return container;
			}

			function getMainDiv () {
				return maindiv;
			}

			function getTvsName () {
				return pTvsName;
			}

			function getNextToSee () {
				return pNextToSee;
			}

			function getLeftToSee () {
				return pleftToSee;
			}

			return {
				container: getContainer,
				maindiv: getMainDiv,
				pTvsName: getTvsName,
				pNextToSee: getNextToSee,
				pleftToSee: getLeftToSee 
			}
		}

		function _htmlLinkBtns() {
			var plinks = document.createElement('p');
			plinks.setAttribute('class', 'center pb0 mb1 h6 link-btn-container');

			var subtitles = document.createElement('a');
			subtitles.setAttribute('class', 'btn button-narrow link-btn');
			subtitles.innerHTML = 'Subtitles';

			var torrent = document.createElement('a');
			torrent.setAttribute('class', 'btn button-narrow link-btn');
			torrent.innerHTML = 'Torrent';

			var streaming = document.createElement('a');
			streaming.setAttribute('class', 'btn button-narrow link-btn');
			streaming.innerHTML = 'Streaming';

			var options = SvgController.getSvgElement(SvgController.getTools());

			function getLinks () {
				return plinks;
			}

			function getSubtitles () {
				return subtitles;
			}

			function getTorrent () {
				return torrent;
			}

			function getStreaming () {
				return streaming;
			}

			function getOptions () {
				return options;
			}

			return {
				plinks: getLinks,
				subtitles: getSubtitles,
				torrent: getTorrent,
				streaming: getStreaming,
				options: getOptions
			}
		}

		function _htmlAppendElements (main, navBtns, mainText, linkBtns) {
			main.appendChild(mainText.container());
				mainText.container().appendChild(navBtns.backbtn());
				mainText.container().appendChild(mainText.maindiv());
					mainText.maindiv().appendChild(mainText.pTvsName());
					mainText.maindiv().appendChild(mainText.pNextToSee());
					mainText.maindiv().appendChild(mainText.pleftToSee());
					mainText.maindiv().appendChild(linkBtns.plinks());
						linkBtns.plinks().appendChild(linkBtns.subtitles());
						linkBtns.plinks().appendChild(document.createTextNode('/'));
						linkBtns.plinks().appendChild(linkBtns.torrent());
						linkBtns.plinks().appendChild(document.createTextNode('/'));
						linkBtns.plinks().appendChild(linkBtns.streaming());
						linkBtns.plinks().appendChild(document.createTextNode('/'));
						linkBtns.plinks().appendChild(linkBtns.options());
				mainText.container().appendChild(navBtns.nextbtn());
		}

		function _toggleBtns (navBtns, mainText, linkBtns, k) {
				var escTvsName = k.tvsName.replace(/\s+/g, '+').toLowerCase();

				_setLink(escTvsName, k.subtitles, linkBtns.subtitles());
				_setLink(escTvsName, k.torrent, linkBtns.torrent());
				_setLink(escTvsName, k.streaming, linkBtns.streaming());

				function _setLink(escTvsName, link, element) {
					reg = new RegExp(/((\(S\))|(\(E\))|(\(N\)))/);
					linkStr = link;
					if (reg.test(link)) {
						linkStr = linkStr.replace(/(\(S\))/, k.seasonNumber);
						linkStr = linkStr.replace(/(\(E\))/, k.episodeNumber);
						linkStr = linkStr.replace(/(\(N\))/, escTvsName);
					}

					if (linkStr) {
						element.setAttribute('href', linkStr);
					} else {
						// element.setAttribute('href', '#');
					}
				}
			if (k.episodeAirdate == null) {
				// navBtns.nextbtn.setAttribute('href', '#');

			} else if (k.episodeNumber == 1 && k.seasonNumber == 1) {
				navBtns.backbtn().setAttribute('data-disabled', true);
			} else {
				navBtns.nextbtn().setAttribute('data-disabled', true);
				// linkBtns.subtitles().setAttribute('data-disabled', true);
				// linkBtns.torrent().setAttribute('data-disabled', true);
				// linkBtns.streaming().setAttribute('data-disabled', true);
			}
		}

		/* ---------------------------------------------------------------------------------------------- */
		function _setGeneralListeners() {
			// if + btn is clicked, the page is redirected to the search html page
			document.getElementById('add-btn').addEventListener('click', function() {
				window.location.href = "/Result/result.html";
			});
		}

		function _setTvsListeners (main) {
			var incrBtns = document.getElementsByClassName('incr-btn');
			var decrBtns = document.getElementsByClassName('decr-btn');
			var linkBtns = document.getElementsByClassName('link-btn');
			var opts = document.getElementsByClassName('mini-tool');
			var j = -1;
			for (var i = 0; i < incrBtns.length; i++) {
				if (!incrBtns[i].getAttribute('data-disabled')) {
					incrBtns[i].addEventListener('click', _changeListener);

					linkBtns[++j].addEventListener('click', _linkListener);
					linkBtns[++j].addEventListener('click', _linkListener);
					linkBtns[++j].addEventListener('click', _linkListener);
					linkBtns[++j].addEventListener('click', _linkListener);
				}

				if (!decrBtns[i].getAttribute('data-disabled')) {
					decrBtns[i].addEventListener('click', _changeListener);
				}
				
				opts[i].addEventListener('click', function() {
					ScrollController.setScroll();
					var main = this.parentNode.parentNode.parentNode;
					OptionsController.viewOptionsMenu(main);
				});
			}
		}

		function _linkListener () {
			if (this.href) {
				ScrollController.setScroll();
				chrome.tabs.create({active: true, url: this.href});
			}
		}

		function _changeListener () {
			ScrollController.setScroll();
			var id = this.parentNode.getAttribute('data-tvs');
			var isIncrement = this.className.split(" ").indexOf('incr-btn') >= 1 ? true : false;
			var selectedTvsLi = this.parentNode;
			chrome.storage.sync.get(id, function(obj) {
				var k = JSON.parse(obj[id]);
				theMovieDb.tv.getById({"id":k.tvsId}, function(data) {
														TvsController.changeEpisode(isIncrement, JSON.parse(data), k);
													}, function(data) {
													});
			});
		}

		return {
			renderTvs: renderTvs
		}
	})();


	/* ---------------------------------------------------------------------------------------------- */
	/* ---------------------------------------------------------------------------------------------- */
	var TvsController = (function() {

		checkForNewEpisodes()

		/* ---------------------------------------------------------------------------------------------- */
		function checkForNewEpisodes() {
			chrome.storage.sync.get(null, function(itemsSet) {
				keySet = Object.keys(itemsSet);
				fetchUpdates(0, keySet, itemsSet);
			});
		}

		function fetchUpdates(recordNumber, keySet, itemsSet) {
			// base case - if all records have been checked
			if (recordNumber == keySet.length) {
				DomController.renderTvs();
				return;
			}

			k = JSON.parse(itemsSet[keySet[recordNumber]]);
			if (k.tvsStatus != 'Ended') {
				if (!k.seasFinished || !k.tvsFinished) {
					theMovieDb.tvSeasons.getById({"id": k.tvsId, "season_number": k.seasonNumber}, 
						function(data) {
							_checkTvs(JSON.parse(data), recordNumber, keySet, itemsSet, k);
						}, function() {
					});
				} else {
					theMovieDb.tv.getById({"id": k.tvsId}, function(data) {
						r = JSON.parse(data);
						if (k.seasonNumber + 1 <= r.seasons.length) {
							theMovieDb.tvSeasons.getById({"id": k.tvsId, "season_number": k.seasonNumber+1}, 
								function(data) {
									ButtonsController.getFirstEpisodeOfSeason(JSON.parse(data), k, true);
									fetchUpdates(recordNumber + 1, keySet, itemsSet);
								}, function() {
							});
						} else {
							fetchUpdates(recordNumber + 1, keySet, itemsSet);
						}
					}, function () {})
				}
			} else {
				fetchUpdates(recordNumber + 1, keySet, itemsSet);
			}
		}

		function _checkTvs (r, recordNumber, keySet, itemsSet, k) {
			var date = new Date();
			
			// check how many new episodes are there
			k.leftToSee = 0;
			for (var i = k.episodeNumber-1; i < r.episodes.length; i++) {
				var airDate = Date.parse(r.episodes[i].air_date);
				if (airDate < date) {
					k.leftToSee++;
				}
			}

			if (k.leftToSee > 1) {
				k.episodeAirdate = null;
				k.tvsFinished = false;
				k.seasFinished = false;
				StorageController.setStorage(k, function() {
						TvsController.fetchUpdates(recordNumber + 1, keySet, itemsSet);
				});
			} else {
				fetchUpdates(recordNumber + 1, keySet, itemsSet);
			}
		}

		/* ---------------------------------------------------------------------------------------------- */
		function changeEpisode (isIncrement, rTvs, k) {
			var rSeas = new Array();
			for (var i = 0; i < rTvs.seasons.length; i++) {
				if (rTvs.seasons[i].season_number == k.seasonNumber) {
					rSeas = rTvs.seasons[i];
					break;
				}
			}

			var newK = k;

			newK.tvsStatus = rTvs.status;
			_updateEpisode(isIncrement, newK, rSeas, rTvs);

			if (!newK.tvsFinished) {
				theMovieDb.tvSeasons.getById({"id": newK.tvsId, "season_number": newK.seasonNumber}, function (data) {
																							_successSeasonCB(newK, JSON.parse(data))
																						}, function(data) {
																						});
			} else {
				StorageController.setStorage(newK, function() {
					window.location.href="/Popup/popup.html";
				});
			}
		}

		function _updateEpisode (isIncrement, k, rSeas, rTvs) {
			k.tvsFinished = false;
			k.seasFinished = false;
			if (isIncrement) {
				if (k.episodeNumber + 1 <= rSeas.episode_count) {
					// same season / next ep
					k.episodeNumber++;
				} else if (k.episodeNumber + 1 > rSeas.episode_count && k.seasonNumber + 1 <= rTvs.number_of_seasons) {
					// next season / first ep
					k.episodeNumber = 1;
					k.seasonNumber++;
				} else {
					// user got to the end of the tvs
					k.leftToSee = null;
					k.seasFinished = true;
					k.tvsFinished = true;
				}
			} else {
				if (k.episodeNumber - 1 > 0) {
					// same season / previous ep
					k.episodeNumber--;
				} else if (k.episodeNumber - 1 == 0 && k.seasonNumber - 1 > 0) {
					// previous season / last ep
					k.episodeNumber = 'last';
					k.seasonNumber--;
				} else {
				}
			}
		}		


		function _successSeasonCB(k, r) {
			k.episodeNumber = k.episodeNumber == 'last' || (k.tvsFinished && k.leftToSee == null) ? r.episodes.length : k.episodeNumber;
			rEpisode = r.episodes[k.episodeNumber-1];

			k.episodeName = rEpisode.name;
			k.seasEpisodes = r.episodes.length;
			k.leftToSee = null;
			k.episodeAirdate = null;
			k.seasFinished = false;
			
			var airDate = Date.parse(rEpisode.air_date);
			var date = new Date();
		
			if (airDate > date) {
				k.episodeAirdate = rEpisode.air_date;
			} else {
				for (var i = k.episodeNumber-1; i < k.seasEpisodes; i++) {
					var airDate = Date.parse(r.episodes[i].air_date);
					if (airDate < date) {
						k.leftToSee++;
					}
				}
			}

			StorageController.setStorage(k, function() {
				window.location.href="/Popup/popup.html";
			});
		}

		return {
			changeEpisode: changeEpisode,
			fetchUpdates: fetchUpdates
		}
	})();
});