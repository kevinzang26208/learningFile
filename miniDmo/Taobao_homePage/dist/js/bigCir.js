/*滑动条运动处理模块*/
define(['SetIndex'],function (SetIndex) {
	var controlIndex = new SetIndex();
	var $slideWra = $('.cro-roll-wrapper'),
		$indexWra = $('.big-cir-index'),
		bigCir = window.bigCir,
		imgWidth = $slideWra.children().eq(0).innerWidth(),
		len = $slideWra.children().length - 1;

	function slideMove(direction) {
		var slideLeft = $slideWra.position().left;
		/*加锁，防止动画变换期间再次执行变换函数*/
		if (bigCir.flag) {
			/*每次变换中取消计时*/
			clearTimeout(bigCir.timer);
			bigCir.flag = false;
			if ((!direction && direction !== 0) || direction === 'right-move'){
				/*右移动*/
				if (slideLeft === -imgWidth * len){
					$slideWra.css('left','0');
				}
				controlIndex.index = controlIndex.next();
				$slideWra.animate({left:$slideWra.position().left - imgWidth},500,'swing',function () {
					window.bigCir.timer = setTimeout(slideMove,2500);
					bigCir.flag = true;
				});
				changIndexActive($indexWra,controlIndex.index);
			} else if (direction === 'left-move') {
				/*左移动*/
				if (slideLeft === 0){
					$slideWra.css('left',-imgWidth * len)
				}
				controlIndex.index = controlIndex.prev();
				$slideWra.animate({left:$slideWra.position().left + imgWidth},500,'swing',function () {
					window.bigCir.timer = setTimeout(slideMove,2500);
					bigCir.flag = true;
				});
				changIndexActive($indexWra,controlIndex.index);
			} else if (typeof direction === 'number'&& direction >= 0){
				/*按索引位移动*/
				controlIndex.index = direction;
				changIndexActive($indexWra,direction);
				$slideWra.animate({left:-imgWidth * controlIndex.index},'swing',function () {
					window.bigCir.timer = setTimeout(slideMove,2500);
					bigCir.flag = true;
				})
			}
		}

	}
	/*改变索引激活类*/
	function changIndexActive (ele,index) {
		$(ele).children().removeClass('big-cir-index-active').eq(index).addClass('big-cir-index-active');
	}
	return {
		slideMove:slideMove,
		changIndexActive:changIndexActive
	}

});