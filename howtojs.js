/* questo è per catturare il DOM dell'ext.
tutto quello che deve apparire e succedere deve andare qua dentro
*/
document.addEventListener('DOMContentLoaded', function() {
	// stuff
});

/*
per ottenere un elemento del DOM
*/
var elem = document.getElementById("elemID");

/*
addEventListener
*/
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
cambiare valore attributo html
*/
document.getElementById("elementId").setAttribute("attr", "value");


















