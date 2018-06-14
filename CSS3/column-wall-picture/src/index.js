var $wrapper = $('.wrapper');

var timer = setTimeout(function () {
	$('.item-box .item').removeClass('init');
},120);
$('li').on('click',function () {
	$wrapper.addClass('wrapper-active');
	$(this).addClass('active');
});
$('.close').on('click',function (e) {
	e.stopPropagation();
	$wrapper.removeClass('wrapper-active');
	$('.active').removeClass('active');
});