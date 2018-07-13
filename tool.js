/*封装的各种方法*/

/*读取CSS样式,返回一个对象*/
function getStyle(ele, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[prop];//IE8及IE8以下不兼容
    } else {
        return ele.currentStyle[prop];
    }
}

/*封装兼容性方法，求滚动轮滚动距离 getScrollOffset()*/
function getscrolloffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,/*IE9.0开始支持该属性*/
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

/*封装兼容性方法，返回浏览器视口尺寸getViewportOffset()*/
/*document.documentElement.scrollHeight该属性为视窗拉直后的高度.*/
function getViewportoffset() {
    if (window.innerHeight) {
        return {
            w: window.innerWidth,/*包含滚动条(宽度/高度)，IE9.0开始支持该属性*/
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight/*clientHeight=padding+height-横向滚动轴高度*/
            }
        }
    }

}

/*事件处理函数的封装,ele为绑定事件对象，type为事件类型，handle事件处理函数*/
/*先捕获，后冒泡，IE没有捕获*/
function addEvent(ele, type, handle) {
    if (ele.addEventListener) {
        ele.addEventListener(type, handle, false/*事件冒泡与捕获的属性，false为冒泡。ture为捕获*/);
        addEvent = (ele, type, handle) => ele.addEventListener(type, handle, false);/* 性能优化,惰性函数 */
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, function () {
            handle.call(ele)/* 解决ele.attachEvent()的this指向问题 */
            addEvent = (ele, type, handle) => ele.attachEvent('on' + type, () => handle.call(ele));
        })
    } else {
        ele['on' + type] = handle;
        addEvent = (ele, type, handle) => ele['on' + type] = handle;
    }
}

/*解除事件处理程序*/
//匿名函数无法解除
// element.onclick = false/''/null;/*句柄形式绑定事件的解绑方法*/
function deleteEvent(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false)
    } else {
        ele.detachEvent('on' + type, fn)
    }
}

/*封装引入自有等函数库的函数*/
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
        //兼容IE
        script.onreadystatechange = function () {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                callback()
            }
        }
    } else {
        //兼容 Chrome Safari Firefox Opera
        script.onload = function () {
            callback()
        }
    }
    script.src = url;
    document.head.appendChild(script);
}

/*事件委托简单事例与封装(结合事件源对象）*/

/*element.onclick = function (e) {
    var elet = e || window.event;
    var target = elet.target || elet.srcElement;

}*/
function eventBubble(e) {
    var elet = e || window.event;
    return elet.target/*火狐独有*/ || elet.srcElement;/*IE独有*//*返回事件源对象*/
    /*（chrome全都有）*/
}

/*封装取消冒泡函数,e为事件对象*/

function stopBubble(e) {
    if (e.stopPropagation) {
        e.stopPropagation();/*W3C标准，IE9以下不支持*/
    } else {
        e.cancelable = true;/*IE独有*/
    }
}

/*阻止默认事件*/
//默认事件 - 表单提交，a标签跳转，右键菜单等
//return false 以对象属性的方式注册的事件才有效
function cancelHandler(e) {
    if (e.preventDefault) {
        e.preventDefault()//W3C标准，IE9以下不兼容
    } else {
        e.returnValue = false //兼容IE
    }
}

/*封装class类*/
function getByClass(className) {
    var tag = document.getElementsByTagName('*');
    var tagArr = Array.prototype.slice.call(tag, 0);
    var tagEleArr = [];
    function dealClass(dom) {
        var reg = /\s+/g;
        return dom.className.replace(reg, ' ').trim()
    }
    tagArr.forEach(function (ele) {
        var tagClassArr = dealClass(ele).split(' ');
        tagClassArr.forEach(function (tagClassArr) {
            if (tagClassArr === className) {
                tagEleArr.push(ele);
            }
        })
    });
    return tagEleArr;
}

/*foreach源码*/
Array.prototype.myForEach = function (func) {
    var len = this.length;
    for (var i = 0; i < len; i++) {
        func(this[i], i);/*执行这个传进来的函数，this[i],i均为实参*/
    }
};

/*filter源码*/
Array.prototype.myFilter = function (func) {
    var len = this.length;
    var newArray = [];
    for (var i = 0; i < len; i++) {
        if (func(this[i], i)) {
            if (this[i] && typeof this[i] === 'object') {
                var newClone;
                if (Array.prototype.toString.call(this[i] === '[object Array]')) {
                    newClone = [];
                } else {
                    newClone = {};
                }
                deepClone(this[i], newClone);
                newArray.push(newClone)
            }
            newArray.push(this[i]);
        }
    }
    return newArray;
};

