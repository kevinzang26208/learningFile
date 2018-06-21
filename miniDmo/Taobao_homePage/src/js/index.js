window.bigCir = {
	index:0,
};

require(['bigCir'],function (a) {
	document.body.onclick = function () {
		a.slideMove('left-move');
	}
});
