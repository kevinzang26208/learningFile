var bigCir = {}

bigCir.flag = true

require(['bigCir'],function (oData) {
	var $indexWra = $('.big-cir-index');

	$('.big-cir-left-btn').on('click',function () {
		oData.slideMove('left-move');
	});
	$('.big-cir-right-btn').on('click',function () {
		oData.slideMove('right-move');
		console.log(1)
	});
	$indexWra.on("click",function (e) {
		var index = $(this).children().index(e.target);
		oData.slideMove(index);
	});
	window.bigCir.timer = setTimeout(slideMove,2500);
});
