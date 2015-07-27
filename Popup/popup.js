document.addEventListener('DOMContentLoaded', function(e) {
// arrowLeft = "M16.293,16.734C16.104,16.545,16,16.294,16,16.027c0-0.268,0.104-0.518,0.291-0.705l8.536-8.494 C25.583,6.073,26,5.068,26,4s-0.416-2.072-1.172-2.828C24.073,0.416,23.069,0,22,0c-1.068,0-2.072,0.416-2.816,1.16L7.465,12.492 C6.521,13.436,6,14.691,6,16.027s0.521,2.592,1.479,3.551l10.084,9.671l1.606,1.606c0.756,0.756,1.761,1.172,2.829,1.172 s2.073-0.416,2.828-1.171C25.583,30.101,26,29.096,26,28.028c0-1.068-0.416-2.073-1.175-2.832L16.293,16.734z M23.414,29.441 c-0.756,0.756-2.073,0.756-2.829,0L8.879,18.148C8.313,17.582,8,16.828,8,16.027c0-0.802,0.312-1.555,0.867-2.109L20.585,2.586 C20.963,2.208,21.465,2,22,2s1.036,0.208,1.414,0.586S24,3.466,24,4s-0.208,1.036-0.584,1.412l-8.536,8.494 C14.313,14.473,14,15.226,14,16.027c0,0.801,0.312,1.555,0.882,2.124l8.531,8.462C23.792,26.991,24,27.494,24,28.028 C24,28.562,23.792,29.063,23.414,29.441z";
// arrowRight  = "M24.535,12.492L12.817,1.16C12.073,0.416,11.069,0,10,0C8.931,0,7.927,0.416,7.172,1.172 C6.417,1.928,6,2.932,6,4s0.416,2.073,1.172,2.828l8.536,8.494C15.896,15.51,16,15.76,16,16.027c0,0.267-0.104,0.518-0.293,0.707 l-8.531,8.462C6.417,25.955,6,26.96,6,28.028c0,1.067,0.416,2.072,1.172,2.828c0.755,0.755,1.76,1.171,2.828,1.171 s2.073-0.416,2.829-1.172l1.606-1.606l10.084-9.671C25.479,18.619,26,17.363,26,16.027S25.479,13.436,24.535,12.492z M23.121,18.148L11.416,29.441c-0.756,0.756-2.073,0.756-2.829,0C8.208,29.063,8,28.562,8,28.028c0-0.534,0.208-1.037,0.586-1.415 l8.531-8.462C17.687,17.582,18,16.828,18,16.027c0-0.802-0.312-1.555-0.879-2.121L8.584,5.412C8.208,5.036,8,4.534,8,4 s0.208-1.036,0.586-1.414S9.466,2,10,2s1.036,0.208,1.414,0.586l11.718,11.332C23.687,14.473,24,15.226,24,16.027 C24,16.828,23.687,17.582,23.121,18.148z";
// tools = "M16,7.322c-4.784,0-8.677,3.893-8.677,8.678c0,4.784,3.893,8.677,8.677,8.677s8.677-3.893,8.677-8.677 C24.676,11.215,20.784,7.322,16,7.322z M16,22.677c-3.682,0-6.677-2.995-6.677-6.677S12.318,9.322,16,9.322 s6.677,2.996,6.677,6.678S19.681,22.677,16,22.677z M31.117,18.829c-1.428-0.185-2.505-1.4-2.505-2.829s1.077-2.646,2.505-2.829 c0.284-0.037,0.538-0.193,0.699-0.43c0.161-0.237,0.213-0.531,0.142-0.809c-0.388-1.527-0.992-2.987-1.798-4.341 c-0.146-0.246-0.391-0.418-0.672-0.472c-0.283-0.053-0.572,0.016-0.799,0.191c-1.103,0.852-2.785,0.756-3.771-0.23 c-1.012-1.01-1.11-2.631-0.23-3.771c0.175-0.226,0.245-0.517,0.191-0.798s-0.225-0.526-0.471-0.673 c-1.351-0.804-2.811-1.408-4.341-1.798c-0.279-0.07-0.572-0.019-0.809,0.142c-0.237,0.161-0.394,0.416-0.431,0.699 c-0.184,1.428-1.4,2.504-2.829,2.504c-1.43,0-2.646-1.076-2.828-2.503c-0.037-0.284-0.193-0.539-0.43-0.7 c-0.237-0.16-0.53-0.211-0.809-0.142C10.402,0.432,8.941,1.036,7.59,1.84C7.344,1.986,7.173,2.231,7.12,2.513 s0.017,0.572,0.191,0.798c0.88,1.14,0.782,2.761-0.229,3.771C6.097,8.066,4.415,8.164,3.31,7.312 C3.083,7.137,2.793,7.069,2.511,7.12C2.23,7.174,1.986,7.346,1.839,7.592c-0.807,1.355-1.411,2.816-1.798,4.342 c-0.07,0.277-0.018,0.571,0.143,0.808c0.161,0.236,0.416,0.393,0.699,0.43c1.428,0.184,2.504,1.4,2.504,2.829 s-1.076,2.645-2.504,2.829c-0.283,0.036-0.538,0.192-0.699,0.429c-0.16,0.237-0.213,0.531-0.143,0.809 c0.387,1.526,0.992,2.987,1.798,4.342c0.146,0.246,0.391,0.418,0.672,0.472c0.28,0.051,0.572-0.017,0.798-0.19 c1.108-0.853,2.789-0.755,3.772,0.229c1.011,1.011,1.109,2.632,0.229,3.771c-0.175,0.227-0.244,0.518-0.19,0.799 c0.054,0.28,0.226,0.525,0.471,0.672c1.352,0.804,2.812,1.408,4.342,1.798c0.081,0.021,0.164,0.03,0.246,0.03 c0.198,0,0.395-0.059,0.562-0.173c0.236-0.161,0.393-0.416,0.43-0.699c0.183-1.428,1.398-2.504,2.828-2.504 c1.429,0,2.646,1.076,2.829,2.504c0.037,0.284,0.193,0.539,0.431,0.699c0.236,0.162,0.529,0.213,0.809,0.143 c1.528-0.39,2.988-0.994,4.34-1.798c0.245-0.146,0.417-0.391,0.471-0.672s-0.016-0.571-0.19-0.798 c-0.879-1.141-0.779-2.762,0.23-3.771c0.986-0.985,2.667-1.081,3.771-0.229c0.226,0.175,0.517,0.244,0.798,0.19 s0.525-0.226,0.672-0.472c0.806-1.354,1.41-2.814,1.798-4.342c0.071-0.277,0.02-0.571-0.142-0.808 C31.655,19.021,31.401,18.865,31.117,18.829z M28.919,22.514c-1.802-0.803-4.017-0.409-5.415,0.991 c-1.441,1.441-1.795,3.611-0.992,5.415c-0.639,0.322-1.301,0.597-1.981,0.82c-0.707-1.843-2.491-3.128-4.531-3.128 s-3.824,1.285-4.53,3.128c-0.681-0.224-1.344-0.498-1.982-0.82c0.805-1.803,0.451-3.974-0.991-5.416 c-0.914-0.914-2.129-1.417-3.422-1.417c-0.688,0-1.369,0.148-1.994,0.427c-0.323-0.64-0.598-1.303-0.821-1.983 c1.844-0.706,3.129-2.491,3.129-4.53c0-2.04-1.285-3.824-3.129-4.531c0.224-0.68,0.498-1.343,0.821-1.982 c0.625,0.279,1.308,0.428,1.995,0.428c1.293,0,2.508-0.504,3.422-1.418c1.443-1.442,1.796-3.613,0.99-5.417 c0.639-0.322,1.301-0.596,1.982-0.82c0.706,1.844,2.49,3.128,4.53,3.128s3.824-1.284,4.531-3.128 c0.681,0.225,1.343,0.498,1.981,0.82c-0.805,1.804-0.451,3.975,0.992,5.417c0.914,0.914,2.129,1.417,3.421,1.417 c0.688,0,1.369-0.148,1.994-0.427c0.323,0.64,0.598,1.302,0.821,1.982c-1.844,0.707-3.129,2.491-3.129,4.531 c0,2.039,1.285,3.824,3.129,4.53C29.517,21.211,29.243,21.874,28.919,22.514z M16,11.258c-2.614,0-4.741,2.128-4.741,4.742 s2.127,4.741,4.741,4.741s4.742-2.127,4.742-4.741S18.614,11.258,16,11.258z M16,17.871c-1.033,0-1.871-0.838-1.871-1.871 s0.838-1.871,1.871-1.871s1.871,0.838,1.871,1.871S17.033,17.871,16,17.871z";
// check = "M30.768,5.151c-1.51-1.511-4.146-1.511-5.657,0L11.938,18.324l-5.05-5.05 c-1.513-1.513-4.146-1.511-5.657,0c-1.559,1.559-1.56,4.096,0,5.656l7.879,7.879c0.756,0.756,1.76,1.172,2.828,1.172 c1.069,0,2.073-0.416,2.828-1.172l16.002-16c0.756-0.756,1.172-1.761,1.172-2.829S31.523,5.907,30.768,5.151z M29.354,9.396 l-16.002,16c-0.756,0.756-2.072,0.756-2.828,0l-7.879-7.878c-0.779-0.78-0.779-2.049,0-2.829c0.378-0.378,0.88-0.586,1.415-0.586 c0.534,0,1.036,0.208,1.414,0.586l5.757,5.757c0.391,0.391,1.023,0.391,1.414,0l13.88-13.879c0.756-0.756,2.073-0.756,2.829,0 c0.378,0.377,0.586,0.88,0.586,1.414S29.731,9.018,29.354,9.396z";
// cross = "M21.678,16.001l9.18-9.172c0.757-0.755,1.174-1.76,1.174-2.828s-0.417-2.073-1.174-2.829 c-0.755-0.755-1.762-1.171-2.831-1.171s-2.075,0.416-2.831,1.171l-9.182,9.172L6.833,1.172C6.077,0.416,5.072,0,4.001,0 c-1.069,0-2.074,0.416-2.83,1.172c-1.561,1.56-1.562,4.097,0,5.657l9.182,9.172l-9.181,9.172c-1.562,1.56-1.562,4.097,0,5.658 c0.756,0.755,1.762,1.171,2.831,1.171s2.075-0.416,2.831-1.172l9.181-9.172l9.181,9.171c0.756,0.755,1.761,1.172,2.83,1.172 c1.07,0,2.076-0.416,2.832-1.172c1.562-1.561,1.562-4.098,0-5.657L21.678,16.001z M29.442,29.415 c-0.757,0.755-2.075,0.756-2.832,0l-9.888-9.878c-0.391-0.391-1.024-0.391-1.415,0l-9.889,9.879c-0.757,0.755-2.075,0.755-2.832,0 c-0.78-0.78-0.78-2.049,0-2.829l9.889-9.879c0.188-0.188,0.293-0.441,0.293-0.707c0-0.265-0.105-0.52-0.293-0.707l-9.89-9.879 c-0.78-0.78-0.78-2.049,0-2.829C2.964,2.208,3.467,2,4.001,2c0.536,0,1.038,0.208,1.417,0.586l9.889,9.879 c0.391,0.391,1.024,0.391,1.415,0l9.889-9.878c0.757-0.756,2.075-0.756,2.832-0.001c0.378,0.378,0.587,0.881,0.587,1.415 s-0.209,1.036-0.587,1.414l-9.888,9.879c-0.391,0.391-0.391,1.023,0,1.414l9.888,9.878C30.223,27.366,30.223,28.635,29.442,29.415z";
	// document.getElementById('add-btn').addEventListener('click', function() {
	// 	window.location.href = "/Result/result.html";
	// });
	chrome.storage.sync.get(null, function(items) {
		keys = Object.keys(items);
		initialChecks(0, keys, items);		
	});
});


