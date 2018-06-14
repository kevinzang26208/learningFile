$('button').one('click',function () {
    var loginString = '<div class="login">\
                <div class="login-mask">\
                </div>\
                <div class="login-wrapper">\
                    <p class="title">\
                        <span>用户名密码登录</span>\
                    </p>\
                    <div class="close">\
                        <a href="#"></a>\
                    </div>\
                    <form action="">\
                        <p>\
                            <input type="text" placeholder="手机/邮箱/用户名">\
                        </p>\
                        <p>\
                            <input type="password" placeholder="密码">\
                        </p>\
                        <P>\
                            <input type="checkbox" name="remember" id="remember">\
                            <label for="remember">下次自动登陆</label>\
                        </P>\
                        <p>\
                            <input type="submit" value="登录">\
                            <a href=""></a>\
                            <a href=""></a>\
                        </p>\
                    </form>\
                </div>\
            </div>';
    var login = $(loginString).appendTo('body');
    // $('div.close').on('click',function () {
    //     console.log(1);
    //     $(login).remove();
    //
    // });

    $('button').click(function () {
        console.log(1);
        $('.login').css('display','block');
    });

    $('div.close').on('click',function () {
        console.log(1);
        $('.login').css('display','none');
        return false;
    });
});

function a() {
    $('button').click(function () {
        console.log(1);
        $('.login').css('display','block');
    });

    $('div.close').on('click',function () {
        console.log(1);
        $('.login').css('display','none')
    });
}
