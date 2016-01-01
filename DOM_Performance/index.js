$(document).ready(function(){
	var languajes=["Java","Javascript","C","C++","Python","PHP"];
	/*
		Una de las acciones que más perofrmance ocupan dentro de JS es el acceso y manipulacion de DOM
		Algunos consejos:
		1. Usar selectores simples y en caso de tener muchos niveles en el arbol del DOM usar la funcion find().
		2. Al momento de hacer un append
			metodos:
			var str="<li></li>";    str.appendTo("selector");

			var a=$('<li>',{html:"Contenido"});  $("#algo").append(a);

			$('div').html("<li>Se reicbe un String</li>");

		ATTR html: Como hemos visto todo JQuery Object posee un atributo html que consiste en el html que tnedra el DOM element que se accede
		así, tenemos diversas formas de afectarlo.

		De las cuales nos conviene usar el metodo .html() y enviar un string, ya que con el, se accede solo una vez al dom,
		y si se necesitaban hacer varios cambios todos se concatenan en la var string que recibe.

		Con los otros dos metodos si se quierene hacer varios appends tendremos que acceder muchas veces al DOM.
	*/


	/*
		Recorrer un arreglo;
		Al igual que el metodo forEach() para recorrer un arreglo de JSON, tenemos el metodo $.each() para recorrer un arreglo que no sea
		necesariamente JSON.
		$.each(arr,function(index.item){...});
	*/
	var str="";

	$.each(languajes,function(index,item){
		var newListItem = "<li>"+item+"</li>";
		$(newListItem).appendTo('#lenguajes-1');
	});

	$.each(languajes, function(index,item){
		str+="<li>"+item+"</li>";
	});
	$("#lenguajes-2").html(str);
});