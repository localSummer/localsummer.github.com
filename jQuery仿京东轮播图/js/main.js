$(function(){
	$('.container .img li').eq(0).fadeIn();
	var i = 0;
	var li;
	var size = $('.container .img li').size();
	for(var j = 1;j<=size ;j++){
		li += '<li>'+ j +'</li>';
	}
	$('.container .btn').append(li);
	$('.container .btn li').eq(0).addClass('active');
	/* 手动控制轮播切换 */
	$('.container .btn li').mouseover(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		i = index;
		$('.container .img li').eq(index).stop().fadeIn(300).siblings().stop().fadeOut(300);
	});

	/* 自动控制轮播切换 */
	function move (){
		i++;
		if(i == size){
			i = 0;
		}

		$('.container .img li').eq(i).fadeIn().siblings().fadeOut();
		$('.container .btn li').eq(i).addClass('active').siblings().removeClass('active');
		}
	var timer = setInterval(move,1500);

	$('.container').hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(move,1500);
	});

	/* 左右导航箭头进行切换 */

	function moveLeft(){
		i--;
		if(i == -1){
			i = (size-1);
		}
		$('.container .img li').eq(i).fadeIn().siblings().fadeOut();
		$('.container .btn li').eq(i).addClass('active').siblings().removeClass('active');
	}
	$('.container .next').click(move);

	$('.container .prev').click(moveLeft);
});