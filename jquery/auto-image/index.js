var moveImage = {
    $wrapper: $('.wrapper'),
    $slider: $('.slider'),
    len: $('.slider').length,
    flag:true,
    timer:undefined,
    nowIndex: 0,
    lastIndex: undefined,
    init: function () {
        this.createDom();
        this.bindEvent();
        this.autoMove();

    },
    createDom: function () {
        var len = this.$slider.length;
        var str = '';
        if(len > 1){
            str = '<div class="btn">' +
                  '    <span class="btn-left"></span><span class="btn-right"></span>' +
                  '</div>'
        }
        this.$wrapper.append(str);
        str = '';
        for (var i = 0;i < len;i++){
            if(len > 1){
                str += '<li></li><!---->'
            }else{
                str += '<li class="active"></li><!---->'
            }
        }
        str = '<div class="slider-index">\
                   <ul>' + str + '</ul>\
                </div>';
        this.$wrapper.append(str);
        $('.slider-index').find('li:first-child').addClass('active')
    },
    bindEvent: function () {
        var _this = this;
        var fontSize = this.$slider.find($('p')).css('font-size');
        var widthTarget = this.$slider.width()*0.3;
        $('li','.slider-index').add($('.btn-left')).add($('.btn-right')).on('click',function () {
            clearTimeout(_this.timer);
            if ($(this).attr('class') === 'btn-left'){
                _this.tool('left');

            } else if ($(this).attr('class') ==='btn-right'){
                _this.tool('right')
            } else {
              _this.tool($(this).index());
            }
            console.log(_this.nowIndex)
        });
        this.$slider.on('out',function () {
            $(this).fadeOut(700)
                .find($('.img')).animate({width: 0},700).end()
                .find($('p')).animate({fontSize:'20px'},700)
        });
        this.$slider.on('enter',function () {
            $(this).delay(600).fadeIn(700)
                .find($('.img')).delay(600).animate({width: '35%'},700).end()
                .find($('p')).delay(600).animate({fontSize:'22px'},700,function () {
                    _this.flag = true;
                _this.autoMove()
            })
        })
    },
    changeIndex: function (direction) {
        this.lastIndex = this.nowIndex;
        if (direction === 'left' || direction === 'right'){
            if (direction === 'left'){
                this.nowIndex = this.nowIndex === 0 ? this.len -1 : --this.nowIndex;
            } else {

                this.nowIndex = this.nowIndex === this.len - 1 ? 0 : ++ this.nowIndex;
            }
        } else {
           this.nowIndex = direction;
        }
    },
    changeActive: function (index) {
        $('.active','.slider-index').removeClass();
        $('li','.slider-index').eq(index).addClass('active');
    },
    tool: function (direction) {
        if (this.flag){
            this.changeIndex(direction);
            if (this.lastIndex !== this.nowIndex){
                this.flag = false;
                this.changeActive(this.nowIndex);
                this.$slider.eq(this.lastIndex).trigger('out');
                this.$slider.eq(this.nowIndex).trigger('enter');
                this.autoMove();
            }
        }
    },
    autoMove: function () {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.tool('right') ;
        },3500)
    }






















};
moveImage.init();