/*构造新对象，原型上绑定方法，计算当前索引位*/
define(function () {
	var $slideWra = $('.cro-roll-wrapper'),
	len = $slideWra.children().length - 1;
	function controlIndex(index=0) {
		this.index = index;
	}
	controlIndex.prototype.getIndex = function (val) {
		return (this.index + len + val) % len;
	};
	controlIndex.prototype.prev = function () {
		return this.getIndex(-1);
	};
	controlIndex.prototype.next = function () {
		return this.getIndex(1);
	};
	return controlIndex;
});