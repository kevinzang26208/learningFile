/*主入口模块*/
var bigCir = {};
bigCir.flag = true;

require(['bigCir'],function (oData) {
	var $indexWra = $('.big-cir-index');

	/*绑定事件*/
	$('.big-cir-left-btn').on('click',function () {
		oData.slideMove('left-move');
	});
	$('.big-cir-right-btn').on('click',function () {
		oData.slideMove('right-move');
	});
	$indexWra.on("click",function (e) {
		var index = $(this).children().index(e.target);
		oData.slideMove(index);
	});
	window.bigCir.timer = setTimeout(oData.slideMove,2500);
});
