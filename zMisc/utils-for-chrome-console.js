chrome.storage.sync.clear()

chrome.storage.sync.get(null, function(obj) {console.log(obj)});

chrome.storage.sync.clear();
var save = "58937", selectedValues = JSON.stringify({"name":"Masters of Sex","id":"58937","nextEp":"12","nextSeas":"02","epName":"Pilot","currSeasNumEps":12,"leftToSee":1,"lastEpAirDate":null,"status":"Returning Series", "finishedSeas": false});
var jsonfile = {};
jsonfile[save] = selectedValues;
chrome.storage.sync.set(jsonfile, function(){});


chrome.storage.sync.clear();
var save = "54344", selectedValues = JSON.stringify({"name":"The Leftovers","id":"54344","nextEp":"09","nextSeas":"01","epName":"Two Boats and a Helicopter","currSeasNumEps":10,"leftToSee":8,"lastEpAirDate":null,"status":"Returning Series", "finishedSeas": false});
var jsonfile = {};
jsonfile[save] = selectedValues;
chrome.storage.sync.set(jsonfile, function(){});

var save = "58937", selectedValues = JSON.stringify({"name":"Masters of Sex","id":"58937","nextEp":"01","nextSeas":"03","epName":"Parliament of Owls","currSeasNumEps":8,"leftToSee":" ","lastEpAirDate":"2015-07-26","status":"Returning Series","finishedSeas":false,"subtitles":"http://www.opensubtitles.org/en/search/searchonlytvseries-on/season-(S)/episode-(E)/moviename-(N)","torrent":"https://torrentz.eu/search?q=(N)+s(S)e(E)","streaming":""});
var jsonfile = {};
jsonfile[save] = selectedValues;
chrome.storage.sync.set(jsonfile, function(){});