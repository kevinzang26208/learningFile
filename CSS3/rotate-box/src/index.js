var oLi = document.getElementsByTagName('li');
for (var i = 0,len = oLi.length;i < len; i++){
	oLi[i].addEventListener('mouseenter',function (e) {
		addClass(this,e,'in');
	});
	oLi[i].addEventListener('mouseleave',function (e) {
		addClass(this,e,'out');
	})
}
function addClass(event,e,state) {
	var dResult = getDirection(event,e),
		oClass = state;
	switch (dResult){
		case 0:
			oClass = state + '-top';
			break;
		case  1:
			oClass = state + '-right';
			break;
		case 2:
			oClass = state + '-bottom';
			break;
		case 3:
			oClass  = state + '-left';
	}
	event.className = oClass;
}
function getDirection(event,e) {
	var X = e.offsetX - event.offsetWidth/2,
		Y = e.offsetY - event.offsetHeight/2;

	return d = (Math.round(((Math.atan2(Y, X) * (180 / Math.PI)) + 180)/ 90) + 3) % 4;
	/*根据反正切函数，判断角度，再换算成弧度，再换算成正负2以内，结果是左侧进入是（1.5 ~ 2）与（-1.5 ~ -2）之间，再除三余四，
	* 得到上进入，d = 0，得到右进入，d = 1，得到下进入，d = 2，得到左进入，d = 3*/
}