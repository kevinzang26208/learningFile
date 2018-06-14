require('./index.less');

var module1 = require('./dep1.js');
function print (){
    console.log('you are');
    var result = module1.add(9,10);
    console.log(result);
}   
print();
var oImg = new Image();
oImg.src = require('./front-pic.jpg');
oImg.onload = function (){
    document.body.appendChild(oImg); 
}