/* questo è per catturare il DOM dell'ext.
tutto quello che deve apparire e succedere deve andare qua dentro
*/
document.addEventListener('DOMContentLoaded', function() {
	// stuff
});

/*
html5 storage
*/
// viene trattato come un array associativo (stile php, una mappa)
// http://diveintohtml5.info/storage.html
localStorage.setItem("name", variable);
localStorage.getItem("name");
localStorage.removeItem("name");

/*
accesso globale alle variabili
*/
// se un js viene inserito in un html, se ha variabili globali queste possono essere semplicemente usate dagli altri file
// altrimenti prova con window.variablename

/*
DOM manipulation
*/
document.getElementById("elementId");
document.getElementById("elementId").setAttribute("attr", "value");
document.getElementById("elementId").getAttribute("attr");
document.getElementsByClassName("className");
document.query...

// elements creation
var newEl = document.createElement("div");
newEl.setAttribute("attr", "value");
var node = document.createTextNode("insert text here");
newEl.appendChild(node);

/*
CHROME STORAGE GET SET
*/
// clear
chrome.storage.sync.clear();
//---------------------------------------------------
// set
var save = keyForChromeStorage, 
			jsonValuesForChromeStorage = JSON.stringify(
														{'key': value, 
														 'anotherkey': anothervalue});
var jsonfile = {};
jsonfile[save] = jsonValuesForChromeStorage;	
chrome.storage.sync.set(jsonfile, function() {
	console.log("save succeded");
});
//---------------------------------------------------
//get NB è asincrono (se vuoi verificare che è andato a buon fine il set mettilo dentro il callback del set)
chrome.storage.sync.get(keyForChromeStorage, function(obj) {
	var plainJson = JSON.parse(obj[keyForChromeStorage]);
	console.log(plainJson.key, plainJson.anotherkey):
});

// questo prende tutti i valori salvati nel chrome sync storage
chrome.storage.sync.get(null, function(obj)) {
	console.log(obj);
});

/*
JSON manipulation
*/
var parsed = JSON.parse(plainJson);
var plain = JSON.stringify({'key': value, "anotherkey": anothervalue});

/*
string manipulation
*/
string.substring(1);
string.substring(0, 3);


/*
CALLBACK STUFF
*/

// i callback nascono per essere asincroni, quindi vengono eseguiti solo nel momento in cui 
// quello che serve è pronto, non sono bloccanti
// se vuoi eseguire un callback passandogli dei metodi il metodo più semplice è:
document.someListener("stuff", function() {
	someFunction(par, par, par);
});

function someFunction(par, par, par) {
	// lot of stuff called from the callback
};
//---------------------------------------------------
// per riferirti al contesto del callback usa il this
document.someListener("stuff", function() {
	console.log(this);
})
//---------------------------------------------------
// addEventListener
elem.addEventListener("click", function() {
	//stuff
	// anonymous function
});
// OPPURE
btn.addEventListener("click", nonAnonymousFunction); 
function nonAnonymousFunction() {
	// stuff
}
// per capire perchè non puoi usare nonAnonymousFunction()
// senza parentesi (FUNCTION CALL): la funzione viene invocata nel document context
// con parentesi (FUNCTION INVOCATION): la funzione viene invocata nel Window object context
// inoltre il secondo parametro di addEventListener si aspetta un tipo funzione
// e metterci le parentesi fa ritornare quello che ritorna la funzione (che non è a sua volta una funzione)
// http://stackoverflow.com/questions/15255801/javascript-addeventlistener-function
// http://stackoverflow.com/questions/593509/javascript-syntax-function-calls-and-using-parenthesis
//---------------------------------------------------










