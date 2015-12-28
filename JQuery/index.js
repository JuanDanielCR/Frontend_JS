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
$(document).ready(function(){
	alert("hola");
})
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