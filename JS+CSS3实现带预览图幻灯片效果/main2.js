/* 1. 数据定义-从后台加载数据 */
var data = [{
    img: 1,
    h1: 'Creative',
    h2: 'DUET'
}, {
    img: 2,
    h1: 'Friendly',
    h2: 'DEVIL'
}, {
    img: 3,
    h1: 'Tranquilent',
    h2: 'COMPATRIOT'
}, {
    img: 4,
    h1: 'Insecure',
    h2: 'HUSSLER'
}, {
    img: 5,
    h1: 'Loving',
    h2: 'REBEL'
}, {
    img: 6,
    h1: 'Passionsate',
    h2: 'SEEKER'
}, {
    img: 7,
    h1: 'Crazy',
    h2: 'FRIEND'
}, ];

/* 2. 定义通用函数 */
var g = function(id){
	if(id.substr(0,1) == '.'){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
};

var prev = g('prev');
var next = g('next');
var index = 1;
var timer; //计时器标识
var slid = g('.slider')[0];

/* 3.添加幻灯片的操作(所有的幻灯片以及所对应的按钮) */
function addSliders(){
	/* 3.1获取模版 尽量不要动 tpl_main 和 tpl_ctrl ,他们只用来获取模版内容 */
	var tpl_main = g('template_main').innerHTML.replace(/^\s*|\s*$/,'');
	var tpl_ctrl = g('template_ctrl').innerHTML.replace(/^\s*|\s*$/,'');
	/* 3.2定义一个中间转存的数组用于组装 */
	var out_main = [];
	var out_ctrl = [];
	/* 3.3遍历所有数据，构建最终输出的HTML */
	for(var i in data){
		var _html_main = tpl_main.replace(/{{index}}/g,data[i].img).replace(/{{h2}}/g,data[i].h1).replace(/{{h3}}/g,data[i].h2);
		var _html_ctrl = tpl_ctrl.replace(/{{index}}/g,data[i].img);
		out_main.push(_html_main);
		out_ctrl.push(_html_ctrl);
	}

	/* 3.4把对应的HTML回写到对应的dom里面 不能使用tpl_main = 因为tpl_main 对应的就是模版里面的一个幻灯片，不能用后面的进行替换，此时必须使用 innerHTMl,才会添加到Dom中 */
	g('template_main').innerHTML = out_main.join('');
	g('template_ctrl').innerHTML = out_ctrl.join('');

	/* 增加背景防止切换出现白边 */
	g('template_main').innerHTML += tpl_main;
	g('main_{{index}}').id = 'main_background';
}

/* 5.幻灯片的切换 */
function switchSlider(n){
	var main = g('main_'+n);
	var ctrl = g('ctrl_'+n);

	var clear_main = g('.main-i');
	var clear_ctrl = g('.ctrl-i');
	/* i是通用的一个循环就足够了 */
	for(var i = 0;i<clear_ctrl.length;i++){
		clear_main[i].className = clear_main[i].className.replace('main-i_active','');
		clear_ctrl[i].className = clear_ctrl[i].className.replace('ctrl-i_active','');
	}

	/* 要添加的类前面需要添加空格 */
	main.className += ' main-i_active';
	ctrl.className += ' ctrl-i_active';

	setTimeout(function(){
		g('main_background').innerHTML = main.innerHTML;
	},1000);
}

/* 6.动态调整图片的margin-top,以使其垂直居中 */
function movePictures(){
	var pictures = g('.picture');
	for(var i =0;i<pictures.length;i++){
		pictures[i].style.marginTop = -(pictures[i].clientHeight / 2) + 'px';
	}
}

prev.onclick=function(){
    if(index == 1){
        index = 7;
    }else {
        index--;
    }
    switchSlider(index);
};

next.onclick = function(){
    if(index == data.length){
        index = 1;
    }else {
        index++;
    }
    switchSlider(index);
};

function buttonsClick(){
    var buttons = g('.ctrl-i');
    var myIndex;//找到点击的是第几张图片
    for(var i = 0;i < buttons.length;i++){
        buttons[i].onclick=function(){
            myIndex = parseInt(this.getAttribute('id').substr(5));
            index = myIndex;
            switchSlider(index);
        };
    }
}

function play(){
    timer = setInterval(function(){
        next.onclick();
    },3000);
}

function stop(){
    clearInterval(timer);
}

/* 4.定义何时处理幻灯片的输出 */
window.onload = function(){
	addSliders();
	switchSlider(1);
	buttonsClick();
	setTimeout(movePictures,100);
	slid.addEventListener('mouseover',stop,false);
	slid.addEventListener('mouseout',play,false);
	play();
};