(function(){
	    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 1200, 'swing', function () {
            window.location.hash = target;
        });
    });

	/*LOGICA*/


	function crearHorario(){
		for(var i=0;i<75;i++){
			horario.push({
				"id_celda":i,
				"ocupada":false,
				"materias":[]
			});
		}
	}

	function agregarMateria(id,name,prof,punt){
		var celda = horario[id];
		celda.ocupada = true;
		celda.materias.push({
			"nombre":name,
			"profesor":prof,
			"puntuacion":punt
		});
	}

	function borrarMateria(id,name,prof){
		var celda = horario[id];
		var array_mapeado = celda.materias.map(function(e) { return e.nombre; });
		var posicion_materia=array_mapeado.indexOf(name);
		//console.log(posicion_materia);
		celda.materias.splice(posicion_materia,1);
		if(celda.materias.length==0){
			celda.ocupada=false;
		}
	}

	function comprobarDisponibilidad(id_celda){
		var disponible = true;
		var celda=horario[id_celda];
		if(celda.materias.length>0){
			disponible=false;
		}
		return disponible;
	}
	/*Objeto JSON para un horario*/
	var horario = [];

	crearHorario();
	var celda_vista=horario[9];
	agregarMateria(9,"Algebra","Neumann",10);
	agregarMateria(10,"Porgra","Juan V",8);
	console.log(celda_vista);
	console.log(comprobarDisponibilidad(10));

})();