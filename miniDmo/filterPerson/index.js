var allPersonArr = [
    {name: '邓旭明', age: 55, sex: 'male', email: '111@163.com'},
    {name: '很老邓', age: 75, sex: 'male',email: '222@163.com'},
    {name: '邓嫂子', age: 20, sex: 'female', email: '777@163.com'},
    {name: '刘朝旭', age: 20, sex: 'male',email: '333@163.com'},
    {name: '王朝君', age: 20, sex: 'female', email: '222@163.com'},
    {name: '刘德华', age: 50, sex: 'male', email: '666@163.com'},
    {name: '马德华', age: 55, sex: 'male',email: '333@163.com'},
    {name: '罗子君', age: 35, sex: 'female', email: '222@163.com'},
    {name: '罗大佑', age: 55, sex: 'male', email: '666@163.com'}
];
var eleUl = document.getElementsByTagName('ul')[0],
    filterText = document.getElementsByTagName('input')[0],
    musAge = document.getElementsByTagName('input')[1],
    onlyMan = musAge.nextElementSibling,
    onlyWoman = onlyMan.nextElementSibling,
    showAll = onlyWoman.nextElementSibling;
var currentPersonArr = allPersonArr,
    filterArr = null;

window.onload= function (ev) {
    createLi(allPersonArr);
};
/*创建li*/
function createLi(personArr) {
    var htmlAllLi = '';
    personArr.forEach(function (ele,index) {
        htmlAllLi += '<li>' + 'name : ' + ele.name + ' age : ' + ele.age + ' sex : ' + ele.sex + '</li>';
    });
    eleUl.innerHTML = htmlAllLi;
}
/*筛选符合input输入的对象，并以数组的形式返回符合要求的对象集合*/
function searchPersonArr(personArr,filterText){
    console.log(personArr);
    var returnArr = personArr.filter(function (ele) {
        return ele.name.indexOf(filterText) >= 0;

    });
    if (returnArr.length > 0){
        return returnArr;
    }else{
        return personArr;
    }
}
/*减age*/
function mapMinusArr(personArr){
    return personArr.map(function (ele) {
        ele.age--;
        return ele;
    })
}
/*筛选sex*/
function filterSex(personArr,sexBtn){
    var dataSex = sexBtn.getAttribute('data-sex');
    return personArr.filter(function (ele) {
        return ele.sex === dataSex;
    })
}

filterText.addEventListener('input',function () {
    currentPersonArr = searchPersonArr(currentPersonArr,filterText.value);
    createLi(currentPersonArr);
},false);
showAll.addEventListener('click',function () {
    createLi(allPersonArr);
},false);
musAge.addEventListener('click',function () {
    currentPersonArr = mapMinusArr(currentPersonArr);
    createLi(currentPersonArr);
},false);
onlyMan.addEventListener('click',function () {
    currentPersonArr = filterSex(currentPersonArr,onlyMan);
    createLi(currentPersonArr);
},false);
onlyWoman.addEventListener('click',function () {
    currentPersonArr = filterSex(currentPersonArr,onlyWoman);
    createLi(currentPersonArr);
},false);