(function (a,b) {
    b(a);
}(window,function () {
    window.jQuery = window.$ = jQuery;
    function jQuery(str) {
        return new jQuery.prototype.init(str);
    }
    jQuery.prototype = {
        init : function () {

        }

    };
    jQuery.fn.extend({
        is : function () {

        }
    })
})());