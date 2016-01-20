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

	/*Objeto JSON para un horario*/
	var horario = [];
	crearHorario();

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
		var celda=horario[id];
		celda.ocupada=true;
		celda.materias.push({
			"nombre":name,
			"profesor":prof,
			"puntuacion":punt
		});
	}

	function borrarMateria(name,prof){

	}

	agregarMateria(9,"Algebra","Neumann",10);
	agregarMateria(9,"IES","Adriana",6);
	
	var celda_vista=horario[9];
	console.log(celda_vista);

})();