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

  var API_WEATHER_KEY = "9df27d9983af4c07e0d437b769b4d6fe";
  var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_WEATHER_KEY + "&";

  function f_success(position){
    var lati = position.coords.latitude;
    var longi = position.coords.longitude;
    console.log("lat: "+lati+"long: "+longi);
      /*
    AJAX

    $.getJSON(API_WEATHER_URL + "lat=" + lati + "&lon=" + longi, getCurrentWeather);
    function getCurrentWeather(data){
    console.log(data);

  }  */
  $.ajax({
    url:API_WEATHER_URL + "lat=" + lati + "&lon=" + longi,
    success: function(data){
      console.log(data);
    }
  });
  }//geolocation

})();
