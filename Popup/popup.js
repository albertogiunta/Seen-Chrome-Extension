/* ---------------------------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function(e) {

    /* ---------------------------------------------------------------------------------------------- */
    /* This method sets the header's links and listeners. */
    /* ---------------------------------------------------------------------------------------------- */
    var onStart = (function setLinks() {
        _getElements();

        // Get header's links elements
        function _getElements() {
            document.getElementById('author').addEventListener('click', _createTabForLink);
            document.getElementById('review').addEventListener('click', _createTabForLink);
            document.getElementById('store').addEventListener('click', _createTabForLink);
            document.getElementById('donation').addEventListener('click', _createTabForLink);
        }

        // Open tab on click
        function _createTabForLink() {
            if (this.href) {
                chrome.tabs.create({
                    active: true,
                    url: this.href
                });
            }
        }
    })();

    /* ---------------------------------------------------------------------------------------------- */
    /* VIEW / Creates the GUI for a Tv Series, including buttons and text */
    /* ---------------------------------------------------------------------------------------------- */
    var DomController = (function() {
        // _setGeneralListeners();

        /*
        * Iterates every tv series currently stored and for each instatiates the graphics
        */
        function renderTvs() {

            // dom caching
            var main = document.getElementById('main');
            _resetPage(main);

            // Iterates the tv series currently stored (not archived)
            chrome.storage.sync.get(null, function(items) {
                var keys = Object.keys(items);
                var tvs = SortController.sort(items, keys, 'sortingMainpage')
                for (var i = 0; i < keys.length; i++) {
                    var k = tvs[i];
                    console.log(k.episodeAirdate)

                    var navBtns = _htmlNavigationBtns();
                    var mainText = _htmlMainTexts(k);
                    var linkBtns = _htmlLinkBtns(k);

                    _toggleBtns(navBtns, mainText, linkBtns, k);

                    _htmlAppendElements(main, navBtns, mainText, linkBtns, k);

                }

                _setTvsListeners(main);
                document.body.scrollTop = ScrollController.getScroll();
            });
        }

        /*
        * Clean everything on page - probably not the most efficient thing to do
        */
        function _resetPage(main) {
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
        }

        /*
        * Creates nodes for navigations buttons <, >, <<, >>
        */
        function _htmlNavigationBtns() {
            var backbtn = SvgController.getSvgElement(SvgController.getArrowLeft());
            var nextbtn = SvgController.getSvgElement(SvgController.getArrowRight());
            var doublebackbtn = SvgController.getSvgElement(SvgController.getDoubleArrowLeft());
            var doublenextbtn = SvgController.getSvgElement(SvgController.getDoubleArrowRight());
            var spacekeeper = document.createElement('td');
            spacekeeper.setAttribute('class', 'spacekeeper');

            var aside = document.createElement('aside');
            aside.setAttribute('style', 'width: 4rem');
            
            aside.appendChild(_getTable(backbtn, spacekeeper, nextbtn));
            aside.appendChild(_getTable(doublebackbtn, spacekeeper, doublenextbtn));
            
            /*
            * Creates the table with all the navigation buttons inside of it
            */
            function _getTable(back, space, next) {
                var table = document.createElement('table');
                var tbody = document.createElement('tbody');
                var tr = document.createElement('tr');

                table.appendChild(tbody);
                tbody.appendChild(tr);
                tr.appendChild(back);
                tr.appendChild(space);
                tr.appendChild(next);

                return table;
            }

            return {
                btns: aside,
                backbtn: backbtn,
                nextbtn: nextbtn
            }
        }

        /*
        * Creates nodes for all the text regardin a tv series
        */
        function _htmlMainTexts(k) {

            // <main class="flex-auto">
            var main = document.createElement('main');
            main.setAttribute('class', 'flex-auto');

            // options icon
            var options = SvgController.getSvgElement(SvgController.getOptions());

            // <p class="bold h3 mb0 maintitle">American Horror Story</p>
            var pTvsName = document.createElement('p');
            pTvsName.setAttribute('class', 'bold h3 mb0 maintitle ');
            // TODO shorten name with ... if longer than n chars
            pTvsName.innerHTML = k.tvsName;

            // <p class="left-align h5 m0"><b>S01xE02</b> / <i>Home Invasion</i></p>
            var pNextToSee = document.createElement('p');
            pNextToSee.setAttribute('class', 'left-align h5 m0');
            if (k.seasFinished) {
                if (k.tvsStatus == "Ended" && k.tvsFinished) {
                    pNextToSee.innerHTML = 'Not in production anymore'
                } else {
                    pNextToSee.innerHTML = 'The season has ended or we don\'t have enough data regarding the next episode.';
                }
            } else {
                episodeNumber = (k.episodeNumber < 10 ? '0' : '') + k.episodeNumber;
                seasonNumber = (k.seasonNumber < 10 ? '0' : '') + k.seasonNumber;
                var episodeName = k.episodeName != '' ? ' / <i>' + k.episodeName + '</i>' : '';
                pNextToSee.innerHTML = '<b>' + 'S' + seasonNumber + 'x' + 'E' + episodeNumber + '</b>' + episodeName;
            }

            if (k.leftToSee == null) {
                var nextEpisodeAirdate = DateController.getConvertedDate(k.episodeAirdate);
            }

            // <p class="left-align h6 m0 leftToSee-container">Aired &gt; 1 month ago / Episodes left: <b>11</b></p>
            var pLeftToSee = document.createElement('p');
            pLeftToSee.setAttribute('class', 'left-align h6 m0 leftToSee-container');
            var timeSinceAiring = DateController.getDaysDifference(k.episodeAirdate);
            if (k.seasFinished) {
                pLeftToSee.innerHTML = '';
            } else if (k.leftToSee != null) {
                pLeftToSee.innerHTML = 'Aired ' + timeSinceAiring + ' / Episodes left: <b>' + k.leftToSee + '</b>';
            } else if (!k.tvsFinished) {
                pLeftToSee.innerHTML = 'TBA: <b>' + nextEpisodeAirdate + '</b> ( ' + timeSinceAiring + ')';
            } else {
                pLeftToSee.innerHTML = '';
            }

            main.appendChild(options);
            main.appendChild(pTvsName);
            main.appendChild(pNextToSee);
            main.appendChild(pLeftToSee);

            return {
                text: main
            }
        }

        /*
        * Creates nodes for the torrent, subs and streaming links and the options button.
        */
        function _htmlLinkBtns() {
            // TODO make label with complete name appearing on hover

            var divLinks = document.createElement('div');
            divLinks.setAttribute('class', 'flex-first sm-col-0 mr2 mt1 navy');
            var classAttributes = 'btn block p0 m0 h5 link link-btn';
            var subtitles = document.createElement('a');
            subtitles.setAttribute('class', classAttributes);
            subtitles.innerHTML = 'SUB';

            var torrent = document.createElement('a');
            torrent.setAttribute('class', classAttributes);
            torrent.innerHTML = 'TOR';

            var streaming = document.createElement('a');
            streaming.setAttribute('class', classAttributes);
            streaming.innerHTML = 'STR';

            divLinks.appendChild(torrent);
            divLinks.appendChild(subtitles);
            divLinks.appendChild(streaming);

            return {
                links: divLinks,
                torrent: torrent,
                streaming: streaming,
                subtitles: subtitles
            }
        }

        /*
        * Puts everything together. What comes out is the whole tv series line
        */
        function _htmlAppendElements(main, navBtns, mainText, linkBtns, k) {
          
            // <div class="flex mt3 " data-tvs="1413">
            var container = document.createElement('div');
            container.setAttribute('class', 'flex tvscontainer');
            container.setAttribute('data-tvs', k.tvsId);

            container.appendChild(mainText.text);
            container.appendChild(linkBtns.links);
            container.appendChild(navBtns.btns)

            main.appendChild(container);
        }

        /*
        + It parses the data to get each link, toggles each button and link to be active or incactive.
        */
        function _toggleBtns(navBtns, mainText, linkBtns, k) {

            _setLink(k.subtitles, linkBtns.subtitles);
            _setLink(k.torrent, linkBtns.torrent);
            _setLink(k.streaming, linkBtns.streaming);

            /*
            * Creates the custom "smart" link for each category of link and each tv series
            */
            function _setLink(link, element) {
                var reg = new RegExp(/((\(S\))|(\(E\))|(\(N[$&+,:;=?@#|'<>.^*%!-]?\)))/);
                var escape = new RegExp(/(\(N[$&+,:;=?@#|'<>.^*%!-]?\))/);
                var forcedEscape = new RegExp(/(\(N[$&+,:;=?@#|'<>.^*%!-]\))/);
                var alternativeEscape = '+';
                linkStr = link;
                if (reg.test(link)) {
                    var encodedStringObj = escape.exec(linkStr);
                    if (encodedStringObj[1].length > 3 && forcedEscape.test(encodedStringObj[1])) {
                        var symbol = encodedStringObj[1].slice(2, 3);
                    } else {
                        var symbol = alternativeEscape;
                    }
                    var escapedTvName = k.tvsName.replace(/\s+/g, symbol).toLowerCase();

                    linkStr = linkStr.replace(escape, escapedTvName);
                    linkStr = linkStr.replace(/(\(S\))/, k.seasonNumber);
                    linkStr = linkStr.replace(/(\(E\))/, k.episodeNumber);
                }

                if (linkStr) {
                    element.setAttribute('href', linkStr);
                } else {
                    element.className += ' inactive-link';
                }
            }

            // TODO check what's going on here
            if (k.leftToSee != null) {
                if (k.episodeNumber == 1 && k.seasonNumber == 1) {
                    navBtns.backbtn.setAttribute('data-disabled', true);
                }
            } else if (k.episodeNumber == 1 && k.seasonNumber == 1) {
                navBtns.backbtn.setAttribute('data-disabled', true);
            } else {
                navBtns.nextbtn.setAttribute('data-disabled', true);
                // linkBtns.subtitles().setAttribute('data-disabled', true);
                // linkBtns.torrent().setAttribute('data-disabled', true);
                // linkBtns.streaming().setAttribute('data-disabled', true);
            }
        }

        /* ---------------------------------------------------------------------------------------------- */
        
        /*
        * Sets the listeners for the ADD NEW / ARCHIVED / OPTIONS buttons
        */
        function _setGeneralListeners() {
            // if + btn is clicked, the page is redirected to the search html page
            document.getElementById('add-btn').addEventListener('click', function() {
                window.location.href = "/Result/result.html";
            });
        }

        /*
        * Sets the listeners regarding each tv series, such as the option and navigation buttons
        */
        function _setTvsListeners(main) {
            var incrBtns = document.getElementsByClassName('incr-btn');
            var doubleIncrBtns = document.getElementsByClassName('double-incr-btn');
            var decrBtns = document.getElementsByClassName('decr-btn');
            var doubleDecrBtns = document.getElementsByClassName('double-decr-btn');
            var linkBtns = document.getElementsByClassName('link-btn');
            var opts = document.getElementsByClassName('options');
            var len = incrBtns.length;
            var j = 0;

            for (var i = 0; i < len; i++) {
                if (!incrBtns[i].getAttribute('data-disabled')) {
                    if (linkBtns[j+1] != undefined) {
                        linkBtns[j].addEventListener('click', _linkListener);
                        linkBtns[j+1].addEventListener('click', _linkListener);
                        linkBtns[j+2].addEventListener('click', _linkListener);
                    }

                    incrBtns[i].addEventListener('click', _changeListener);
                    doubleIncrBtns[i].addEventListener('click', _changeListener);
                }
                j += 3


                if (!decrBtns[i].getAttribute('data-disabled')) {
                    decrBtns[i].addEventListener('click', _changeListener);
                    doubleDecrBtns[i].addEventListener('click', _changeListener);
                }

                opts[i].addEventListener('click', function() {
                    ScrollController.setScroll();
                    var main = this.parentNode.parentNode;
                    OptionsController.viewOptionsMenu(main);
                });
            }
        }

        // TODO find a way to put it in utilityfunction together with the one you use way above
        function _linkListener() {
            if (this.href) {
                ScrollController.setScroll();
                chrome.tabs.create({
                    active: true,
                    url: this.href
                });
            }
        }

        /*
        * Get data to decide wether to increment or decrement the episode
        */
        function _changeListener() {
            ScrollController.setScroll();

            var id = this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-tvs');
            var isIncrement = this.className.indexOf('incr-btn') > -1 ? true : false;
            var isDouble = this.className.indexOf('double') > -1 ? true : false;
            chrome.storage.sync.get(id, function(obj) {
                var k = JSON.parse(obj[id]);
                theMovieDb.tv.getById({
                    "id": k.tvsId
                }, function(data) {
                    TvsController.changeEpisode(isIncrement, isDouble, JSON.parse(data), k);
                }, function(data) {});
            });
        }

        return {
            renderTvs: renderTvs
        }
    })();

    /* ---------------------------------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------------------------------- */
    var TvsController = (function() {

        // _firstThingsOnExtensionUpdate();

        function _firstThingsOnExtensionUpdate () {
            if (chrome.app.getDetails().version != '2.0.0') {
                // chrome.storage.sync.get(null, function(itemsSet) {
                //     keys = Object.keys(itemsSet);
                //     chrome.storage.sync.clear();
                //     var jsonfile = {};
                //     for (var i = 0; i < keys.length; i++) {
                //         var selectedValues = itemsSet[keys[i]];
                //         jsonfile[i] = selectedValues;
                //     }
                //     chrome.storage.sync.set(jsonfile, function() {});
                // });
            }
        }

        checkForNewEpisodes()

        /* ---------------------------------------------------------------------------------------------- */
        function checkForNewEpisodes() {
            chrome.storage.sync.get(null, function(itemsSet) {
                keySet = Object.keys(itemsSet);
                if (keySet.length == 0) {
                    // <div id="" class="flex m0">
                    //     <a id="hidden-div" class="flex-auto center btn block p0 h3 link" href="/Result/result.html"></p>
                    // </div>
                    var div = document.createElement('div');
                    div.setAttribute('class', 'flex m0');
                    var link = document.createElement('a');
                    link.setAttribute('class', 'hidden-div flex-auto center block btn p0 h3 link');
                    link.setAttribute('href', '/Result/result.html');
                    link.innerHTML = "START HERE!"
                    div.appendChild(link);

                    var body = document.body;
                    body.insertBefore(div, body.childNodes[4]);
                } else {
                    fetchUpdates(0, keySet, itemsSet);
                }
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
                    theMovieDb.tvSeasons.getById({
                            "id": k.tvsId,
                            "season_number": k.seasonNumber
                        },
                        function(data) {
                            _checkTvs(JSON.parse(data), recordNumber, keySet, itemsSet, k);
                        },
                        function() {});
                } else {
                    theMovieDb.tv.getById({
                        "id": k.tvsId
                    }, function(data) {
                        r = JSON.parse(data);
                        if (k.seasonNumber + 1 <= r.seasons[r.seasons.length - 1].season_number) {
                            theMovieDb.tvSeasons.getById({
                                    "id": k.tvsId,
                                    "season_number": k.seasonNumber + 1
                                },
                                function(data) {
                                    ButtonsController.getFirstEpisodeOfSeason(JSON.parse(data), k, true);
                                    fetchUpdates(recordNumber + 1, keySet, itemsSet);
                                },
                                function() {});
                        } else {
                            fetchUpdates(recordNumber + 1, keySet, itemsSet);
                        }
                    }, function() {})
                }
            } else {
                fetchUpdates(recordNumber + 1, keySet, itemsSet);
            }
        }

        function _checkTvs(r, recordNumber, keySet, itemsSet, k) {
            var date = new Date();

            // check how many new episodes are there
            k.leftToSee = null;
            for (var i = k.episodeNumber - 1; i < r.episodes.length; i++) {
                var airDate = Date.parse(r.episodes[i].air_date);
                if (airDate < date) {
                    k.leftToSee++;
                }
            }

            if (k.leftToSee == null || k.leftToSee > 0) {
                console.log(k.leftToSee)
                k.episodeAirdate = r.episodes[k.episodeNumber - 1].air_date;
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
        function changeEpisode(isIncrement, isDouble, rTvs, k) {

            if (isDouble) {
                if (isIncrement) {
                    theMovieDb.tv.getById({"id":k.tvsId}, function(data){
                        var tv = JSON.parse(data);
                        k.tvsStatus = tv.status;
                        if (k.seasonNumber+1 <= tv.seasons[tv.seasons.length-1].season_number) {
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
                } else {
                    theMovieDb.tv.getById({"id":k.tvsId}, function(data){
                        var tv = JSON.parse(data);
                        k.tvsStatus = tv.status;
                        if (k.seasonNumber-1 > 0) {
                            theMovieDb.tvSeasons.getById({"id": k.tvsId, "season_number": (k.seasonNumber-1)}, function(data) {
                                ButtonsController.getFirstEpisodeOfSeason(JSON.parse(data), k, false);
                            }, function() {
                            });
                        } else {
                            theMovieDb.tvSeasons.getById({"id": k.tvsId, "season_number": k.seasonNumber}, function (data) {
                                ButtonsController.getFirstEpisodeOfSeason(JSON.parse(data), k, false)
                            }, function(){
                            });
                        }
                    }, function(){
                    });
                }
            } else {
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
                    theMovieDb.tvSeasons.getById({
                        "id": newK.tvsId,
                        "season_number": newK.seasonNumber
                    }, function(data) {
                        _successSeasonCB(newK, JSON.parse(data))
                    }, function(data) {});
                } else {
                    StorageController.setStorage(newK, function() {
                        window.location.href = "/Popup/popup.html";
                    });
                }
            }
        }

        function _updateEpisode(isIncrement, k, rSeas, rTvs) {
            var wasLast = k.tvsFinished && k.seasFinished ? true : false;
            k.tvsFinished = false;
            k.seasFinished = false;
            if (isIncrement) {
                if (k.episodeNumber + 1 <= rSeas.episode_count) {
                    // same season / next ep
                    k.episodeNumber++;
                } else if (k.episodeNumber + 1 > rSeas.episode_count && k.seasonNumber + 1 <= rTvs.seasons[rTvs.seasons.length - 1].season_number) {
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
                if (wasLast) {
                    k.seasFinished = false;
                    k.tvsFinished = false;
                    k.leftToSee = 1;
                } else if (k.episodeNumber - 1 > 0) {
                    // same season / previous ep
                    k.episodeNumber--;
                } else if (k.episodeNumber - 1 == 0 && k.seasonNumber - 1 > 0) {
                    // previous season / last ep
                    k.episodeNumber = 'last';
                    k.seasonNumber--;
                }
            }
        }

        function _successSeasonCB(k, r) {
            k.episodeNumber = k.episodeNumber == 'last' || (k.tvsFinished && k.leftToSee == null) ? r.episodes.length : k.episodeNumber;
            rEpisode = r.episodes[k.episodeNumber - 1];

            k.episodeName = rEpisode.name;
            k.seasEpisodes = r.episodes.length;
            k.leftToSee = null;
            k.episodeAirdate = rEpisode.air_date;
            k.seasFinished = false;

            var airDate = Date.parse(rEpisode.air_date);
            var date = new Date();

            if (airDate < date) {
                for (var i = k.episodeNumber - 1; i < k.seasEpisodes; i++) {
                    var airDate = Date.parse(r.episodes[i].air_date);
                    if (airDate < date) {
                        k.leftToSee++;
                    }
                }
            }

            StorageController.setStorage(k, function() {
                window.location.href = "/Popup/popup.html";
            });
        }

        return {
            changeEpisode: changeEpisode,
            fetchUpdates: fetchUpdates
        }
    })();
});