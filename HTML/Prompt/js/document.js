var doc_cadena = document.getElementById("cadena_doc");
var doc_numero = document.getElementById("numero_doc");

doc_cadena.addEventListener("click", function(){
  cadena = prompt("Ingresa una cadena","document.write");
  document.write(analizarCadena(cadena));
});
doc_numero.addEventListener("click", function(){
  numero = prompt("Numero","10")
  document.write(analizarNumero(numero))
})
