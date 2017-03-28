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
function quitar_vocales(cadena){
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
function contar_caracteres(cadena){
  caracteres = [0,0,0,0,0]
  for(var i = 0; i < cadena.length; i++){
    if(cadena[i] == 'a'){ caracteres[0]++;
    }else if(cadena[i]=='e'){
      caracteres[1]++;
    }else if(cadena[i]=='i'){
      caracteres[2]++;
    }else if(cadena[i]=='o'){
      caracteres[3]++;
    }else if(cadena[i]=='u'){
      caracteres[4]++;
    }
  }
  return caracteres;
}
function contar_numeros(numero){
  numeros = [0,0,0,0,0,0,0,0,0,0];
  for(var i = 0; i < numero; i++){
    var aux = numero[i]
    numeros[aux]++;
  }
  return numeros
}
function factorial(numero){
  var factorial = 1;
  for(var i = numero; i > 0;i-- ){
    factorial = factorial*i;
  }
  return factorial
}

function analizarCadena(cadena){
  var mensaje_final = "Mayusculas: " + cadena.toUpperCase() + " | Minuscula: " + cadena.toLowerCase()
  var is_pal = palindromo(cadena)
  if(is_pal){ mensaje_final += " | Es palindromo" }else{ mensaje_final += " | No es palindromo"}
  mensaje_final += " | Sin vocales: "+quitar_vocales(cadena)
  caracteres = contar_caracteres(cadena)
  mensaje_final += " | a: "+caracteres[0] + " | e: "+caracteres[1] +" | i: "+caracteres[2]
  +" | o: "+caracteres[3] + " | u: "+caracteres[4]
  return mensaje_final;
}
function analizarNumero(numero){
  var mensaje_final = ""
  var is_pal = palindromo(numero)
    if(is_pal){ mensaje_final += " | Es capicua" }else{ mensaje_final += " | No es capicua"}
  numeros = contar_numeros(numero)
  mensaje_final += " | 0: "+numeros[0] + " | 1: "+numeros[1] +" | 2: "+numeros[2]
  +" | 3: "+numeros[3] + " | 4: "+numeros[4]+" | 5: "+numeros[5] + " | 6: "+numeros[6] +" | 7: "+numeros[7]
  +" | 8: "+numeros[8] + " | 9: "+numeros[9]
  mensaje_final += " | Factorial: "+factorial(numero)
  return mensaje_final
}
