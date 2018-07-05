/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  },
  "深圳": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  },
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
const DivHeight  = 200;
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: undefined,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var element  = $(".aqi-chart-wrap");
    var selectObjecttemp  = chartData[pageState["nowSelectCity"]];
    var selectObject = selectObjecttemp[pageState["nowGraTime"]];
    var  widthM = document.body.clientWidth / Object.keys(selectObject).length / 2;
    var leftM = 0;

    for (var i = element[0].children.length- 1; i >= 0; i--) {
      var child  = element[0].children[i];
      element[0].removeChild(child);
    }
    for(var date  in selectObject){
        var array  = selectObject[date];
        var para  =  document.createElement("div");
        
        para.style.width = widthM;
        para.style.height = array[0];
        para.style.backgroundColor = randomColor();
        para.style.position = "absolute";
        para.style.bottom = "0px";
        para.style.left = leftM;

        para.setAttribute("title",date + "、"+ array[1]);

        element[0].appendChild(para);
        leftM = leftM + widthM * 1.97;
    }

    // element[0].style.backgroundColor = "green";
    element[0].style.position  = "relative";
    element[0].style.height = "400px";
    element[0].style.border = "2px solid black";
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var getRadioValue = $("input[type=\"radio\"][name=\"gra-time\"]:checked").val();
  // 设置对应数据
  switch(getRadioValue){
    case "day":
      pageState["nowGraTime"] = "day";
      break;
    case "week":
      pageState["nowGraTime"] = "week";
      break;
    case "month":
      pageState["nowGraTime"] = "month";
      break;
      default:
      break;
  }

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var element  = document.getElementById("city-select")
  var strSelected  = element.options[element.selectedIndex].value;
  // 设置对应数据
  pageState["nowSelectCity"] = strSelected;
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    $("input[type=radio][name=gra-time]").change(function(){
        graTimeChange();
    });
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var element  = document.getElementById("city-select");
  for (var city in aqiSourceData){
    var para  = document.createElement("option");
    var node  = document.createTextNode(city);
    para.appendChild(node);

    element.appendChild(para);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  $("#city-select").change(function(){
    citySelectChange();
  });
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for (var city  in aqiSourceData)
  {

    //计算每日
    var dayData = {};
    var cityData  =  aqiSourceData[city];
    var dataNums = [];
    var i = 0;
    var cityAllData = {};
    for(var date in cityData){
        dataNums[i] = cityData[date];
        i++;
    }

    var maxNum = Math.max(...dataNums);

    for(var date in cityData){
        var actualHeight = cityData[date]/maxNum * DivHeight;
        var newArray = [actualHeight,cityData[date]];
        dayData[date] = newArray;
    }  

    cityAllData["day"] = dayData;



    //计算每月
    var monthData = {};
    var monthNums  = [0,0,0,0,0,0,0,0,0,0,0,0];
    var monthCounts = [0,0,0,0,0,0,0,0,0,0,0,0];
    var monthCutWeeks = [];
    for(var date in cityData){

       var actualDate = new Date(date);
       var month  = actualDate.getMonth(); 
        switch(month){
          case 0:
              monthCounts[0] += 1;
              monthNums[0] += cityData[date];
          break;
          case 1:
             monthCounts[1] += 1;
              monthNums[1] += cityData[date];
          break;
          case 2:
              monthCounts[2] += 1;
              monthNums[2] += cityData[date];
          break;
          default:
          break;
        }

    }
    for (var i = 0; i < monthCounts.length; i++) {
      monthNums[i] = monthNums[i] / monthCounts[i];
    }
    // console.log(monthNums);

    var maxMonthNum = Math.max(...monthNums);

    for (var i = 0; i < monthCounts.length && monthCounts[i] != 0; i++) {
       var actualHeight = monthNums[i] / maxNum * DivHeight;
       var newArray = [actualHeight,Math.ceil(monthNums[i])];
        monthData[(i+1)] = newArray;
    }

    cityAllData["month"] = monthData;


 //计算每周
 	var currentMonth = 0;
 	var firstWeek = 0,secondWeek = 0,thirdWeek= 0,fourWeek= 0,fifWeek = 0;
 	var firstWeekCounts= 0,secondWeekCounts= 0,thirdWeekCounts= 0,fourWeekCounts= 0,fifWeekCounts = 0; 
 	var firstWeekCountsAverage= 0,secondWeekCountsAverage= 0,thirdWeekCountsAverage= 0,fourWeekCountsAverage= 0,fifWeekCountsAverage = 0;  	
 	var weekData	 = {};
 	var firstDayWeek = 0;//记录第一天的星期数
 	for(var date in cityData){
 		var actualDate = new Date(date);
 		firstDayWeek  = actualDate.getDay();
 	}
 	for(var date in cityData){
 		var actualDate = new Date(date);
        var month  = actualDate.getMonth(); 
 		if (month == currentMonth) {//代表还是当月

 		} else {
 			if (firstWeekCounts!=0) {
 				firstWeekCountsAverage = parseInt(firstWeek / firstWeekCounts);
 			}
 			if (secondWeekCounts!=0) {
				secondWeekCountsAverage =parseInt(secondWeek /secondWeekCounts) ;
 			}
 			if (thirdWeekCounts!=0) {
 				thirdWeekCountsAverage  =parseInt(thirdWeek /thirdWeekCounts) ;
 			}
 			if (fourWeekCounts!=0){
 				fourWeekCountsAverage = parseInt(fourWeek / fourWeekCounts);
 			}
 			if (fifWeekCounts!=0){
 				fifWeekCountsAverage = parseInt(fifWeek / fifWeekCounts);
 			}
 			weekData[currentMonth] = [firstWeekCountsAverage,secondWeekCountsAverage,thirdWeekCountsAverage,fourWeekCountsAverage,fifWeekCountsAverage];
  			firstWeek=0;
  			secondWeek=0;thirdWeek=0;
  			fourWeek=0;
  			fifWeek = 0;

 			firstWeekCounts=0;
 			secondWeekCounts=0;
 			thirdWeekCounts=0;
 			fourWeekCounts=0;
 			fifWeekCounts = 0;	
 			currentMonth = month;

			firstDayWeek  = actualDate.getDay();

 		}

 		var dayNow = actualDate.getDate();
 		var weeks = 0; //默认是第0周
 		if (firstDayWeek == 0) {//如果是星期天
 			weeks =Math.floor((dayNow+5)/7);
 		} else if (firstDayWeek == 1){
 			weeks = Math.floor((dayNow-1)/7 );
 		}
 		else if (firstDayWeek == 2){
 			 weeks = parseInt((dayNow)/7 );
 		}
 		else if (firstDayWeek ==3){
 			 weeks = parseInt((dayNow+1)/7);
 		}
 		else if (firstDayWeek ==4){
 			  weeks = parseInt((dayNow+2)/7 );
 		}
 		else if (firstDayWeek ==5){
 			  weeks = parseInt((dayNow+3)/7);
 		}
 		else if (firstDayWeek == 6){
			 weeks = parseInt((dayNow+4)/7);
 		}
 		switch(weeks){
 			case 0://第0周
 				firstWeek  += cityData[date];
 				firstWeekCounts++;
 			break;
 			case 1:
 				secondWeek  += cityData[date];
 				secondWeekCounts++;
 			break;
 			case 2:
 				thirdWeek += cityData[date];
 				thirdWeekCounts++;
 			break;
 			case 3:
 				fourWeek  += cityData[date];
 				fourWeekCounts++;
 			break;
 			case 4:
 				fifWeek  +=  cityData[date];
 				fifWeekCounts++;
 			break; 			
 		}





 	}


			if (firstWeekCounts!=0) {
 				firstWeekCountsAverage = parseInt(firstWeek / firstWeekCounts);
 			}
 			if (secondWeekCounts!=0) {
				secondWeekCountsAverage =parseInt(secondWeek /secondWeekCounts) ;
 			}
 			if (thirdWeekCounts!=0) {
 				thirdWeekCountsAverage  =parseInt(thirdWeek /thirdWeekCounts) ;
 			}
 			if (fourWeekCounts!=0){
 				fourWeekCountsAverage = parseInt(fourWeek / fourWeekCounts);
 			}
 			if (fifWeekCounts!=0){
 				fifWeekCountsAverage = parseInt(fifWeek / fifWeekCounts);
 			}
 			weekData[currentMonth] = [firstWeekCountsAverage,secondWeekCountsAverage,thirdWeekCountsAverage,fourWeekCountsAverage,fifWeekCountsAverage];

 	var temp = [];
 	 var i =0;
 	for(var myCurrentMonthTemp in weekData){
 		var tempValue  = Math.max(...weekData[myCurrentMonthTemp]);
 		temp[i] = tempValue;
 	}
 	var maxWeekNum = Math.max(...temp);
 	var j = 0;
 	var weekDataTemp  = {};
 	for(var myCurrentMonth in weekData){
 		for (var i = 0; i < weekData[myCurrentMonth].length; i++) {
 			var tempWeek =  weekData[myCurrentMonth];
 			var actualHeight = tempWeek[i] / maxWeekNum * DivHeight;
       		var newArray = [actualHeight,Math.ceil(tempWeek[i])];
       		var monthCountsTemp = parseInt(myCurrentMonth) +1;

       		var str  = "第" + monthCountsTemp + "月第" + (i+1)  + "周"; 
       		weekDataTemp[str] = newArray;
       		j++;
 		}
		
 	}

    cityAllData["week"] = weekDataTemp;

    chartData[city] = cityAllData;
  }

  // console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  pageState["nowSelectCity"] = "北京";
  renderChart();
}

init();

$(window).resize(function(){
  renderChart();
})

function randomColor() {
    // 这里使用rgb颜色值
    var colorVal = "rgb(";
    for(i = 0; i < 3; i++) {
        colorVal += Math.round(250*Math.random());
        if (i < 2) {
            colorVal += ",";
        }
    }
    colorVal += ")";
    return colorVal;
}