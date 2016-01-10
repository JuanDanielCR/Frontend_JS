$(document).ready(function(){
/*Slider*/
	var fotos;
	for(i=1;i<5;i++){
		var name=''+i;
		fotos+="<li><center><img src=images/"+name+".png width='200'/></center></li>";
	}
	
	$('.bxslider').html(fotos);
	$('.bxslider').bxSlider({
	  auto: true,
	  autoControls: true
	});
/*Scroll*/
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 1200, 'swing', function () {
            window.location.hash = target;
        });
    });
/*Menu agrega clases*/
	var items_menu=$('.menu').find('li');
	items_menu.on('click',function(){
		items_menu.removeClass("active");
		$( this ).toggleClass( "active" );
		$("window").scrollTop($("*:contains('Mexico'):eq(n)").offset().top);
	});

});