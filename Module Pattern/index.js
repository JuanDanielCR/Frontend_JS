var global = "Soy global"
var alumno = Persona;
//Loading the module persona,
console.log(alumno.tipo)
alumno.set_edad(19);
alumno.nombre_completo();


var alumno2 = Persona;
alumno2.set_nombre("Armando");
alumno2.nombre_completo();
alumno2.put_global()