// function getScroll() {
// 	scroll = localStorage.getItem('scroll');
// 	localStorage.removeItem('scroll');
// 	return scroll;
// }

// function setScroll () {
// 	localStorage.setItem('scroll', document.body.scrollTop);
// }

/*
Builds the user tv series list
*/
function buildUserList() {
	insertUsersTvs();
}

// function getSvg(id, svg) {
// 	var div = document.createElement('div');
// 	div.setAttribute('class', 'iconsvg');
// 	div.innerHTML = '<svg class="iconsvg" viewBox="0 0 32 32" style="fill:currentcolor"><path d="'+ svg + '"></path></svg>';
// 	return div;
// }

// function initialChecks (i, keys, items) {
// 	if (i == keys.length) {
// 		console.log("dopo");
// 		buildUserList();
// 		return;
// 	}
// 	k = JSON.parse(items[keys[i]]);
// 	console.log('i = ' + i)
// 	console.log(k)
// 	if (k.lastEpAirDate != null) {
// 		theMovieDb.tvSeasons.getById({"id": k.id, "season_number": k.nextSeas}, function(data) {
// 			var res = JSON.parse(data);
// 			var date = new Date();
// 			var leftToSee = 0;
// 			var first = parseInt(k.nextEp)-1;
// 			for (var j = first; j < res.episodes.length; j++) {
// 				var airDate = Date.parse(res.episodes[j].air_date);
// 				if (airDate < date) {
// 					leftToSee++;
// 				}
// 			}
// 			if (leftToSee > 0) {
// 				console.log(k.name, i, keys.length, leftToSee);
// 				leftToSee = leftToSee != 0 ? leftToSee : " ";
// 				var jsonfile = getJsonForChromeSTorage(k.name, 
// 											k.id, 
// 											parseInt(k.nextEp),
// 											parseInt(k.nextSeas),
// 											k.epName,
// 											k.currSeasNumEps,
// 											leftToSee,
// 											null,
// 											k.status,
// 											k.finishedSeas,
// 											k.subtitles,
// 											k.torrent,
// 											k.streaming);
// 				chrome.storage.sync.set(jsonfile, function() {
// 															console.log("cae 1 " + i);
// 															initialChecks(i+1, keys, items);
// 														});
// 			} else {
// 				console.log("case 2 " + i)
// 				initialChecks(i+1, keys, items);
// 			}
// 		}, function(){});
// 	} else {
// 		console.log("case 3 " + i)
// 		initialChecks(i+1, keys, items);
// 	}
// }

