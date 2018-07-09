/*函数防抖*/
function debounce(fun,time) {
	var startTime = 0;
	return function () {
		var lastTime = Date.now();
		if (lastTime - startTime > time) {
			startTime = new Date().getTime();
			fun();

		}
	}
}
/*函数节流*/
function throttle(fun) {
	var timer = null;
	return function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			fun()
		},500)
	}
}