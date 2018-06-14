function byId(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}

var pics=byId("list").getElementsByTagName("div"),
    len=pics.length,
    index=0,
    timer=null,
    dots=byId("cir").getElementsByTagName("span"),
    d=Number,
    i=Number
/*启动轮播函数*/
function startAutoPlay(){
	timer=setInterval(playPicture,2000);
}
function playPicture(){
		index++;
		if(index===3){
			index=0;
		}
		changeImg();
}
function changeImg(){
	for(i=0;i<len;i++){
			if(i===3){
				i=0;
			}
			pics[i].style.display="none";
			dots[i].className="";
		}
		pics[index].style.display="block";
		dots[index].className="cir-active";
}
byId("main").onmouseout=startAutoPlay;
byId("main").onmouseout();
/*停止轮播函数*/
function stopAutoPlay(){
	if(timer)clearInterval(timer);
	// console.log(timer);
}
byId("main").onmouseover=stopAutoPlay;
/*小圆点*/
function clickChange(){
	index=this.id;
	changeImg();
}
for(d=0;d<len;d++){
	dots[d].id=d;
	dots[d].onclick=clickChange;
}
byId("buttonLeft").onclick=function(){
	index--;
	if(index<0){
		index=len-1;
	}
	changeImg();
};
byId("buttonRight").onclick=playPicture;
/*菜单*/
var slideSubBox = byId('slideBox').getElementsByTagName('div');
var menuBox = document.getElementsByClassName('menuBox');
var menu = document.getElementById('menu');
console.log(slideSubBox);
console.log(menuBox);
function menuFuc() {
    for(var i = 0;i < menuBox.length;i++){
        (function (p) {
            // 进入主菜单时的效果
            menuBox[i].onmouseover = function () {
                for(var j = 0;j < slideSubBox.length;j++){
                    slideSubBox[j].style.display = 'none';
                    menuBox[j].style.background = 'none';
                }
                slideSubBox[p].style.display = 'block';
                this.style.background = 'rgba(0,0,0,0.1)';
            };
            // 离开滑块子菜单的显示效果
            slideSubBox[i].onmouseleave = function () {
                for(j = 0;j <slideSubBox.length;j++){
                    slideSubBox[j].style.display = 'none';
                    console.log('1')
                }
            };
            // 进入子菜单的显示效果，同时避免离开主菜单进入子菜单时，子菜单消失
            slideSubBox[i].onmouseover = function () {
                this.style.display = 'block';
            };
        }(i));
	}
	// 离开子菜单时在子菜单消失
    menu.onmouseleave = function () {
        for(var j = 0;j < slideSubBox.length;j++){
            slideSubBox[j].style.display = 'none';
        }
    }
}
menuFuc()