function getLeftToSee (res, k) {
	var date = new Date();
	var leftToSee = 0;
	var first = parseInt(k.nextEp) == 1 ? 1 : parseInt(k.nextEp);
	for (var i = first; i < res.episodes.length; i++) {
		var airDate = Date.parse(res.episodes[i].air_date);
		if (airDate < date) {
			leftToSee++;
		}
	}
	if (leftToSee > 0) {
		leftToSee = leftToSee != 0 ? leftToSee : " ";
		var jsonfile = getJsonForChromeSTorage(k.name, 
									k.id, 
									parseInt(k.nextEp),
									parseInt(k.nextSeas),
									k.epName,
									k.currSeasNumEps,
									leftToSee,
									null,
									k.status,
									k.finishedSeas,
									k.subtitles,
									k.torrent,
									k.streaming);
		chrome.storage.sync.set(jsonfile, function() {buildUserList();});
	}
}

/*
It gets all info saved in chrome.storage and then puts them in the previously created list, with buttons for incrementing or decrementing
the last seen episode
*/
function insertUsersTvs() {
	//final result = Name E01xS01 (Ep name) + -
	// var main = document.getElementById('main');
	// while (main.firstChild) {
	// 			main.removeChild(main.firstChild);
	// }
	// chrome.storage.sync.get(null, function(items) {
	// 	// getting the keys of saved elements (i.e.: 'Name-ID')
	// 	var keys = Object.keys(items);
	// 	for (var i = 0; i < keys.length; i++) {
	// 		var k = JSON.parse(items[keys[i]]);

	// 		k.lastEpAirDate = k.lastEpAirDate == null ? " " : k.lastEpAirDate;
	// 		k.leftToSee = !k.leftToSee ? " " : k.leftToSee;

	// 		var container = document.createElement('div');
	// 		container.setAttribute('class', 'flex mb1');
	// 		container.setAttribute('data-tvs', k.id);

	// 			var backbtn = document.createElement('button'); 
	// 			backbtn.setAttribute('class', 'btn decr-btn custom-btn');
	// 			backbtn.appendChild(getSvg('arrow-left', arrowLeft));

	// 			var nextbtn = document.createElement('button'); 
	// 			nextbtn.setAttribute('class', 'btn incr-btn custom-btn');
	// 			nextbtn.appendChild(getSvg('arrow-right', arrowRight));

	// 			var maindiv = document.createElement('div');
	// 			maindiv.setAttribute('class', 'overflow-scroll flex-auto overflow-hidden p0');
				
	// 				var pname = document.createElement('p');
	// 				if (k.name.length >= 17 ) {
	// 					pname.setAttribute('class', 'center h3 pb0.4 m0 maintitle');
	// 				} else {
	// 					pname.setAttribute('class', 'center h3 pb0.4 m0 maintitle divider');
	// 				}
	// 				pname.innerHTML = k.name;

	// 				var pnext = document.createElement('p');
	// 				pnext.setAttribute('class', 'center h5 m0');
	// 				if (k.finishedSeas && k.status == "Ended") {
	// 					pnext.innerHTML = 'No more episodes for this tv series'
	// 				} else {
	// 					pnext.innerHTML = 'Next to see: <b>' + 'E' + k.nextEp + 'x' + 'S' + k.nextSeas + '</b> / <i>' + k.epName + '</i>';
	// 				}

	// 				var pleft = document.createElement('p');
	// 				pleft.setAttribute('class', 'center h6 m0');
	// 				if (k.finishedSeas) {
	// 					pleft.innerHTML = '';
	// 				} else if (k.leftToSee != " ") {
	// 					pleft.innerHTML = '(<b>' + k.leftToSee + '</b> ep. left to see in this season)';
	// 				} else {
	// 					pleft.innerHTML = '(Next ep. air date is: <b>' + k.lastEpAirDate + '</b>)';
	// 				}

	// 				var plinks = document.createElement('p');
	// 				plinks.setAttribute('class', 'center pb0 mb1 h6 link-btn-container');
						
	// 					var sub = document.createElement('a');
	// 					sub.setAttribute('class', 'btn button-narrow link-btn');
	// 					sub.innerHTML = 'Subtitles';

	// 					var torrent = document.createElement('a');
	// 					torrent.setAttribute('class', 'btn button-narrow link-btn');
	// 					torrent.innerHTML = 'Torrent';

	// 					var streaming = document.createElement('a');
	// 					streaming.setAttribute('class', 'btn button-narrow link-btn');
	// 					streaming.innerHTML = 'Streaming';

	// 					var options = document.createElement('div');
	// 					options.setAttribute('class', 'btn link-btn mini-tool');
	// 					options.innerHTML = '<svg class="" viewBox="0 0 48 48" style="fill:currentcolor"><path d="'+ tools + '"></path></svg>';

	// 		main.appendChild(container);
	// 			container.appendChild(backbtn);
	// 			container.appendChild(maindiv);
	// 				maindiv.appendChild(pname);
	// 				maindiv.appendChild(pnext);
	// 				maindiv.appendChild(pleft);
	// 				maindiv.appendChild(plinks);
	// 					plinks.appendChild(sub);
	// 					plinks.appendChild(document.createTextNode('/'));
	// 					plinks.appendChild(torrent);
	// 					plinks.appendChild(document.createTextNode('/'));
	// 					plinks.appendChild(streaming);
	// 					plinks.appendChild(document.createTextNode('/'));
	// 					plinks.appendChild(options);
	// 			container.appendChild(nextbtn);



	// 		if (k.lastEpAirDate == " ") {
	// 			var modName = k.name.replace(/\s+/g, '+').toLowerCase();
	// 			nextbtn.setAttribute('href', '#');
	// 			var reg = new RegExp(/((\(S\))|(\(E\))|(\(N\)))/);
	// 			var temp = k.subtitles;
	// 			if (reg.test(k.subtitles)) {
	// 				temp = k.subtitles.replace(/\(S\)/, k.nextSeas);
	// 				temp = temp.replace(/\(E\)/, k.nextEp);
	// 				temp = temp.replace(/\(N\)/, modName);
	// 			}
	// 			sub.setAttribute('href', temp);

	// 			reg = new RegExp(/((\(S\))|(\(E\))|(\(N\)))/)
	// 			temp = k.torrent;
	// 			if (reg.test(k.torrent)) {
	// 				temp = k.torrent.replace(/(\(S\))/, k.nextSeas);
	// 				temp = temp.replace(/(\(E\))/, k.nextEp);
	// 				temp = temp.replace(/(\(N\))/, modName);
	// 			}
	// 			torrent.setAttribute('href', temp);

	// 			reg = new RegExp(/((\(S\))|(\(E\))|(\(N\)))/);
	// 			temp = k.streaming;
	// 			if (reg.test(k.streaming)) {
	// 				temp = k.streaming.replace(/(\(S\))/, k.nextSeas);
	// 				temp = temp.replace(/(\(E\))/, k.nextEp);
	// 				temp = temp.replace(/(\(N\))/, modName);
	// 			}
	// 			streaming.setAttribute('href', temp);
	// 		} else if (k.nextEp == "01" && k.nextSeas == "01") {
	// 			backbtn.setAttribute('data-disabled', true);
	// 		} else {
	// 			nextbtn.setAttribute('data-disabled', true);
	// 			sub.setAttribute('data-disabled', true);
	// 			torrent.setAttribute('data-disabled', true);
	// 			streaming.setAttribute('data-disabled', true);
	// 		}
	// 	}


		

		// adding listeners for all episodes' + and -
		// when clicked they should overwrite the current record and increment or decrement it
		var incrBtns = document.getElementsByClassName('incr-btn');
		var decrBtns = document.getElementsByClassName('decr-btn');
		var linkBtns = document.getElementsByClassName('link-btn');
		var opts = document.getElementsByClassName('mini-tool');
		var j = -1;
		for (var i = 0; i < incrBtns.length; i++) {
			if (!incrBtns[i].getAttribute('data-disabled')) {
				incrBtns[i].addEventListener('click', changeEpHandler);
				linkBtns[++j].addEventListener('click', linkHandler);
				linkBtns[++j].addEventListener('click', linkHandler);
				linkBtns[++j].addEventListener('click', function() {});
				linkBtns[++j].addEventListener('click', function() {});
			}
			decrBtns[i].addEventListener('click', changeEpHandler);
			opts[i].addEventListener('click', function() {
				setScroll();
				var main = this.parentNode.parentNode.parentNode;
				var id = main.getAttribute('data-tvs');
				chrome.storage.sync.get(id, function(obj) {
					data = getSelectedTvsData(id, obj);
					viewOptions(main, data);
				});
			});
		}
		document.body.scrollTop = getScroll();
	});
}


