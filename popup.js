document.addEventListener('DOMContentLoaded', function() {
    var loc = location.pathname.substring(1);
    var result = null;
    // se ci si trova sulla pagina principale (con ricerca serie tv)
    if (loc == "popup.html") {
	    var btn = document.getElementById("search-btn");
	    btn.addEventListener("click", handler);
	    document.getElementById("result").innerHTML = location.pathname.substring(1);
		
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
        // console.log("Success callback: " + data);
        result = JSON.parse(data);
        document.getElementById("result_list").appendChild(createList(createArray(result))); // crea la lista
        // aggiungo il listener per il click su ogni link
        var cta = document.getElementsByClassName("tvs-a")
        for (var i = 0; i < cta.length; i++) {
            cta[i].addEventListener("click", function() {
                // var regex = /.+?(?=\ \(([0-9])\w{3}\))/;
                // selectedName = regex.test(tempName) ? regex.exec(tempName) : tempName;
                console.log(this);
                selectedName = this.getAttribute("data-tvsname");
                selectedId = this.getAttribute("data-tvsid");
                console.log(selectedId);
                console.log(selectedName);
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

    function addTvs() {
        theMovieDb.tvEpisodes.getById({"id":selectedId, "season_number": 1, "episode_number": 1}, successAdd, errorAdd)
    }

    function successAdd(data) {
        result = JSON.parse(data);
        var valueName = "next-" + selectedName + "-" + selectedId;
        var save = valueName, selectedValues = JSON.stringify({'name':selectedName, 'id':selectedId});
        var jsonfile = {};
        jsonfile[save] = selectedValues;
        // chrome.storage.sync.clear();
        chrome.storage.sync.set(jsonfile, function() {
            console.log("name saved as " + selectedName);
            chrome.storage.sync.get(valueName, function(items) {
            console.log(items);
            });
            // chrome.storage.sync.get(valueName, function(obj) {var a = JSON.parse(obj[valueName]); console.log("obj", a)});
        });
    }

    function errorAdd(data) {

    }
});














