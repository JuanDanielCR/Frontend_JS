var btnUno =  document.getElementById("btnUno");
var btnCinco =  document.getElementById("btnCinco");
var btnBorrar =  document.getElementById("btnMenos");
var btnQuitar = document.getElementById("btnBorrar");
var tableFactorial = document.getElementById("tableFactorial");

btnUno.addEventListener("click", function(event){
	var factorial = calcularNumeroHijos(tableFactorial);
	var hijo = crearHijo(factorial);
	tableFactorial.appendChild(hijo);
});
btnCinco.addEventListener("click", function(event){
	var factorial = calcularNumeroHijos(tableFactorial);
	for(var i = 0; i<5;i++ ){
		var hijo = crearHijo(factorial);
		tableFactorial.appendChild(hijo);
		factorial++;
	}
});
btnBorrar.addEventListener("click", function(event){
	var nodoEliminado = tableFactorial.lastChild;
	tableFactorial.removeChild(nodoEliminado);
});
btnQuitar.addEventListener("click", function(event){
	var factorial = calcularNumeroHijos(tableFactorial);
	for(var i = 0; i<factorial-1;i++ ){
		var nodoEliminado = tableFactorial.lastChild;
		tableFactorial.removeChild(nodoEliminado);
	}
});

function calcularFactorial(factorial){
	var resultado = 1;
	for(var i = 1; i <= factorial;i++){
		resultado = resultado*i;
	}
	return resultado;
}
function calcularNumeroHijos(elemento){
	var factorial = 0;
	if (tableFactorial.hasChildNodes()) {
	  var children = tableFactorial.childNodes;
	  for (var i = 0; i < children.length; i++) {
	  	var hijo = children[i];
	  	if(hijo.nodeType == Node.ELEMENT_NODE){
	  		factorial++;
	  	}
	  }
	}
	return factorial;
}
//Creacion de una unidad hijo <tr><td>Valor</td></tr>
function crearHijo(factorial){
	var fila = document.createElement("tr");
	var colNum  = document.createElement("td");
	var colFactorial = document.createElement("td");
	var txtNum  = document.createTextNode(factorial);
	var txtFactorial = document.createTextNode(calcularFactorial(factorial));
	colNum.appendChild(txtNum);
	colFactorial.appendChild(txtFactorial);
	fila.appendChild(colNum);
	fila.appendChild(colFactorial);
	return fila;
}