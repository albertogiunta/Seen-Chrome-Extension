document.addEventListener('DOMContentLoaded', function() {
    var loc = location.pathname.substring(1);
    var result = null;
    // se ci si trova sulla pagina principale (con ricerca serie tv)
    if (loc == "popup.html") {
        buildUserList();

	    var btn = document.getElementById("search-btn");
	    btn.addEventListener("click", handler);
	    // document.getElementById("result").innerHTML = location.pathname.substring(1);
		
        function buildUserList() {
            var ul = document.createElement("ul");
            ul.setAttribute("id", "user-tvs-ul");
            chrome.storage.sync.get(null, function(items) {
                var keys = Object.keys(items);
                for (var i = 0; i < keys.length; i++) {
                    var k = JSON.parse(items[keys[i]]);
                    
                    var li = document.createElement("li");
                    li.setAttribute("data-tvs", k.name + "-" + k.id);
                    var node = document.createTextNode(k.name + " E" + k.nextEp + "x" + "S" + k.nextSeas + " (" + k.epName + ")");
                    
                    var increment = document.createElement("a");
                    increment.setAttribute("href", "#");
                    increment.className = "incr-btn";
                    var text = document.createTextNode("+");
                    increment.appendChild(text);
                    
                    var decrement = document.createElement("a");
                    decrement.setAttribute("href", "#");
                    decrement.setAttribute("class", "decr-btn");
                    var text = document.createTextNode("-");
                    decrement.appendChild(text);
                    
                    li.appendChild(node);
                    li.appendChild(increment);
                    li.appendChild(decrement);
                    ul.appendChild(li);
                }
                var incrBtns = document.getElementsByClassName("incr-btn");
                var decrBtns = document.getElementsByClassName("decr-btn");
                for (var i = 0; i < incrBtns.length; i++) {
                    incrBtns[i].addEventListener("click", function() {
                        var dataTvs = this.parentNode.getAttribute("data-tvs");
                        chrome.storage.sync.get(dataTvs, function(obj) {
                            id = dataTvs.substring(dataTvs.lastIndexOf("-") + 1);

                            var plainJson = JSON.parse(obj[dataTvs]);
                            var currEp = plainJson.nextEp;
                            var currSeas = plainJson.nextSeas;
                            var currSeasNumEps = plainJson.currSeasNumEps;

                            theMovieDb.tv.getById({"id":id}, function(data) {
                                if (currEp = parseInt(currEp) + 1 > currSeasNumEps && c) {
                                    currSeas++;
                                    currEp = 1;
                                }
                            }, function(data) {
                                console.log("error");
                            })
                        });
                        // fai richiesta per aggiungere
                        //prendi attuale ep e seas
                        // prova con ep +1
                        // prova con seas +1
                        // controlla ifaired true
                        console.log("premuto + dell'el " + this.parentNode.getAttribute("data-tvs"));
                    });
                    decrBtns[i].addEventListener("click", function() {
                        // fai richiesta per togliere
                        console.log("premuto - dell'el " + this.parentNode.getAttribute("data-tvs"));
                    });
                }
            });
            document.getElementById("user-list").appendChild(ul);
        }

        function handler() {
            // prendo il contenuto del textfield
			var content = document.getElementById("search-tf").value;
            // se è stato inserito qualcosa
            if (content) {
    			document.getElementById("result").innerHTML = content;
                document.getElementById("search-btn").setAttribute("href", "result.html");
    			localStorage.setItem("search-str", content);

            // se non è stato inserito niente
            } else {
                document.getElementById("result").innerHTML = "Please, insert st!";
                document.getElementById("search-btn").setAttribute("href", "#");
            }
		}

		// se ci si trova sulla pagina dei risultati di ricerca di una serie
    } else if (loc == "result.html") {
        var str = localStorage.getItem("search-str");
        localStorage.removeItem("search-str");
        // mostro i risultati per la stringa di ricerca
        if (str) {
            document.getElementById("title").innerHTML = "Results found for \"" + str + "\"";
            str = escape(str);
            json = theMovieDb.search.getTv({"query":str}, successSearch, errorSearch);
        } else {
            document.getElementById("title").innerHTML = "No results found!";
        }
    }
    
    var selectedName = null;
    var selectedId = null;

    // se la ricerca ha avuto successo creo un elenco puntato con i link di aggiunta di ogni possibile serie
    function successSearch(data) {
        result = JSON.parse(data);
        document.getElementById("result_list").appendChild(createList(createArray(result))); // crea la lista
        // aggiungo il listener per il click su ogni link
        var cta = document.getElementsByClassName("tvs-a")
        for (var i = 0; i < cta.length; i++) {
            cta[i].addEventListener("click", function() {
                console.log(this);
                selectedName = this.getAttribute("data-tvsname");
                selectedId = this.getAttribute("data-tvsid");
                addTvs();
            });
        }
    };

    // se la ricerca non ha avuto successo
    function errorSearch(data) {
    	console.log("Error callback: " + data);
    }; 

    // rimappo il json prendendo solo i valori che mi servono (id, nome, anno)
    function createArray(data) {
        var tvs = [];
        for (var i = 0; i < data.results.length; i++) {
            tvs[i] = {};
            tvs[i].id = "" + data.results[i].id;
            tvs[i].name = data.results[i].name;
            var date = data.results[i].first_air_date;
            tvs[i].year = date ? " (" + date.substring(0,4) + ") " : "";
        }
        return tvs;
    }

    // crea la lista html 
    function createList(data) {
        var list = document.createElement("ul");
        list.setAttribute("id", "tvs-ul");
        for (var i = 0; i < data.length; i++) {
            
            var item = document.createElement("li");
            item.setAttribute("class", "tvs-li")

            var link = document.createElement("a");
            link.setAttribute("class", "tvs-a");
            link.setAttribute("data-tvsid", data[i].id);
            link.setAttribute("data-tvsname", data[i].name);
            link.setAttribute("href", "#");
            var node = document.createTextNode("CTA");
            link.appendChild(node);
            
            item.appendChild(document.createTextNode(data[i].name + data[i].year));
            item.appendChild(link);
            list.appendChild(item);
        }
        return list;
    }

    var currSeasNumEps = null;

    function addTvs() {
        console.log(selectedId);
        theMovieDb.tvSeasons.getById({"id":selectedId, "season_number":1}, function(data){
            var result = JSON.parse(data);
            currSeasNumEps = result.episodes.length;
            theMovieDb.tvEpisodes.getById({"id":selectedId, "season_number": 1, "episode_number": 1}, successAdd, errorAdd);
        }, function(data) {
            console.log("Error occurred");
        });
    }

    function successAdd(data) {
        var valueName = selectedName + "-" + selectedId;

        result = JSON.parse(data);
        console.log(result);
        epNum = (result.episode_number < 10 ? '0' : '') + result.episode_number;
        seasNum = (result.season_number < 10 ? '0' : '') + result.season_number;
        var save = valueName, selectedValues = JSON.stringify({'name':selectedName, 
                                                               'id':selectedId, 
                                                               'nextEp': epNum, 
                                                               'nextSeas': seasNum, 
                                                               'epName': result.name,
                                                               'currSeasNumEps': currSeasNumEps});

        var jsonfile = {};
        jsonfile[save] = selectedValues;
        chrome.storage.sync.set(jsonfile, function() {
            console.log("name saved as " + selectedName);
        });
        window.location.href="popup.html";
    }

    function errorAdd(data) {
    }
});














