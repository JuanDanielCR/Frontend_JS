
var a = document.getElementById("cadena");
var b = document.getElementById("numero");

var cadena_container = document.getElementById("cadena_container");
var numero_container =  document.getElementById("numero_container");

a.addEventListener("click",function(){
  cadena = prompt("Ingresa una cadena: ","ana");
  cadena_container.innerHTML = analizarCadena(cadena);
});
b.addEventListener("click", function(){
  numero = prompt("Número: ","11");
  numero_container.innerHTML = analizarNumero(numero);
});
