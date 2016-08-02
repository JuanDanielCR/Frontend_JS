var Persona = (function(){
	//private variables and methods
	var mensaje_privado = "Shhhh soy privado"
	var funcion_privada = function(){
		console.log(mensaje_privado);
	}
	var nombre = "Juan Daniel";
	var edad;
	//public variables are returned in here, in an Object format
	return {
		tipo: "Soy variable publica de la clase persona",
		apellido: "Castillo Reyes",
		nombre_completo: function(){
			alert(nombre + " " + this.apellido)
		},
		set_edad: function(age){
			edad = age
		},
		set_nombre: function(name){
			nombre = name;
		}
	}
})();