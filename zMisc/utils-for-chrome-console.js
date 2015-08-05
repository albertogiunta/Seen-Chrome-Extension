chrome.storage.sync.clear()

chrome.storage.sync.get(null, function(obj) {console.log(obj)});

chrome.storage.sync.clear();
var save = "58937", selectedValues = JSON.stringify({"name":"Masters of Sex","id":"58937","nextEp":"12","nextSeas":"02","epName":"Pilot","currSeasNumEps":12,"leftToSee":1,"lastEpAirDate":null,"status":"Returning Series", "finishedSeas": false});
var jsonfile = {};
jsonfile[save] = selectedValues;
chrome.storage.sync.set(jsonfile, function(){});


chrome.storage.sync.clear();
var save = "54344", selectedValues = JSON.stringify({"tvsName":"The Leftovers","tvsId":"54344","episodeNumber":10,"seasonNumber":1,"episodeName":"Jarden, Texas","seasEpisodes":10,"leftToSee":null,"episodeAirdate":null,"tvsStatus":"Returning Series","seasFinished":true,"tvsFinished":true,"subtitles":"http://www.opensubtitles.org/en/search/searchonlytvseries-on/season-(S)/episode-(E)/moviename-(N)","torrent":"https://torrentz.eu/search?q=(N)+s(S)e(E)","streaming":""});
var jsonfile = {};
jsonfile[save] = selectedValues;
chrome.storage.sync.set(jsonfile, function(){});

var save = "58937", selectedValues = JSON.stringify({"name":"Masters of Sex","id":"58937","nextEp":"01","nextSeas":"03","epName":"Parliament of Owls","currSeasNumEps":8,"leftToSee":" ","lastEpAirDate":"2015-07-26","status":"Returning Series","finishedSeas":false,"subtitles":"http://www.opensubtitles.org/en/search/searchonlytvseries-on/season-(S)/episode-(E)/moviename-(N)","torrent":"https://torrentz.eu/search?q=(N)+s(S)e(E)","streaming":""});
var jsonfile = {};
jsonfile[save] = selectedValues;
chrome.storage.sync.set(jsonfile, function(){});


var save = "62560", selectedValues = JSON.stringify({"tvsName":"Mr. Robot","tvsId":"62560","episodeNumber":1,"seasonNumber":1,"episodeName":"eps1.0_hellofriend.mov","seasEpisodes":10,"leftToSee":6,"episodeAirdate":null,"tvsStatus":"Returning Series","seasFinished":false,"tvsFinished":false,"subtitles":"sd","torrent":"sds","streaming":"sd"});
var jsonfile = {};
jsonfile[save] = selectedValues;
chrome.storage.sync.set(jsonfile, function(){});