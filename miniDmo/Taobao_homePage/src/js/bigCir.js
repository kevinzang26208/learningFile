var $slideWra = $('.cro-roll-wrapper'),
	$indexWra = $('.big-cir-index'),
	imgWidth = $slideWra.children().eq(0).innerWidth(),
	len = $slideWra.children().length - 1;

function slideMove(direction) {
	var slideLeft = $slideWra.position().left;
	if (bigCir.flag) {
		clearTimeout(bigCir.timer);
		bigCir.flag = false;
		if ((!direction && direction !== 0) || direction === 'right-move'){
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
			controlIndex.index = direction;
			changIndexActive($indexWra,direction);
			$slideWra.animate({left:-imgWidth * controlIndex.index},'swing',function () {
				window.bigCir.timer = setTimeout(slideMove,2500);
				bigCir.flag = true;
			})
		}
	}

}


(function (root, len){
	 function controlIndex(index=0) {
		 this.index = index;
	 }
	 controlIndex.prototype.getIndex = function (val) {
		 return (this.index + len + val) % len;

	 };
	 controlIndex.prototype.prev = function () {
		 return this.getIndex(-1);
	 };
	 controlIndex.prototype.next = function () {
		 return this.getIndex(1);
	 };
	 root.SetIndex = controlIndex
})(window.bigCir,len);

var controlIndex = new bigCir.SetIndex();

function changIndexActive (ele,index) {
	$(ele).children().removeClass('big-cir-index-active').eq(index).addClass('big-cir-index-active');
}



define(function () {
	return {
		slideMove:slideMove,
		changIndexActive:changIndexActive
	}

});