(function ($,root) {
	/*改变当前播放歌曲索引模块*/
	function controlManager(len) {
		this.index = index;/*始终控制着本次获取的数据，播放时的index索引*/
		this.len = len;
	}
	controlManager.prototype ={
		prev:function () {
			return this.getIndex(-1)
		},
		next:function () {
			return this.getIndex(1)
		},
		/*根据形参val修改该对象的index*/
		getIndex:function (val) {
			var index = this.index;
			var len = this.len;
			this.index = (index + len + val) % len;
			return this.index
		}
	};
	root.controlManger = controlManager;
}(window.Zepto,window.player || (window.player = {})));