"use strict";!function(n,t){function e(n){this.index=index,this.len=n}e.prototype={prev:function(){return this.getIndex(-1)},next:function(){return this.getIndex(1)},getIndex:function(n){var t=this.index,e=this.len;return this.index=(t+e+n)%e,this.index}},t.controlManger=e}(window.Zepto,window.player||(window.player={}));