function changeEpHandler () {
	setScroll();
	var chromeStorageKey = this.parentNode.getAttribute('data-tvs');
	var isIncrement = this.className.split(" ").indexOf('incr-btn') >= 1 ? true : false;
	var selectedTvsLi = this.parentNode;
	chrome.storage.sync.get(chromeStorageKey, function(obj) {
		var selData = getSelectedTvsData(chromeStorageKey, obj);
		theMovieDb.tv.getById({"id":selData.id}, 
								function(data) {
									changeEpisode(isIncrement, data, chromeStorageKey, selData.name, selData.id, 
													selData.currEp, selData.currSeas, selData.epName, selData.currSeasNumEps, 
													selData.leftToSee, selData.lastEpAirDate, selData.status, selData.finishedSeas,
													selData.subtitles, selData.torrent, selData.streaming);
								}, function(data) {
									console.log("error");
								});
	});
}

function viewOptions (main, data) {

	var id = main.getAttribute('data-tvs');
	
	var title = main.children[1].children[0].innerHTML;
	
	var seasonstr = main.children[1].children[1].innerHTML;
	var nextep = main.children[1].children[2].innerHTML;
	var season = nextep.substring(1, 5) != 'Next' ? seasonstr.substring(21, 23) : "";

	
	var tvsChildren = new Array();
	while (main.firstChild) {
		tvsChildren.push(main.firstChild);
		main.removeChild(main.firstChild);
	}

	var maindiv = document.createElement('div');
	maindiv.setAttribute('class', 'overflow-scroll flex-auto overflow-hidden p0');

		var pname = document.createElement('h3');
		pname.setAttribute('class', 'center pb0.4 m0 maintitle divider');
		pname.innerHTML = title;

			var divsubs = document.createElement('div');
			divsubs.setAttribute('class', 'flex flex-center');

			var psubs = document.createElement('p');
			psubs.setAttribute('class', 'flex-none col-2 left h6 m0');
			psubs.innerHTML = "Subtitles: ";

			var fsubs = document.createElement('input');
			fsubs.setAttribute('id', 'subs-input');
			fsubs.setAttribute('class', 'flex-auto h5 field not rounded');
			fsubs.setAttribute('type', 'search');
			fsubs.setAttribute('placeholder', data.subtitles);

			var divtorrent = document.createElement('div');
			divtorrent.setAttribute('class', 'flex flex-center');

			var ptorrent = document.createElement('p');
			ptorrent.setAttribute('class', 'flex-none col-2 left h6 m0');
			ptorrent.innerHTML = "Torrent: ";

			var ftorrent = document.createElement('input');
			ftorrent.setAttribute('id', 'torrent-input');
			ftorrent.setAttribute('class', 'flex-auto h5 field not rounded');
			ftorrent.setAttribute('type', 'search');
			ftorrent.setAttribute('placeholder', data.torrent);

			var divstreaming = document.createElement('div');
			divstreaming.setAttribute('class', 'flex flex-center');

			var pstreaming = document.createElement('p');
			pstreaming.setAttribute('class', 'flex-none col-2 left h6 m0');
			pstreaming.innerHTML = "Streaming: ";

			var fstreaming = document.createElement('input');
			fstreaming.setAttribute('id', 'streaming-input');
			fstreaming.setAttribute('class', 'flex-auto h5 field not rounded');
			fstreaming.setAttribute('type', 'search');
			fstreaming.setAttribute('placeholder', data.streaming);

			var pops = document.createElement('p');
			pops.setAttribute('class', 'center mb1 h5 link-btn-container');
				
				var seasonseen = document.createElement('button');
				var airedseen = document.createElement('button');
				if (season) {
					airedseen.setAttribute('class', 'btn btn-outline mb1 ml1 navy outlined');
					airedseen.innerHTML = 'Set all aired as seen';
					seasonseen.setAttribute('class', 'btn btn-outline mb1 ml1 navy outlined');
					seasonseen.innerHTML = 'Set season ' + season + ' as seen';
				} else {
					airedseen.setAttribute('class', 'btn btn-outline mb1 ml1 navy outlined inactive-btn');
					airedseen.innerHTML = 'You\'re already up to date';
					seasonseen.setAttribute('class', 'btn btn-outline mb1 ml1 navy outlined inactive-btn');
					seasonseen.innerHTML = 'You\'re already up to date';
				}
				var deletetvs = document.createElement('button');
				deletetvs.setAttribute('class', 'btn btn-outline mb1 ml1 navy outlined');
				deletetvs.innerHTML = 'Delete "' + title + '" from collection';

				var promptdiv = document.createElement('div'); 
				promptdiv.setAttribute('class', 'flex mt2');

				var confirmbtn = document.createElement('button'); 
				confirmbtn.setAttribute('class', 'btn prompt-btn custom-btn flex-auto check');
				confirmbtn.innerHTML = '<svg class="" viewBox="0 0 48 48" style="fill:currentcolor"><path d="'+ check + '"></path></svg>';

				var deletechangesbtn = document.createElement('button'); 
				deletechangesbtn.setAttribute('class', 'btn prompt-btn custom-btn flex-auto cross');
				deletechangesbtn.innerHTML = '<svg class="" viewBox="0 0 48 48" style="fill:currentcolor"><path d="'+ cross + '"></path></svg>';

		main.appendChild(maindiv);
		maindiv.appendChild(pname);
			maindiv.appendChild(pops);
				pops.appendChild(seasonseen);
				pops.appendChild(airedseen);
				pops.appendChild(deletetvs);
			maindiv.appendChild(divsubs);
				divsubs.appendChild(psubs);
				divsubs.appendChild(fsubs);
			maindiv.appendChild(divtorrent);
				divtorrent.appendChild(ptorrent);
				divtorrent.appendChild(ftorrent);
			maindiv.appendChild(divstreaming);
				divstreaming.appendChild(pstreaming);
				divstreaming.appendChild(fstreaming);
			maindiv.appendChild(promptdiv);
				promptdiv.appendChild(confirmbtn);
				promptdiv.appendChild(deletechangesbtn);

	subtitles = fsubs.value ? fsubs.value : fsubs.getAttribute('placeholder');
	torrent = ftorrent.value ? ftorrent.value : ftorrent.getAttribute('placeholder');
	streaming = fstreaming.value ? fstreaming.value : fstreaming.getAttribute('placeholder');

	if (season) {
		seasonseen.addEventListener('click', function () {
			theMovieDb.tv.getById({"id":id}, function(data){
				var res = JSON.parse(data);
				status = res.status;
				seas = parseInt(season);
				if (seas == res.seasons.length && res.status == "Ended") {
					theMovieDb.tvSeasons.getById({"id": id, "season_number": seas}, finishSeason, function(){});
				} else {			
					theMovieDb.tvSeasons.getById({"id": id, "season_number": (seas+1)}, firstOfNextSeason, function(data){
						theMovieDb.tvSeasons.getById({"id": id, "season_number": (seas)}, lastAiredInSeason, function(){});	
					});
				}
			}, function(){});
		});

		function finishSeason (data) {

			var res = JSON.parse(data);
			// (name, id, nextEp, nextSeas, epName, currSeasNumEps, leftToSee, lastEpAirDate, status, finishedSeas)
			jsonfile = getJsonForChromeSTorage(title, 
												id, 
												parseInt(res.episodes[res.episodes.length-1].episode_number),
												parseInt(res.season_number),
												res.episodes[res.episodes.length-1].name,
												res.episodes.length,
												0,
												" ",
												res.status,
												true,
												subtitles,
												torrent,
												streaming);
			chrome.storage.sync.set(jsonfile, function() {});
		}

		function lastAiredInSeason (data) {
			var res = JSON.parse(data);
			for (var i = 0; i < res.episodes.length; i++) {
				var date = new Date();
				var airDate = Date.parse(res.episodes[i].air_date);
				if (date < airDate || i == res.episodes.length-1) {
					var finishedSeas = i == res.episodes.length-1 ? true : false;
					jsonfile = getJsonForChromeSTorage(title, 
												id, 
												parseInt(res.episodes[i].episode_number),
												parseInt(res.season_number),
												res.episodes[i].name,
												res.episodes.length,
												" ",
												res.episodes[i].air_date,
												res.status,
												finishedSeas,
												subtitles,
												torrent,
												streaming);
					chrome.storage.sync.set(jsonfile, function() {});
					window.location.href = "/Popup/popup.html";
					break;
				}
			}
		}

		function firstOfNextSeason (data) {
			var res = JSON.parse(data);
			jsonfile = getJsonForChromeSTorage(title, 
												id, 
												parseInt(res.episodes[0].episode_number),
												parseInt(res.season_number),
												res.episodes[0].name,
												res.episodes.length,
												res.episodes.length,
												" ",
												res.status,
												false,
												subtitles,
												torrent,
												streaming);
			chrome.storage.sync.set(jsonfile, function() {});
			window.location.href = "/Popup/popup.html";
		}

		airedseen.addEventListener('click', function () {
			theMovieDb.tv.getById({"id":id}, function(data){
				var res = JSON.parse(data);
				theMovieDb.tv.getById({"id": res.id}, function(data) {
					var s = JSON.parse(data);
					var seasLength = res.seasons.length;
					seasLength = s.seasons[0].season_number == 0 ? seasLength-1 : seasLength;
					theMovieDb.tvSeasons.getById({"id": id, "season_number": seasLength}, lastAiredInSeason, function(){});
				}, function(){});
			}, function(){});
		});
	}

	deletetvs.addEventListener('click', function () {
		chrome.storage.sync.remove(id, function() {});
		window.location.href = "/Popup/popup.html";
	});

	confirmbtn.addEventListener('click', function () {
		subtitles = fsubs.value ? fsubs.value : fsubs.getAttribute('placeholder');
		torrent = ftorrent.value ? ftorrent.value : ftorrent.getAttribute('placeholder');
		streaming = fstreaming.value ? fstreaming.value : fstreaming.getAttribute('placeholder');
		chrome.storage.sync.get(id, function(data) {
			var res = getSelectedTvsData(id, data);		
			jsonfile = getJsonForChromeSTorage(res.name, 
												res.id, 
												parseInt(res.currEp),
												parseInt(res.currSeas),
												res.epName,
												res.currSeasNumEps,
												res.leftToSee,
												res.lastEpAirDate,
												res.status,
												res.finishedSeas,
												subtitles,
												torrent,
												streaming);
			chrome.storage.sync.set(jsonfile, function() {
				window.location.href = "/Popup/popup.html";
			});
		});
	});

	deletechangesbtn.addEventListener('click', function () {
		while (main.firstChild) {
			main.removeChild(main.firstChild);
		}
		for (i = 0; i < tvsChildren.length; i++) {
			main.appendChild(tvsChildren[i]);
		}
	});
}

