$(document).ready(function(){

  var container= $("#app-body").find('.tv-shows');

  $("#app-body")
  .find("form")
  .submit(function(event){
    event.preventDefault();

    var cadena_busqueda=$(this).find("input").val();
    /*
      AJAX

      url:"string"
      data:"{llave:valor}" data a enviar para buscar
      success: function(data, textStatus, xhr) callback que se ejecuta cuando no llega un respuesta correcta
    */
    $.ajax({
      url:"http://api.tvmaze.com/search/shows",
      data:{q:cadena_busqueda},
      success:function(data,textStatus,xhr){

          $('.tv-show').remove();
          data.forEach(function(item){
          var template_bind =
          template.replace(":name:",item.show.name)
                  .replace(":summary:",item.show.summary)
                  .replace(":img:",item.show.image.medium)
                  .replace(":img_alt:", item.show.name+" Logo")

         container.append($(template_bind).fadeIn(1500));
          })
      }
    })
  })

  /*
    String_Templates
    :name:
    Me sirven para despues reemplazarso por lo valores de JSON Object

  */
  var template = '<article class="tv-show">' +
          '<div class="left img-container">' +
            '<img src=":img:" alt=":img_alt:">' +
          '</div>' +
          '<div class="right info">' +
            '<h1>:name:</h1>' +
            '<p>:summary:</p>' +
            '<button class="like"> + </button>'+
          '</div>' +
        '</article>';
  /*
    AJAX como $ es un funcion esta puede recibir funciones como ajax()
    La funcion ajax(url,setting)
    url = string
    settings = objeto {clave:valor}

    Ejemplo:
      $.ajax("http://api.tvmaze.com/shows",{:value})
      También puedo poner la url como parametro del objeto
  */
    $.ajax({
      url:"http://api.tvmaze.com/shows",
      success:function(data,textStatus,xhr){

        container.find('.effect').slideUp(800,function(){
          container.find('.effect').remove();
        })
       

        //data es un array de JSON Objects, usar .forEach()
        data.forEach(function(item){
          /*
            MANIPULAR JSON
            item.value : Paraa acceder al valor de una llave en JSON usar el nombre del objeto punto y el nombre de la clave
            var a = objeto.clave
            a - guarda el valor de la clave
          */

          //Uso del metodo replace() que actua sobre Strings

          var template_bind =
          template.replace(":name:",item.name)
                  .replace(":summary:",item.summary)
                  .replace(":img:",item.image.medium)
                  .replace(":img_alt:", item.name+" Logo")

         container.append($(template_bind).fadeIn(1900));
        })
      }
    })
})
