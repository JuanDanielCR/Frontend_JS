$(document).ready(function(){
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
/*Slider*/

	$('.bxslider').bxSlider({
	  auto: true,
	  autoControls: true
	});
});