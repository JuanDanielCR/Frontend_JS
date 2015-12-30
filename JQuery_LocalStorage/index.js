$(document).ready(function(){

  var container= $("#app-body").find('.tv-shows');

  
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
LOCAL STORAGE
Medio de almacenamiento del lado de cliente de hasta 5MB, el cual guarda pares de llave:valor con strings

En este ejemplo guardarameos la informacion de los shows en un localstorage para no realizar un ajax para pedir siempre lo mismo.

Metodos
JSON.stringify(json).- transforma un JSON en string
JSON.parse(string).- Transforma un string en JSON

*/
if(!localStorage.shows){
    $.ajax({
      url:"http://api.tvmaze.com/shows",
      success:function(data,textStatus,xhr){

        container.find('.effect').slideUp(1000,function(){
          container.find('.effect').remove();
        })

        localStorage.shows=JSON.stringify(data);
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
}else{
   container.find('.effect').slideUp(1000,function(){
          container.find('.effect').remove();
        })
          data=JSON.parse(localStorage.shows);
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
