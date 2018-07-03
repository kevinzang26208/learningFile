var oUl = document.querySelector('.game-core ul');
var gameFood,gameSnake,timer;

function init() {
	var arrNumber = [35,20];
	var oLi_W = oUl.offsetWidth / arrNumber[0],
		oLi_H = oUl.offsetHeight / arrNumber[1];
	var oLi = document.querySelector('.menu ul').children;
	window.snakeArr = [];
	window.score = 0;

	if (oLi_H < 20 || oLi_W <20 || Math.abs(oLi_W - oLi_H) > 10) {
		alert('初始化失败');
		return false
	}
	oLi[localStorage.bit?localStorage.bit:2].classList.add('active');
	window.dataPage = {
		eleNum : arrNumber,
		boolean_x : true,
		Boolean_y : true,

	};
	renderPage(dataPage);
	createItem(dataPage);
	bindEvent();
}
init();

function renderPage(data) {
	var oLiDom = '';
	var oUl = document.querySelector('.game-core ul');
	for (var i = 0;i < data.eleNum[0];i++) {
		for (var j = 0;j < data.eleNum[1];j++) {
			oLiDom += '<li></li>';
		}
	}
	oUl.innerHTML = oLiDom;
	document.querySelector('.menu .score span').innerHTML = 0;
}

function createItem(data) {
	var arrLi = oUl.children;
	gameSnake = Math.floor(Math.random() * (data.eleNum[0] * data.eleNum[1]));
	gameFood = Math.floor(Math.random() * (data.eleNum[0] * data.eleNum[1]));
	while (gameSnake === gameFood) {
		gameFood = Math.floor(Math.random() * (data.eleNum[0] * data.eleNum[1]));
	}
	snakeArr[0] = gameSnake;
	arrLi[snakeArr[0]].classList.add('head');
	arrLi[gameFood].classList.add('food');
}

function memorySpeed(speed,bit) {
	if (speed) {
		localStorage.speed = speed;
		localStorage.bit= bit;
	} else {
		return localStorage.speed;
	}
}

function bindEvent() {
	var restartBtn = document.getElementsByClassName('restart')[0],
		oul = document.querySelector('.menu ul');
	document.onkeydown = function (ev) {
		var e = ev || window.event,
			speed = memorySpeed()?memorySpeed():250;
		switch (e.keyCode) {
			case 37:
				if (dataPage.boolean_x) {
					clearInterval(timer);
					timer = setInterval(function () {
					move(-1);
					},speed);
					dataPage.boolean_x = false;
					dataPage.Boolean_y = true;
				}
				break;
			case 38:
				if (dataPage.Boolean_y) {
					clearInterval(timer);
					timer = setInterval(function () {
					move(-35);
					},speed);
					dataPage.boolean_x = true;
					dataPage.Boolean_y = false;
				}
				break;
			case 39:
				if (dataPage.boolean_x) {
					clearInterval(timer);
					timer = setInterval(function () {
					move(1);
					},speed);
					dataPage.boolean_x = false;
					dataPage.Boolean_y = true;
				}
				break;
			case 40:
				if (dataPage.Boolean_y) {
					clearInterval(timer);
					timer = setInterval(function () {
					move(35);
					},speed);
					dataPage.boolean_x = true;
					dataPage.Boolean_y = false;
				}
				break;
		}
	};
	restartBtn.onclick = function () {
		clearInterval(timer);
		init();
	};
	oul.onclick = function (e) {
		if (dataPage.boolean_x && dataPage.Boolean_y) {
			if (e.target.dataset.speed === 'fast') {
				memorySpeed(200,1);
			} else if (e.target.dataset.speed === 'normal') {
				memorySpeed(300,2);
			} else {
				memorySpeed(400,3);
			}
			document.querySelector('.menu .active').classList.remove('active');
			e.target.classList.add('active')
		}

	}
}

function move(step) {
	var nextSnakeIndex = step + snakeArr[0];
	var oLi = oUl.children;
	/*失败判断*/
	console.log(oLi[nextSnakeIndex])
	if (!(oLi[nextSnakeIndex]) || step === -1 && nextSnakeIndex % 35 === 34 || step === 1 && nextSnakeIndex % 35 === 0 || oLi[nextSnakeIndex].classList.contains('snake') ) {
		console.log('error');
		clearInterval(timer);
		alert('您失败了！');
		document.onkeydown = false;
		return false;
	}
	oLi[nextSnakeIndex].classList.add('snake');
	snakeArr.unshift(nextSnakeIndex);
	[...oLi].forEach(function (ele) {
		ele.classList.remove('head')
	});

	if (nextSnakeIndex === gameFood) {
		/*蛇遇上食物*/
		oLi[gameFood].classList.remove('food');
		oLi[snakeArr[0]].classList.add('head');
		/*重新生成食物*/
		var reFoodFlag = reFood();
		while (!reFoodFlag) {
			reFoodFlag = reFood();
		}
		document.querySelector('.menu .score span').innerHTML = ++score;
	} else {
		/*蛇没有遇上食物*/
		var lastBit = snakeArr[snakeArr.length - 1];
		oLi[lastBit].classList.remove('snake');
		snakeArr.pop();
		oLi[snakeArr[0]].classList.add('head');

	}

	function reFood() {
		gameFood = Math.floor(Math.random() * (dataPage.eleNum[0] * dataPage.eleNum[1]));
		var flag = snakeArr.every(function (ele) {
			return ele !== gameFood
		});
		if (flag) {
			oLi[gameFood].classList.add('food');
		}
		return flag;
	}

}