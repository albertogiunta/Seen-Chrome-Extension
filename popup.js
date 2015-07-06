document.addEventListener('DOMContentLoaded', function() {
    var loc = location.pathname.substring(1);

    // se ci si trova sulla pagina principale (con ricerca serie tv)
    if (loc == "popup.html") {
	    var btn = document.getElementById("search-btn");
	    btn.addEventListener("click", handler);
	    document.getElementById("result").innerHTML = location.pathname.substring(1);
		function handler() {			
			var content = document.getElementById("search-tf").value;
			document.getElementById("result").innerHTML = content;
			localStorage.setItem("search-str", content);
		}

		// se ci si trova sulla pagina dei risultati di ricerca di una serie
    } else if (loc == "result.html") {
    	var str = localStorage.getItem("search-str");
    	localStorage.removeItem("search-str");
    	var lbl = document.getElementById("result");
    	lbl.innerHTML = str;
    }
});