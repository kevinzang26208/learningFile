/*主函数入口模块*/
var $scope = $(document.body);
var root = window.player;
var audio = new root.audioManager;
var songListData,controlManager;
var index = 0;
var frameId;
var songAllTime,curTime;
getData();

/*绑定控制类事件，上一首、下一首……*/
function bindEventControl() {
	/*绑定改变歌曲事件，第二个形参为歌曲索引*/
	$scope.on('play:change',function (event,index) {
		cancelAnimationFrame(frameId);/*疑惑的地方，必须取消，否者移动滑块是，滑块不懂，只有触控抬起时才会响应*/
		audio.setAudioSource(songListData[index].audio);
		root.process.renderAllTime(songListData[index].duration);
		root.render.renderSingle(songListData[index]);/*渲染主页面*/
		root.process.init(audio);

	});
	/*上一首*/
	$scope.on('click','.btn-prev',function () {
		var index = controlManager.prev();
		$scope.trigger('play:change',index)
	});
	/*下一首*/
	$scope.on('click','.btn-next',function () {
		var index = controlManager.next();
		$scope.trigger('play:change',index)
	});
	/* 播放/暂停 */
	$scope.on('click','.btn-play',function () {
		if (audio.status === 'play'){
			audio.pause();
			audio.status = 'pause'
		} else {
			audio.play();
			audio.status = 'play'
		}
		$(this).toggleClass('playing');
	})
}

/*绑定进度条事件*/
function bindEventProSlide() {
	var $proWrapper = $('.pro-wrapper');
	var width = $proWrapper.offset().width;
	var left = $proWrapper.offset().left;/*offset()距离客户端的*/

	/*手指摁进度滑块下时*/
	$('.slide-point').on('touchstart',function () {
		audio.pause();
		$('.btn-play').removeClass('playing');
		cancelAnimationFrame(frameId);
	})
		/*移动进度条滑块时*/
		.on('touchmove',function (e) {
		/*判断进度条滑块移动的percent*/
		var eClintX = e.changedTouches[0].clientX;
		var percent = (eClintX - left) / width;
		if (percent > 1){
			percent = 0.98;
		} else if (percent < 0){
			percent = 0;
		}
		curTime = percent * songAllTime;
		root.process.upDataPage(curTime,percent);
	})
		/*手指在进度滑块抬起时*/
		.on('touchend',function () {
		audio.jumpPlayTo(curTime);
		$('.btn-play').addClass('playing');
		root.process.init(audio);/*染歌曲进度条与当前播放时间*/
	})
}

/*绑定歌单事件*/
function bindEventSongList() {
	var $songList = $('.song-list');

	/*切换歌曲列表内歌曲事件，li元素的事件委托*/
	$songList.on('click','li',function (e) {
		var index = $(this).index();
		$scope.trigger('play:change',index);
		controlManager.index = index;/*返回当前歌曲的index*/
		audio.play();
		$('.btn-play').addClass('playing');
		$songList.addClass('list-down');
	});

	/*歌曲列表的弹出和隐藏绑定*/
	$('.btn-list').on('click',function () {
		$songList.removeClass('list-down');
	});
	$songList.on('click',function (e) {
		if (e.target === $('.song-list')[0]){
			$songList.addClass('list-down');
		}

	})
}

/*通过ajax获取数据*/
function getData() {
	$.ajax({
		method:'GET',
		url:'../mock/data.json',
		success:function (data) {
			console.log(data);
			songListData = data;
			root.render.renderSingle(data[0]);
			root.render.renderSongList(data);
			bindEventControl();/*绑定控制类事件，上一首、下一首……*/
			bindEventProSlide();/*绑定进度条事件*/
			bindEventSongList();
			controlManager = new root.controlManger(data.length);
			$scope.trigger('play:change',0);

		}
	})
}
