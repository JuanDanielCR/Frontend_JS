(function() {
	var resultSet = {
		r1: {nombre:'Tecnologías Web', fotos: 5, area: 'ESCOM | IPN', fecha: '9 Apr', autor: 'Juan Castillo', image: 'img/authors/1.png' },
		r2: {nombre:'Sistemas Operativos',fotos: 3,area: 'ESCOM | IPN',fecha: '10 Mar',autor: 'Said NM',image: 'img/authors/2.png'},
		r3: {nombre:'Redes',fotos: 2,area: 'ESCOM | IPN',fecha: '14 Feb',autor: 'Juan Castillo',image: 'img/authors/3.png'},
		r4: {nombre:'Packs',fotos: 20,area: 'ESCOM | IPN',fecha: '12 Nov',autor: 'El lluvias',image: 'img/authors/4.png'}			
	}
	var fotos = {
		f1:{titulo: 'Cookies',nota: 'Soy una galleta en tu navegador',image: 'img/pics/1.jpg',area: 'Tecnologías Web',fecha: '14 Feb'},
		f2:{titulo: 'Cookies',nota: 'Soy una galleta en tu navegador',image: 'img/pics/2.jpg',area: 'Tecnologías Web',fecha: '14 Feb'},
		f3:{titulo: 'Cookies',nota: 'Soy una galleta en tu navegador',image: 'img/pics/3.jpg',area: 'Tecnologías Web',fecha: '14 Feb'}
	}
//Acceso al DOM
//btnMenus
var btnFotos = document.getElementById("btnFotos");
var btnCarpetas = document.getElementById("btnCarpetas");
//Secciones
var menu = document.getElementById("activeMenu");
var galeriaCarpetas = document.getElementById("carpetasContainer");
var galeriaFotos = document.getElementById("fotosContainer");

//Mostrar Carpetas
var carpetas = "<a class='grid__item' href='#'>"+
					"<h2 class='title title--preview'>{nombre}</h2>"+
					"<div class='loader'></div>"+
					"<span class='category'>{area}</span>"+
					"<div class='meta meta--preview'>"+
						"<img class='meta__avatar' src='{image}' /> "+
						"<span class='meta__date'><i class='fa fa-calendar-o'></i> {fecha}</span>"+
						"<span class='meta__reading-time'><i class='fa fa-clock-o'></i> {fotos} fotos</span>"+
					"</div>"+
				"</a>";
galeriaCarpetas.innerHTML = fillTemplate(resultSet, carpetas); 
//Mostrar fotos
var fotos = "<article class='content__item'>"+
				"<span class='category category--full'>{area}</span>"+
				"<h2 class='title title--full'>{nombre}</h2>"+
				"<div class='meta meta--full'>"+
					"<img class='meta__avatar' src='{image}' alt='author01' />"+
					"<span class='meta__author'>{autor}</span>"+
					"<span class='meta__date'><i class='fa fa-calendar-o'></i>{fecha}</span>"+
					"<span class='meta__reading-time'><i class='fa fa-clock-o'></i>{fotos} fotos</span>"+
				"</div>"+
				"<div class='web_container'>"+
					"<div class='photoContainer' id='photo1'>"+
						"<p class='photoTitle'><span>Título:</span> Cookies</p>"+
						"<img src='img/pics/2.png' alt='>"+
						"<p class='photoNote'>Nota: Esta es una nota</p>"+
						"<p class='photoDate'>Fecha: 10 Abr 2017</p>"+
					"</div>"+"<div class='photoContainer' id='photo1'>"+
						"<p class='photoTitle'><span>Título:</span> Cookies</p>"+
						"<img src='img/pics/2.png' alt='>"+
						"<p class='photoNote'>Nota: Esta es una nota</p>"+
						"<p class='photoDate'>Fecha: 10 Abr 2017</p>"+
					"</div>"+"<div class='photoContainer' id='photo1'>"+
						"<p class='photoTitle'><span>Título:</span> Cookies</p>"+
						"<img src='img/pics/2.png' alt='>"+
						"<p class='photoNote'>Nota: Esta es una nota</p>"+
						"<p class='photoDate'>Fecha: 10 Abr 2017</p>"+
					"</div>"+
				"</div>"+
			"</article>"+"<button class='close-button'><i class='fa fa-close'></i><span>Close</span></button>";
galeriaFotos.innerHTML = fillTemplate(resultSet,fotos);
//Menu Lateral
var formularioFotos = "<div class='related'>"+
					"<form action='index.html' class='theForm'>"+
						"<h4>Título: <input id='txtTitulo' type='text'></h4>"+
						"<h4>Sección: <select name='' id='sltCarpeta'>"+
							"{options}"+
						"</select></h4>"+
							"<input type='file'  id='flFoto' data-multiple-caption='{count} archivos'  accept='image/*' multiple required/>"+
							"<h4>Notas: </h4>"+
						"<textarea name=' id=' cols='25' rows='5' id='txtNota'></textarea>"+
						"<input type='submit' value='Subir' id='formFotos'>"+
					"</form>"+
				"</div>";
var optionsCarpeta = ""
var count = 1;
for (var property in resultSet) {
	if (resultSet.hasOwnProperty(property)) {
		var obj =  resultSet[property];
	    	for(var i in obj){
	    		if(i.toString() == "nombre"){
	    			optionsCarpeta += "<option value='"+count+"'>"+obj[i]+"</option>";
	    		}
	    	}
	}
	count++;
}
formularioFotos = formularioFotos.replace("{options}",optionsCarpeta);

var formularioCarpetas = "<div class='related'>"+
					"<form action='index.html' class='theForm'>"+
						"<h4>Nombre:</h4>"+
						 "<input type='text'>"+
						"<h4>Área:</h4>"+
						 "<input type='text' >"+
						"<h4>Imágen:</h4>"+
						"<input type='file' id='file-1' data-multiple-caption='{count} archivos'  accept='image/*' multiple required/>"+
							"<br>"+
						"<input type='submit' value='Crear'>"+
					"</form>"+
					"</div>";
//Change lateral menu
menu.innerHTML = formularioFotos;
btnFotos.addEventListener("click",function(e){
	e.preventDefault();
	changeForm(menu,formularioFotos);
});
btnCarpetas.addEventListener("click",function(e){
	e.preventDefault();
	changeForm(menu,formularioCarpetas);
});
//Alta fotos
var formFotos = document.getElementById("formFotos");
formFotos.addEventListener("click", function(){
	var foto = {};
	foto[titulo] = document.getElementById("txtTitulo").value;
})
//Mostrando imagen






function fillTemplate(object, template){
	var totalCarpetas = '';
	for (var property in object) {
	    if (object.hasOwnProperty(property)) {
	    	//llenando el encabezado
	    	var carpetas = template;
	    	var obj =  object[property];
	    	for(var i in obj){
	    		var aux = "{"+i+"}";
	    		carpetas = carpetas.replace(aux,obj[i]);
	    	}
	    	//consulta para ver las imagenes

	    	//concatenando
	    	totalCarpetas += carpetas;
	    }
	}
	return totalCarpetas;
}
function changeForm(menu, template){
	console.log("ouch");
	menu.innerHTML = template;
}
/*
		    	for(var foto in fotos){
	    		if (foto.hasOwnProperty(property)) {
	    			var fotoInd =  fotos[foto];
	    			for(var attr in fotoInd){
			    		var aux = "{"+attr+"}";
			    		//carpetas = carpetas.replace(aux,obj[i]);
			    	}
	    		}
	    	}
*/
})();