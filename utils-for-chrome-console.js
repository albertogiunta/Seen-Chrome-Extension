chrome.storage.sync.clear()

chrome.storage.sync.get(null, function(obj) {console.log(obj)});

var save = "Lost-4607", selectedValues = JSON.stringify({'name':"Lost", 
                                                           'id':4607, 
                                                           'nextEp': "20", 
                                                           'nextSeas': "01", 
                                                           'epName': "boh",
                                                           'currSeasNumEps': 24,
                                                       		'lastSeasNumEps': 24});});
var jsonfile = {};
jsonfile[save] = selectedValues;
chrome.storage.sync.set(jsonfile, function(){})

chrome.storage.sync.clear()
var save = "Mr. Robot-62560", selectedValues = JSON.stringify({'name':"Mr. Robot", 
                                                           'id':62560, 
                                                           'nextEp': "01", 
                                                           'nextSeas': "01", 
                                                           'epName': "boh",
                                                           'currSeasNumEps': 10},
                                                           'lastSeasNumEps': 10}););
var jsonfile = {};
jsonfile[save] = selectedValues;
chrome.storage.sync.set(jsonfile, function(){})