var timer;
var slideImg = $('.slideImg');
var num = slideImg.children().length - 1;
var imgWidth = slideImg.children().eq(0).innerWidth();
var index = 0;
var lock = true;
$('.btn:eq(1)').on('click', function () {
    autoMove('right-move');
}).prev().on('click',function () {
   autoMove('left-move')
});
$('.sliderIndex').children().each(function () {
    $(this).on('click',function () {
        lock = false;
        clearTimeout(timer);
        index = $(this).index();
        changIndex(index);
        slideImg.animate({left:- index * imgWidth},1500,'swing',function () {
            timer = setTimeout(autoMove(),2000);
            lock = true;
        });
    });
});
function changIndex(index) {
    $('.sliderIndex').children().filter('.active').removeClass('active').end().eq(index).addClass('active')
}
function autoMove(direction) {
    clearTimeout(timer);
    if (lock){
        lock = false;
        if (!direction || direction === 'right-move'){
            if(slideImg.position().left === - num * imgWidth) {
                slideImg.css('left', '0')
            }
            index++;
            changIndex(index);
            slideImg.animate({left:slideImg.position().left - imgWidth},1500,'swing',function () {
                timer = setTimeout(autoMove,2000);
                lock = true
            })
        } else {
            if (slideImg.position().left === 0){
                slideImg.css('left',- num * imgWidth)
            }
            index--;
            changIndex(index);
            slideImg.animate({left:slideImg.position().left + imgWidth},1500,'swing',function () {
                timer = setTimeout(autoMove,2000);
                lock = true
            })
        }
    }
}
timer = setTimeout(autoMove,2000);
// console.log(-num * imgWidth)