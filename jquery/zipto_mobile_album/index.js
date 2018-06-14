var data = [
    {url: './images/1.jpg'},
    {url: './images/2.jpg'},
    {url: './images/3.jpg'},
    {url: './images/4.jpg'},
    {url: './images/5.jpg'},
    {url: './images/6.jpg'},
    {url: './images/7.jpg'},
    {url: './images/8.jpg'},
    {url: './images/9.jpg'},
    {url: './images/10.jpg'},
    {url: './images/11.jpg'},
    {url: './images/12.jpg'},
    {url: './images/13.jpg'},
    {url: './images/14.jpg'},
    {url: './images/15.jpg'},
    {url: './images/16.jpg'},
    {url: './images/17.jpg'},
    {url: './images/18.jpg'}
];
var activeIndex;
var clientH_W = document.documentElement.clientHeight/document.documentElement.clientWidth;
function init() {
    createImgLi(data);
    renderPage();
    bindEvent();
    removeImg();
}
function createImgLi(arr) {
    var str = '';
    for (var i = 0;i < arr.length;i++){
        str += '<li><img src=" ' + arr[i].url + '"/></li>';
    }
    $('ul','.wrapper').append(str);
}
function renderPage(){
    var li = $('li','.wrapper');
    li.css({height: li.width() + 'px',lineHeight: li.width() + 'px'});
    li.each(function () {
        var imgDom = this.firstElementChild;
        var img = $(this).find('img');
        imgDom.onload = function () {
            if(img.height() > img.width()){
                img.css({height: '100%',width: 'auto'});
            }
        };
    });
}
function bindEvent(){
    $('ul').on('tap','li',function () {
        activeIndex = $(this).index();
        bigImage(activeIndex)
    })
}
function bigImage(index){
    var img = new Image();
    img.src = data[index].url;
    $('.bigimage-layer').append(img).css({display: 'inline-block'});
    img.onload = function (ev) {
        var W = this.width;/*img标签原生具有width属性，可以通过这个属性获取宽度，img.height也如此*/
        var H = this.height;
        var imgH_W = H/W;
        if (imgH_W > clientH_W){
            $(this).css({height: '100%'}).animate({opacity: 1}, 400)
        }else{
            $(this).css({width: '100%'}).animate({opacity: 1}, 400)
        }
    };
}
function removeImg(){
    $('.bigimage-layer')
        .on('tap',function () {
            $('.bigimage-layer').css({display:'none'}).empty();
        })
        .on('swipeLeft',function () {
            $('.bigimage-layer').empty();
            activeIndex++;
            if (activeIndex > data.length - 1){
                activeIndex = 0
            }
            bigImage(activeIndex);
        })
        .on('swipeRight',function () {
            $('.bigimage-layer').empty();
            activeIndex--;
            if (activeIndex < 0){
                activeIndex = data.length - 1;/*不能用“--”操作符 ，否则相当于改变data.length属性值*/
            }
            bigImage(activeIndex);
        })
}
init();