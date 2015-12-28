//Se ejecuta antes que:
/*
	window.onload=function(){
		alert("Hola");
	}

	$ es una variable que guarda la funcion jQuery(), esta a su vez recibe varios parametros entre ellos esta document.
	Existen diversas formas de iniciar el código js.
	
	$(document).ready(function(){.....})
	$().ready(function(){.............})
	$(function(){.....................})
	jQuery(document).ready(function(){.......})
	Estos cuatro códigos realizan la misma accion
*/

/*
	PROTOTYPE	
	Prototype es un framework escrito en JavaScript que se orienta al desarrollo sencillo y dinámico de aplicaciones web.
	Es una herramienta que implementa las técnicas AJAX y su potencial es aprovechado al máximo cuando se desarrolla con Ruby On Rails.
	Tambien define a $ como una variable.
	Así, para evitar problemas y usar juntos a jQuery con Prototype podemos definir los scopes.

	$.noConflict()
	jQuery(document).ready(function(){...
		Los $ dentro son de jQuery
	...})
	$ //Este $ es de prototype
*/
$(document).ready(function(){

	/*
	SELECTORES:
		Cuando $('') recibe un string busca estos caracteres en el DOM, por lo tanto a este String se le conoce como selector.
		Los selectores de JQUERY son iguales a los selectores css, asi para obtener un hijo,
		en vanillaJS tendría que guardar al padre y luego acceder al hijo pero con jquery solo usaria sintaxis de selector css
		var hijo=$('h1 +h2');

	var hijo; 
	Es un objeto de JQuery, es decir ya no es el elemento del DOM en sí.

	El elemento del DOM con VanillaJS
	var header= document.getElementById('app-header');
	*/

	var header= $('header');
	console.log(header);

	//Todos los elementos que sean h1 o h2
	var headings= $('h1,h2');

	/*
		Ademas de usar selectores de css ppuedo mandar arrays para buscar, pseudoclases y usar contextos
	*/

	/*
		Contextos:
		hijos_header es JQUERY OBJECT que guardara a todos los h1 que esten dentro un contexto header[0], 
		recordar que var header es un objeto de JQuery, por lo tanto si lo quiero usar como contexto de bo poner [0]
		para hacer referencia al objeto de DOM! 
		Así se buscaran a los h1 que esten dentro del header del DOM y no Object Jquery
	*/
	var hijos_header=$('h1',header[0]);
	console.log(hijos_header);
})