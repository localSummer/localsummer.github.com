$(function(){
	var mark = $('#mark'),
		sidebar = $('#sidebar'),
		sidebar_toggle = $('.sidebar-toggle'),
		back = $('.backToTop');

	function showSidebar() {
		mark.fadeIn();
		sidebar.css('right',0);
	}

	function hideSidebar(){
		sidebar.css('right','-300px');
		mark.fadeOut();
	}

	sidebar_toggle.on('click',showSidebar);
	mark.on('click',hideSidebar);

	back.on('click',function(){
		// 返回顶部,选择器里面使用 window 窗口也是可以的
		$('html,body').animate({scrollTop : 0},800);
	});

	$(window).on('scroll',function(){
		// 判断返回顶部按钮的显示或隐藏，是通过判断 窗口相对于原始位置的滚动距离 与 窗口的高度进行比较
		if($(this).scrollTop() > $(this).height()){
			back.fadeIn();
		}else {
			back.fadeOut();
		}
	});
});