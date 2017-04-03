var btnEnviar =  document.getElementById("btnEnviar");
btnEnviar.addEventListener("click",function(event){
  //Obtener cada elemento del formulario
  event.preventDefault();
  var cookie = document.cookie;
  var txtNombre = document.getElementById("txtNombre");
  document.cookie = "nombre = " + txtNombre.value;
  console.log(cookie);
});
