// 数据自行删改
var subwayData = {
	"1号线": ["苹果园","古城","雍和宫"],
	"2号线": ["西直门","积水潭","雍和宫","安定门"],
	"4号线": ["鼓楼大街","安定门","光谷"],
	"5号线": ["八角","光谷","宝通寺"],
	"10号线": ["广阜屯","宝通寺","螃蟹岬"],
	"13号线": ["卓刀泉","螃蟹岬","古城"],
	"15号线": ["中南路","洪山广场","江汉路"],
	"八通线": ["林园路","江汉路","武昌车站"],
	"昌平线": ["汉正街","武昌车站","循礼门"],
	"亦庄线": ["青年路","循礼门","江滩"],
	"大兴线": ["中南路","江滩","古城"]
};

// length between two points
var edgesDate = [["苹果园","古城",2], ["古城","雍和宫",1],["西直门","积水潭",2],["积水潭","雍和宫",4],["雍和宫","安定门",2],["鼓楼大街","安定门",7],["安定门","光谷",2],["八角","光谷",2],["光谷","宝通寺",4],["广阜屯","宝通寺",2],["宝通寺","螃蟹岬",5],["卓刀泉","螃蟹岬",2],["螃蟹岬","古城",8],["中南路","洪山广场",2],["洪山广场","江汉路",2],["林园路","江汉路",2],["江汉路","武昌车站",4],["汉正街","武昌车站",2],["武昌车站","循礼门",2],["青年路","循礼门",2],["循礼门","江滩",5],["中南路","江滩",2],["江滩","古城",7]];

var $j = jQuery.noConflict();

function init () {
	initSubwayBox();
	initSubwayClick();
	initDijkstra();
	initCalcFare();
}

function getSubwayLineHtml(){
	var htmls = [];
	i = -1;
	className = ["op-subway-one", "op-subway-two", "op-subway-four", "op-subway-five", "op-subway-six", "op-subway-seven", "op-subway-eight", "op-subway-nine", "op-subway-ten", "op-subway-thirteen", "op-subway-fourteen", "op-subway-fifteen", "op-subway-batong", "op-subway-changpin", "op-subway-yizhuan", "op-subway-fangsan", "op-subway-jichang"];
	for (var lineName in subwayData)
	i++,
		htmls.push("<li><span class="+className[i]+"></span>"+lineName+"</li>");
    return htmls.join("");
}

function getSubwayStationHtml (lineName) {
	for(var stations = subwayData[lineName],htmls = [], i=0; i < stations.length; i++) htmls.push("<li>"+stations[i]+"</li>");
		return htmls.join("");
}	

function tryActiveButton(){
	var start = $j(".op-subway-box-start .op-subway-station em").text();
	var end = $j(".op-subway-box-end .op-subway-station em").text();
	if ("选择车站" != start && "选择车站" != end) {
		$j(".op-subway-calc-false").addClass("op-subway-calc-fare").removeClass("op-subway-calc-false");
	}
}

function initSubwayBox () {
	var lineHtml = getSubwayLineHtml();
	$j(".op-subway-line .op-subway-ul").html(lineHtml);
	$j(".op-subway-line .op-subway-ul").on("click", "li",
	function(){
		var lineName = $j(this).text();
		$j(this).parent().parent().parent().find(".op-subway-line em").css({
			padding:"0px 5px 0px 20px"
		}),
			$j(this).parent().parent().parent().find(".op-subway-station").css({
				background:"#fff"
			}),
			$j(this).parent().parent().parent().find(".op-subway-station em").css({
				color:"#333"
			});

		var stationHtml = getSubwayStationHtml(lineName),
			$box = $j(this).parent().parent().parent();
		$box.find(".op-subway-ulk").html(stationHtml);
		var fisrtStation = subwayData[lineName][0];
		$box.find(".op-subway-station em").text(fisrtStation),
			tryActiveButton()
	})
}

function initSubwayClick(){
	$j(".op-subway-line,.op-subway-station").on("click",
		function(event){
			if(event.stopPropagation(),$j(".op-subway-ts").hide(),$j(".op-subway-box ul").hide(),$j(this).find("ul").children().length) {$j(this).find("ul").show();}

			$j(document).on("click",
			function(){
				$j(".op-subway-box ul").hide()
			})
		})
	$j(".op-subway-ul, .op-subway-ulk").on("click","li",
		function(event){
			event.stopPropagation(),
				$j(this).parent().parent().find("em").html($j(this).html()),
				$j(this).parent().parent().find("ul").hide();
		})
}

function initCalcFare(){
	$j(".op-subway-main").on("click",".op-subway-calc-fare",
		function(){
			var start = $j(".op-subway-box-start .op-subway-station em").html();
			var end = $j(".op-subway-box-end .op-subway-station em").html();
			if(start == end) {return $j(".op-subway-ts").html("起点和终点不可重合哦！").show();}
			$j(".op-subway-tab,.op-subway-footer").show(),
				$j($j(".op-subway-tab li")).show();
			var distance = Dijkstra.shortestPath(start,end);
			var	fare = caleFare(distance);
			$j(".op-subway-content2 .op-subway-text .op-subway-fareinfo").html(getText(distance,fare));
		})
}

function caleFare(distance){
	if(distance <= 6) return 3;
	if(distance <= 12) return 4;
	if(distance <= 32) return 4 + Math.ceil((distance-12)/10);
	else return 6+Math.ceil((distance-32)/20);
}

// return a num with one number after '.', e.g. "123.4"
function format(distance){
	console.log();
	var s = distance + "",
		index = s.indexOf(".");
	if(index >= 0) if(s.length > index+2) s = substr(0, index+2);
	return s;
}

function getText(distance, fare){
	var increase = caleMonthFare(fare);
	if(distance = format(distance)) {
		$j(".op-subway-bord").css({height:"300px"}); // -a8-
		return '<p class="op-subway-span">单程<em class="op-subway-increase">'+distance+'</em>公里，票价<em class="op-subway-increase op-subway-money">'+fare+'</em>元。<br>每年成本将增加<em class="op-subway-increase op-subway-money">'+increase+'</em>元!</p>';
	}
}

function caleMonthFare(fare){
	var addtext = 2*(fare-2)*22*12;
	return addtext;
}

function initDijkstra(){
	Dijkstra.addEdges(edgesDate);
}

init();