(function ($,root) {
	/*渲染页面模块*/

	/*渲染歌曲头像部分*/
	function renderImg(src) {
		var img = new Image();
		img.src = src;/*必须给src属性赋值，否则后面的onload事件无法触发*/
		img.onload = function () {
			var originImg = $scope.find('.img-wrapper img');
			root.blurImg(img,$scope);/*调用高斯模糊部分模块*/
			originImg.attr('src',src)/*非原生DOM属性，直接使用img.src属性没用*/
		}
	}
	/*渲染歌曲信息部分*/
	function renderInfo (data) {
		var str = '<div class="song-name">' + data.song + '</div>' +
					'<div class="singer-name">' + data.singer + '</div>' +
					'<div class="album-name">' + data.album + '</div>';
		$('.song-info').html(str);
	}
	/*渲染是否喜欢该歌曲部分，Ajax中获取数据，通过增删该DOM的类进行渲染*/
	function renderLike (likeFlag) {
		var btnLike = $('.btn-like');
		if (likeFlag) {
			btnLike.addClass('liking')
		} else {
			btnLike.removeClass('liking')
		}
	}
	/*渲染歌曲列表*/
	function renderSongList (data){
		var str = '';
		for (var i = 0;i < data.length;i++){
			str += `<li>
						<span>${data[i].song}</span><span><hr></span><span>${data[i].singer}</span>
					</li>`
		}
		$('.song-list ul').html(str);
	}

	root.render = {
		renderSingle:function (data) {
			renderImg(data.image);
			renderInfo(data);
			renderLike(data.isLike);
		},
		renderSongList:renderSongList
	}



}(window.Zepto,window.player || (window.player = {})));