function linkHandler () {
	setScroll();
	chrome.tabs.create({active: true, url: this.href});
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
	var subtitles = plainJson.subtitles;
	var torrent = plainJson.torrent;
	var streaming = plainJson.streaming;
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
		finishedSeas: finishedSeas,
		subtitles: subtitles,
		torrent: torrent,
		streaming: streaming
	};
}

/*
It checks if the next or previous episode is available and and if so, it gets and overwrite it in the corresponing chrome.storage.sync slot
*/
function changeEpisode(isIncrement, data, chromeStorageKey, name, id, currEp, currSeas, epName, currSeasNumEps, leftToSee, lastEpAirDate, status, finishedSeas, subtitles, torrent, streaming) {
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
		jsonfile = getJsonForChromeSTorage(name, id, currEp, currSeas, '', currSeasNumEps, leftToSee, lastEpAirDate, status, hasEnded, subtitles, torrent, streaming);
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
			} else if (currEp == 1 && currSeas == 1) {
				nextEp = 1;
				nextSeas = 1;
			} else {
				hasEnded = true;
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
				jsonfile = getJsonForChromeSTorage(name, id, nextEp, nextSeas, epName, currSeasNumEps, leftToSee, lastEpAirDate, status, false, subtitles, torrent, streaming);
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
// function getJsonForChromeSTorage (name, id, nextEp, nextSeas, epName, currSeasNumEps, leftToSee, lastEpAirDate, status, finishedSeas, subtitles, torrent, streaming) {
// 	// da cambiare
// 	nextEp = (nextEp < 10 ? '0' : '') + nextEp;
//     nextSeas = (nextSeas < 10 ? '0' : '') + nextSeas;
// 	var save = id, selectedValues = JSON.stringify({'name':name, 
//                                                            'id':id,
//                                                            'nextEp': nextEp,
//                                                            'nextSeas': nextSeas,
//                                                            'epName': epName,
//                                                            'currSeasNumEps': currSeasNumEps,
//                                                        	   'leftToSee': leftToSee,
//                                                        	   'lastEpAirDate': lastEpAirDate,
//                                                        	   'status': status,
//                                                        	   'finishedSeas': finishedSeas,
//                                                        	   'subtitles': subtitles,
//                                                        	   'torrent': torrent,
//                                                        	   'streaming': streaming});
// 	var jsonfile = {};
// 	jsonfile[save] = selectedValues;
// 	return jsonfile;
// }