/*map源码*/
Array.prototype.myMap = function (func) {
    var len = this.length;
    var newArray = [];
    for (var i = 0; i < len; i++) {
        newArray.push(func(this[i], i));
    }
    return newArray;
};

/*deepClone,封装深度克隆*/
function deepClone(origin, target) {
    if (origin && typeof origin === 'object') {

        // 解决target为非object类型值时，但有bug，即为target为基础类型时，函数参数赋值是按值传递的，
        // 不是按地址传递的，所以无法修改，函数内的target为形参，target是函数执行期上下文自己的变量，
        // 这个变量与外部的实参没有关系，因为是按值传递的，所以即使改变了target，也是无用的。
        /*if (!(target && typeof target === 'object')){
            if (Array.prototype.toString.call(origin) === '[object Array]'){
                target = [];
            } else {
                target = {};
            }
        }*/

        //判定target类型值，如果是null或者不是object时即返回：“target + ' is not object'”
        if (!(target && typeof target === 'object')) {
            return target + ' is not object';
        }
        for (var prop in origin) {
            var tempOri = origin[prop];
            var tempTar = target[prop];
            if (tempOri && typeof tempOri === 'object') {
                if (Array.prototype.toString.call(tempOri) === '[object Array]') {
                    tempTar = tempTar ? tempTar : [];/* 三目运算符为判定target{prop]值是否为对象
                    如果是则保留原object[prop]属性值*，如果不是对象则根据origin[prop]的对象类型，
                    赋予target[prop]新值( [] / {} )。 */
                } else {
                    tempTar = tempTar ? tempTar : {};
                }
                target[prop] = deepClone(tempOri, tempTar);/*递归解决，返回值即是对原始值克隆的对象结果*/
            } else {
                target[prop] = origin[prop];/*基础数据类型的赋值*/
            }
        }
        return target;/*必须给出return返回值，否者递归传递不出函数*/
    } else {
        return origin;
    }
}

/*reduce源码*/
Array.prototype.myReduce = function (func, init) {
    var len = this[i].length,
        previous = init,
        i = 0;
    if (init === undefined) {
        i = 1;
        previous = this[0];
    }
    for (i; i < len; i++) {
        previous = func(previous, this[i], i);
    }
    return previous;
};

/*call仿源码*/
Function.prototype.myCall = function () {
    var obj = arguments[0] || window;
    obj.fn = this;
    var arr = [];
    for (var i = 1; i < arguments.length; i++) {
        arr.push('arguments[' + i + ']');
    }
    var result = eval('obj.fn(' + arr.join(",") + ')');
    delete obj.fn;
    return result;
};
/*ES6*/
Function.prototype.myCallEs6 = function () {
    var obj = arguments[0] || window;
    obj.fn = this;
    var arr = [...arguments];
    arr = arr.slice(1);
    return obj.fn(...arr)
};
/*apply仿源码*/
Function.prototype.myApply = function () {
    var obj = arguments[0];
    var result;
    obj.fn = this;
    if (!arguments[1]) {
        result = obj.fn();
        delete obj.fn;
        return result;
    } else {
        var arr = [];
        for (var i = 0; i < arguments[1].length; i++) {
            arr.push('arguments[1][' + i + ']');
        }
        result = eval('obj.fn(' + arr.join(",") + ')');
        delete obj.fn;
        return result;
    }
};
/*cookie函数，设置cookie，移除cookie，取得cookie值(最后一位参数为回调函数)，面向对象风格，set、remove可以链式调用*/
var cookieFun = {
    setCookie: function (name, value, time) {
        document.cookie = name + '=' + value + ';max-age=' + time;
        return this;
    },
    removeCookie: function (name) {
        this.setCookie(name, '', '-1');
        return this;
    },
    getCookie: function (name, callback) {
        var cooKieArr = document.cookie.split('; ');
        for (var i = 0, len = cooKieArr.length; i < len; i++) {
            var tempArr = cooKieArr[i].split('=');
            if (tempArr[0] === name) {
                callback(tempArr[1]);
                return this;
            }
        }
        callback(undefined);
        return this;
    }
};

/*Ajax封装函数，并兼容IE，采用回调函数的形式返回数据，参数data为传入的data*/
function createNewAjax(method, url, data, callback) {
    var xhr;
    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    if (method === 'GET') {
        xhr.open(method, url + '?' + data, true/*async：true（异步）或 false（同步）*/);
        xhr.send();
    } else if (method === 'POST') {
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function (ev) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // oRes = JSON.parse(xhr.responseText);/*还没有转换为json对象的形式*/
                callback(xhr.responseText);
            } else {
                console.log('error');
            }
        }
    }
}

























