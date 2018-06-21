"use strict";var songListData,controlManager,frameId,songAllTime,curTime,$scope=$(document.body),root=window.player,audio=new root.audioManager,index=0;function bindEventControl(){$scope.on("play:change",function(n,o){cancelAnimationFrame(frameId),audio.setAudioSource(songListData[o].audio),root.process.renderAllTime(songListData[o].duration),root.render.renderSingle(songListData[o]),root.process.init(audio)}),$scope.on("click",".btn-prev",function(){var n=controlManager.prev();$scope.trigger("play:change",n)}),$scope.on("click",".btn-next",function(){var n=controlManager.next();$scope.trigger("play:change",n)}),$scope.on("click",".btn-play",function(){"play"===audio.status?(audio.pause(),audio.status="pause"):(audio.play(),audio.status="play"),$(this).toggleClass("playing")})}function bindEventProSlide(){var n=$(".pro-wrapper"),a=n.offset().width,t=n.offset().left;$(".slide-point").on("touchstart",function(){audio.pause(),$(".btn-play").removeClass("playing"),cancelAnimationFrame(frameId)}).on("touchmove",function(n){var o=(n.changedTouches[0].clientX-t)/a;1<o?o=.98:o<0&&(o=0),curTime=o*songAllTime,root.process.upDataPage(curTime,o)}).on("touchend",function(){audio.jumpPlayTo(curTime),$(".btn-play").addClass("playing"),root.process.init(audio)})}function bindEventSongList(){var a=$(".song-list");a.on("click","li",function(n){var o=$(this).index();$scope.trigger("play:change",o),controlManager.index=o,audio.play(),$(".btn-play").addClass("playing"),a.addClass("list-down")}),$(".btn-list").on("click",function(){a.removeClass("list-down")}),a.on("click",function(n){n.target===$(".song-list")[0]&&a.addClass("list-down")})}function getData(){$.ajax({method:"GET",url:"../mock/data.json",success:function(n){console.log(n),songListData=n,root.render.renderSingle(n[0]),root.render.renderSongList(n),bindEventControl(),bindEventProSlide(),bindEventSongList(),controlManager=new root.controlManger(n.length),$scope.trigger("play:change",0)}})}getData();