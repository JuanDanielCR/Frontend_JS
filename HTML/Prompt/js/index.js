
var a = document.getElementById("cadena");
var b = document.getElementById("numero");
var cadena_container = document.getElementById("cadena_container");
var numero_container =  document.getElementById("numero_container");

a.addEventListener("click",function(){
  cadena = prompt("Ingresa una cadena: ","ana");
  var mensaje_final = "Mayusculas: " + cadena.toUpperCase() + " | Minuscula: " + cadena.toLowerCase()
  var is_pal = palindromo(cadena)
  if(is_pal){ mensaje_final += " | Es palindromo" }else{ mensaje_final += " | No es palindromo"}
  mensaje_final += " | Sin vocales: "+quit_vocales(cadena);
  cadena_container.innerHTML = mensaje_final;
});
b.addEventListener("click", function(){
  numero = prompt("Número: ","666");
});

function palindromo(cadena){
  var is_pal = true;
  stack = []
  for(var i=0; i < cadena.length; i++){
    stack.push(cadena[i]);
  }
  for(var i=0; i < cadena.length; i++){
    if(cadena[i] != stack.pop()){
      is_pal = false;
      break;
    }
  }
  return is_pal
}
function quit_vocales(cadena){
  var cadena_vocales = "";
  for(var i = 0; i < cadena.length; i++){
    var char = cadena[i];
    if(char == 'a' || char=='e'|| char=='i'||char=='o'||char=='u'){
      continue
    }else{
      cadena_vocales += cadena[i]
    }
  }
  return cadena_vocales;
}
