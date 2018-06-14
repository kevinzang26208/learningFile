(function ($,root) {
	/*歌曲对象处理模块*/
	function audioManager() {
		this.audio = new Audio();
		/*播放状态*/
		this.status = 'pause';
	}
	audioManager.prototype = {
		play : function () {
			this.audio.play();
			this.status = 'play';
		},
		pause : function () {
			this.audio.pause();
			this.status = 'pause';
		},
		/*设置歌曲src*/
		setAudioSource : function (src) {
			this.audio.src = src;
			this.audio.load();/*重新加载歌曲*/
			this.bindEvent();/*歌曲结束时事件绑定*/
			if (this.status === 'play'){
				this.play();
			}
		},
		/*进度条跳跃播放*/
		jumpPlayTo:function (curTime) {
			this.audio.currentTime = curTime;
			this.play();
		},
		/*歌曲结束时事件绑定*/
		bindEvent:function () {
			this.audio.onended = function () {
				$('.btn-next').trigger('click');

			}
		}
	};
	root.audioManager = audioManager;
}(window.Zepto,window.player || (window.player = {})));