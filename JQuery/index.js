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

	//Todos los elementos que sean h1 o h2, recordando que headings sera una ARRAY
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
	var hijos_header = $('h1',header[0]);
	console.log(hijos_header);

	/*
		OBJETOS EN JQUERY
		UN objeto de Jquery tiene metodos y propiedades que nos permiten modificarlos, si es un elemento del DOM por ejemplo.
		-Los objetos pueden recibir concatenamiento de metodos
	*/

	var hijo = $('#app-header h1');
	//Acceso al H1 dentro de app header

	var hijo_optimo = $('#app-header').find('h1');
	console.log(hijo_optimo[0]);

	/*
		BUSQUEDAS ÓPTIMAS Y CONCATENACIÓN

		De manera optima, JQuery llamará a getElementById() y despues irá buscando los h1, si hay varios h1 se guardaran como arreglo.
		Esta manera es una buena forma de ir buscando elementos pues se aprovechan las funciones como getElementById();

		1. Podemos obtener un elemento inicial con un id o una clase para que JQuery use los metosodos tales como getElementByClassName
		2. Usar las funciones de la libreria para realizar busquedas.
		3. También se puede aprovechar el concatenamiento de funciones.

		find('...param...') - encuentra dentro de un elemento del DOM
		filter('...param...') - de todos los elementos anteriores usa los que tengan 'param'
		not('...param...') - de todos los elementos anteriores (que ya traigo) los que no tengan 'param'
		has('...param...')
		first() - el primer elemento del array que tengo.
	*/

	var h2_filtro = $('#app-header').find('h2').filter('.subt');
	h2_filtro.css({
		'text-transform':'uppercase'
	});

	var h2_not = $('#app-header').find('h2').not('.subt');
	h2_not.css({
		'color':'white'
	})

	var h2_first = $('#app-header').has('h2').first();
	console.log(h2_first);

	/*
		JQUERY OBJECT REFRESH
		Cuando se hace una seleccion el JQuery  Object generada tendrá una cantidad fija de elementos del DOM.
		Si el DOM recibe nuevos elementos que cumplan con las condiciones de selección del JqueryObject anterior estas no se agregarán.
		Podemos usar add() para agregar estos nuevo elementos a nuestra seleccion.

		add('...element DOM...')
	*/

	var h2s = $('h2');
	console.log(h2s);
	var h2 = document.createElement('h2');
	var h2s_reload=h2s.add(h2);
	console.log(h2s_reload);
})