$(document).ready(function(){

  var container= $("#app-body").find('.tv-shows');

  $("#app-body")
  .find("form")
  .submit(function(event){
    event.preventDefault();

    var cadena_busqueda=$(this).find("input").val();

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

         container.append($(template_bind));
          })
      }
    })
  })

  var template = '<article class="tv-show">' +
          '<div class="left img-container">' +
            '<img src=":img:" alt=":img_alt:">' +
          '</div>' +
          '<div class="right info">' +
            '<h1>:name:</h1>' +
            '<p>:summary:</p>' +
          '</div>' +
        '</article>';
/*
PROMISES EN JQUERY

Resuelven el problema del callbakc hell, que consiste en generar muchos callbacks cada que quiero usar un valor resultado de una funcion
en otra accion.

Ej. Un ajax que denpende del resultado de otro ajax anterior, y asi sucesivemente, esto generaría algo asi:
  $.ajax({
    $.ajax({
      $.ajax({
  
      })
    })
  })

  De esta manera las promises permiten un desarrollo vertical de el código.
  Un Promise tiene 3 estados:
  -Pendiente
  -Finalizado
  -Error

  then().- Metodo que permite encandenar distintos llamados uno debajo del otro.
*/
    $.ajax({
      url:"http://api.tvmaze.com/shows",
      success:function(data,textStatus,xhr){

        container.find('.effect').slideUp(1000,function(){
          container.find('.effect').remove();
        })

        data.forEach(function(item){

          var template_bind =
          template.replace(":name:",item.name)
                  .replace(":summary:",item.summary)
                  .replace(":img:",item.image.medium)
                  .replace(":img_alt:", item.name+" Logo")

         container.append($(template_bind));
        })
      }
    })
})
