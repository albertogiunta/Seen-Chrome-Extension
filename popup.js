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
        if (str) {
            document.getElementById("title").innerHTML = "Results found for \"" + str + "\"";
            str = escape(str);
            json = theMovieDb.search.getTv({"query":str}, successCB, errorCB);
        } else {
            document.getElementById("title").innerHTML = "No results found!";
        }
    }

    function successCB(data) {
    	console.log("Success callback: " + data);
        result = JSON.parse(data);
        console.log(result);
        document.getElementById("result_list").appendChild(createList(createArray(result)));
    };

    function errorCB(data) {
    	console.log("Error callback: " + data);
    }; 

    function createArray(data) {
        var tvs = [];
        for (var i = 0; i < data.results.length; i++) {
            tvs[i] = data.results[i].name;
        }
        return tvs;
    }

    function createList(data) {
        var list = document.createElement("ul");
        for (var i = 0; i < data.length; i++) {
            var item = document.createElement("li");
            item.appendChild(document.createTextNode(data[i]));
            list.appendChild(item);
        }
        return list;
    }
});














