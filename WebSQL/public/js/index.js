
	var resultSet = {
		r1: {nombre:'Tecnologías Web', fotos: 5, area: 'ESCOM | IPN', fecha: '9 Apr', autor: 'Juan Castillo', image: 'img/authors/1.png' },
		r2: {nombre:'Sistemas Operativos',fotos: 3,area: 'ESCOM | IPN',fecha: '10 Mar',autor: 'Said NM',image: 'img/authors/2.png'},
		r3: {nombre:'Redes',fotos: 2,area: 'ESCOM | IPN',fecha: '14 Feb',autor: 'Juan Castillo',image: 'img/authors/3.png'},
		r4: {nombre:'Packs',fotos: 20,area: 'ESCOM | IPN',fecha: '12 Nov',autor: 'El lluvias',image: 'img/authors/4.png'}			
	}
	var fotos = {
		f1:{titulo: 'Cookies',nota: 'Soy una galleta en tu navegador',image: 'img/pics/1.jpg',area: 'Tecnologías Web',fecha: '14 Feb'},
		f2:{titulos: 'Cookies',nota: 'Soy una galleta en tu navegador',image: 'img/pics/2.jpg',area: 'Tecnologías Web',fecha: '14 Feb'},
		f3:{titulo: 'Cookies',nota: 'Soy una galleta en tu navegador',image: 'img/pics/3.jpg',area: 'Tecnologías Web',fecha: '14 Feb'}
	}




//Database
var dbfoto = openDatabase('dbSmartGallery','1.0','SmartGallery',5*1024*1024);
/*dbfoto.transaction(function (tx) {
  tx.executeSql('DROP TABLE carpeta');
});
dbfoto.transaction(function (tx) {
  tx.executeSql('DROP TABLE fotos');
});
dbfoto.transaction(function (tx) {
  tx.executeSql('DROP TABLE notas');
});
*/
dbfoto.transaction(function(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS carpeta '+
		' (idcarpeta INTEGER NOT NULL PRIMARY KEY,'+
		'nombre VARCHAR(20) NOT NULL,'+
		'area VARCHAR(20) NOT NULL'+
		')');
	tx.executeSql('CREATE TABLE IF NOT EXISTS fotos'+
		' (idfoto INTEGER NOT NULL PRIMARY KEY,'+
		'titulo VARCHAR(20) NOT NULL,'+
		'idcarpeta INTEGER NOT NULL,'+
		//'foto IMAGE NOT NULL,'+
		'fecha DATE,'+
		'FOREIGN KEY(idcarpeta) REFERENCES carpeta(idcarpeta))');
	tx.executeSql('CREATE TABLE IF NOT EXISTS notas '+
		' (idnota INTEGER NOT NULL PRIMARY KEY,'+
		'comentario VARCHAR(20) NOT NULL,'+
		'idFoto VARCHAR(20) NOT NULL,'+
		'FOREIGN KEY(idFoto) REFERENCES fotos(idfoto))');
},function(error){
	console.log(""+error.message);
});
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
						"<textarea name='' cols='25' rows='5' id='txtNota'></textarea>"+
						"<input type='submit' value='Subir' id='formFotos'>"+
					"</form>"+
				"</div>";

var formularioCarpetas = "<div class='related'>"+
					"<form action='index.html' class='theForm'>"+
						"<h4>Nombre:</h4>"+
						 "<input type='text' id='nomCarpeta'>"+
						"<h4>Área:</h4>"+
						 "<input type='text' id='nomArea'>"+
						"<h4>Imágen:</h4>"+
						"<input type='file' id='file-1' data-multiple-caption='{count} archivos'  accept='image/*' multiple required/>"+
							"<br>"+
						"<input type='submit' value='Crear' id='crear'>"+
					"</form>"+
					"</div>";

dbfoto.transaction(function(tx){
	tx.executeSql('SELECT nombre FROM carpeta;',[],function(tx,results){
			//console.log(seccion);
			var optionsCarpeta = ""
			for (var i = 0; i < results.rows.length; i++){
				console.log(results.rows.item(i).nombre);
            	optionsCarpeta += "<option value='"+(i+1)+"'>"+results.rows.item(i).nombre+"</option>";
        	}
        	formularioFotos = formularioFotos.replace("{options}",optionsCarpeta);
	});
	console.log("sali")
},function(error){},function(){ //success
	//fill menu first time
	menu.innerHTML = formularioFotos;

	//Event Listeners for menu
	btnFotos.addEventListener("click",function(e){
		e.preventDefault();
		changeForm(menu,formularioFotos);
	});

	btnCarpetas.addEventListener("click",function(e){
		e.preventDefault();
		changeForm(menu,formularioCarpetas);
		//Event Listener Carpeta
			var crearCarpeta = document.getElementById("crear");
			crearCarpeta.addEventListener("click",function(e){
				e.preventDefault();
				var nombre = document.getElementById("nomCarpeta").value;
				var area = document.getElementById("nomArea").value;
				//var imagen = document.getElementById("flFoto");
				
				dbfoto.transaction(function(tx) {
					tx.executeSql(('INSERT INTO carpeta(nombre,area) VALUES (?, ?);'),[nombre,area]);
					tx.executeSql('SELECT idcarpeta FROM carpeta;', [],
					function(tx, results){
						var lastid=results.rows.item((results.rows.length)-1).idcarpeta;
						var f=new Date();
						fecha=f.getDate()+"/"+(f.getMonth()+1)+"/"+f.getFullYear();
						tx.executeSql(('INSERT INTO fotos(titulo,idCarpeta,fecha) VALUES("Titulo",?,?)'),[lastid,fecha]);
						console.log(lastid)});
				});
			});
	}); //event listener mostrar menu

	//Event Listeners for Submits
	var crearFotito = document.getElementById("formFotos");
	crearFotito.addEventListener("click",function(e){
		e.preventDefault();
		var area =document.getElementById("sltCarpeta");
		var op = area.selectedIndex;
		var seccion=area.options[op].text;

		dbfoto.transaction(function(tx) {
			var f=new Date();
			fecha=f.getDay()+"/"+(f.getMonth()+1)+"/"+f.getFullYear();
			tx.executeSql('SELECT idcarpeta FROM carpeta WHERE nombre = ?;',[seccion],function(tx,results){
			//console.log(seccion);
			for (var i = 0; i < results.rows.length; i++){
	        	var id = results.rows.item(i).idcarpeta;
	            	tx.executeSql(('INSERT INTO fotos(titulo,idcarpeta,fecha) VALUES (?,?,?);'),[document.getElementById("txtTitulo").value,id,fecha]);
	            	console.log(id);
	            	tx.executeSql('SELECT idfoto FROM fotos;', [],function(tx, results){
					var lastid=results.rows.item((results.rows.length)-1).idfoto;
					tx.executeSql('INSERT INTO notas(comentario,idFoto) VALUES(?,?)',[(document.getElementById("txtNota").value),lastid]);
					});            		
	        	}        	
			});
			},function(error){
				console.log(error.message);
			});
		}); //event listener -- submit foto

	}); //function success fill <select>

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
	menu.innerHTML = template;
}