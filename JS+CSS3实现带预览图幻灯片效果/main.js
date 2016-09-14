/*数据定义-从后台加载数据*/
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


/*2.定义通用函数*/
var g = function(id){
    if(id.substr(0,1) == '.'){
        return document.getElementsByClassName(id.substr(1));
    }
    return document.getElementById(id);
};

/* 8.1获取导航箭头元素  和 定义当前页面索引index */
var prev = g('prev');
var next = g('next');
var index = 1;
var timer; //计时器标识
var slid = g('.slider')[0];

/* 3.添加幻灯片的操作 （所有幻灯片以及对应的按钮） */
function addSliders(){
    //3.1 获取模版
    var tpl_main = g('template_main').innerHTML.replace(/^\s*|\s*$ /,'');
    var tpl_ctrl = g('template_ctrl').innerHTML.replace(/^\s*|\s*$/,'');

    // 3.2 定义最终输出的HTML变量
    var out_main = [];
    var out_ctrl = [];

    // 3.3 遍历所有数据，构建最终输出的HTML
    for(var i in data) {
        var _html_main = tpl_main.replace(/{{index}}/g,data[i].img).replace(/{{h2}}/g,data[i].h1).replace(/{{h3}}/g,data[i].h2).replace(/{{css}}/g,['','main-i_right'][i % 2]);

        var _html_ctrl = tpl_ctrl.replace(/{{index}}/g,data[i].img);
        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);
    }

    //3.4 把HTML 回写到对应的DOM里面
    g('template_main').innerHTML = out_main.join('');
    g('template_ctrl').innerHTML = out_ctrl.join('');

    // 增加#main_background
    g('template_main').innerHTML += tpl_main.replace(/{{index}}g/,'{{index}}')
        .replace(/{{h2}}/g,data[i].h1)
        .replace(/{{h3}}/g,data[i].h2);
    g('main_{{index}}').id = 'main_background';
}

/* 5. 幻灯片切换 */
function switchSlider(n){
    // 5.1 获得要展现的幻灯片和控制按钮 DOM;
    var main = g('main_'+n);
    var ctrl = g('ctrl_'+n);
    // 5.2 获得所有的幻灯片以及控制按钮
    var clear_main = g('.main-i');
    var clear_ctrl = g('.ctrl-i');

    // 5.3 清除他们的active样式
    for(var i =0; i<clear_ctrl.length;i++){
        clear_main[i].className = clear_main[i].className.replace(' main-i_active','');
        clear_ctrl[i].className = clear_ctrl[i].className.replace(' ctrl-i_active','');
    }

    // 5.4 为当前控制按钮和幻灯片附加样式
    main.className += ' main-i_active';
    ctrl.className += ' ctrl-i_active';

    // 7.2切换时复制上一张幻灯片到 #main_background中
    setTimeout(function(){
        g('main_background').innerHTML = main.innerHTML;
    },1000);
}

/* 9.给所有的控制按钮添加click事件 */
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

/* 6.动态调整图片的margin-top,以使其垂直居中 */
function movePictures(){
    var pictures = g('.picture');
    for(var i = 0;i<pictures.length;i++){
        pictures[i].style.marginTop = -(pictures[i].clientHeight / 2 )+ 'px';
    }
}

/* 8.为两个导航箭头绑定切换幻灯片的事件 */
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

/* 10.自动轮播-模拟导航箭头点击事件就可以了 */
    function play(){
        timer = setInterval(function(){
            next.onclick();
        },3000);
    }

    function stop(){
        clearInterval(timer);
    }

/* 定义何时处理幻灯片输出 */
window.onload = function(){
    addSliders();
    switchSlider(1);
    buttonsClick();
    /*movePictures(); 这样会不起作用，因为在获取图片的时候，可能还不能获取到，因为图片是动态生成的，所以需要等待图片生成后再执行*/
    setTimeout(movePictures,100);
    slid.addEventListener('mouseover',stop,false);
    slid.addEventListener('mouseout',play,false);
    //此处如果清除不了自动轮播，很可能是slid不是一个具体的DOM元素而是一个伪数组的集合，导致无法绑定事件,因此用 g('.slider')[0]获取到最外部的.slider容器，必须加上[0]
    play(); //手动启动一下轮播
};