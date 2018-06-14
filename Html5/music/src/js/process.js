(function ($,root) {
	/*控制歌曲进度条、页面歌曲时间处理模块*/

	/*时间处理，秒 => 00:00*/
	function timeChange(time) {
		var minute;
		if (time >= 60){
			minute = Math.floor(time / 60);
		} else {
			minute = '00:'
		}
		if (minute < 10){
			minute = '0' + minute + ':';
		}
		var second = Math.round(time % 60);
		if (second < 10){
			second = '0' + second;
		}
		return minute + second
	}

	/*计算歌曲总时长，并渲染在页面*/
	function renderAllTime(duration) {
		var allTime = timeChange(duration);
		$('.all-time').html(allTime)
	}
	/*渲染歌曲播放的当前时间与播放时歌曲进度条变化*/
	function upDataPage(curTime,present) {
		var curTimeStr = timeChange(curTime);
		var proTop = (present - 1) * 100;
		$('.cur-time').html(curTimeStr);
		$('.pro-top').css({
			transform:'translateX(' + proTop + '%)'
		})
	}
	/*渲染歌曲进度条与当前播放时间初始化函数*/
	function init(audio) {
		/*给歌曲绑定ondurationchange事件，以获取歌曲的duration*/
		audio.audio.ondurationchange = function () {
			/*只有在audio对象加载是才会触发该事件，之后便不再触发*/
			songAllTime = audio.audio.duration;
		};
		/*获取歌曲的当前播放时间，*/
		function getSongTime() {
			var curTime = Math.floor(audio.audio.currentTime);
			var present = curTime / songAllTime ;
			/*渲染页面时间和进度条*/
			upDataPage(curTime,present);
			/*注册getSongTime函数到requestAnimationFrame*/
			frameId = window.requestAnimationFrame(getSongTime);
		}
		getSongTime();
		root.process.getSongTime = getSongTime;
	}

	root.process = {
		init: init,
		renderAllTime: renderAllTime,
		upDataPage: upDataPage
	}
})(window.Zepto,window.player);