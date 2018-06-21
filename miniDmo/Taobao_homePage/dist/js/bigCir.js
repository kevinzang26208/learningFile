var $slideWra = $('.cro-roll-wrapper'),
	imgWidth = $slideWra.children().eq(0).innerWidth(),
	len = $slideWra.children().length - 1
console.log(len);

function slideMove(direction) {
	var slideLeft = $slideWra.position().left;
	if ((!direction || direction === 'right-move')){
		if (slideLeft === -imgWidth * len){
			$slideWra.css('left','0');
		}
		bigCir.index++;
		$slideWra.animate({left:$slideWra.position().left - imgWidth},700,'swing',function () {

		})
	} else if (direction === 'left-move') {
		if (slideLeft === 0){
			$slideWra.css('left',-imgWidth * len)
		}
		bigCir.index--
		$slideWra.animate({left:$slideWra.position().left + imgWidth},700,'swing',function () {

		})
	} else if (typeof direction === 'number'&& direction >= 0){

	}
}











define(function () {
	return {
		slideMove:slideMove
	}

});