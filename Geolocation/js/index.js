/*Funcion autoejecutable o closure, se ejecuta en cuanto se carga el archivo*/
(function(){
  /*
  GEOLOCALIZACION con VanillaJS

  navigator: Objeto del BOM
  .geolocation: funcion del objeto navigator
  
  1. Validar que nuestro navegador soporte al objeto navigator

  */

  if(navigator.geolocation){
    /*
      2.Al objeto navigator aplicar la function geolocation y aplicarle otro metodo que es getCurrentPosition
      el cual recibe un callback para success y otro para error.
    */
    navigator.geolocation.getCurrentPosition(f_success,f_error);
  }else{
    alert("Actualiza tu navegador");
  }

  function f_error(error){
    alert("Error de tipo: "+error);
    /*
    Errores:
    0-Desconocido
    1-Acceso denegado
    2-Posicion no disponible
    3-Tiemout
    */
  }

  function f_success(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    alert("Lat: "+lat+" Long: "+lon);
  }

  /*
    AJAX
  */
})();
