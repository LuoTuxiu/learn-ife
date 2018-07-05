var data1 = new Array();
var data2 = new Array();
var data3 = new Array();
var inputKeyCodeNum = [32,9,13]
init();

function  init(){

	doEvent();
}




function doEvent(){

	$("#confirm").click(function () {

		var textValue = $("#textValue");
		var allStr  = textValue.val();
		var spliteWord = $.trim(allStr).split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
		for (var i = 0; i < spliteWord.length; i++) {
			if ($.inArray(spliteWord[i], data3) != -1) {
				alert("您输入了相同的兴趣爱好:" + spliteWord[i]);
				continue;
			}
			if (spliteWord[i].length != 0) {

				data3.push(spliteWord[i]);
				while(data3.length >= 10) {
				var deleteData  = data3.shift();
				}
			}

		}
		rendar($("#thirdContent"),data3);
	});


}

//渲染函数
function rendar(para,data){
	para.empty();//清空

	for (var i = 0; i < data.length; i++) {
		var node = $("<li></li>");
		node.css("display","inline-block");	
		node.append(data[i]);

		para.append(node); 
	}


}

//渲染函数
function rendar2(para,data){
	para.unbind();
	para.empty();//清空
	for (var i = 0; i < data.length; i++) {
		var node = $("<li></li>");
		node.css("display","inline-block");	
		node.append(data[i]);
		
		node.mouseenter(function(){
		 	
			 $(this).text("删除" + $(this).text());
			 $(this).css("background-color", "red");
		});
		node.mouseleave(function(){
			 $(this).text( $(this).text().substr(2));
			 $(this).css("background-color", "blue");
		});
		para.append(node);
	}
	//增加了代理方法
	para.delegate("li", "click", function(){
		var num = $.inArray( $(this).text().substr(2), data2);
			console.log(num);
			data2.splice(num , 1);
			rendar2($("#secondContent"),data2);
	})

	
}



// 第一个tag回车时会调用函数

	function onkey(){
	if ($.inArray(window.event.keyCode,inputKeyCodeNum)!= -1) {
		var checkValue  = $("#checkInput").val();
		var spliteWord = $.trim(checkValue).split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
		for (var i = 0; i < spliteWord.length; i++) {
			if (data1.length >= 10) {
				var deleteData  = data1.shift();
			}
			if (spliteWord[i].length != 0) {
				data1.push(spliteWord[i]);
				
			}
			
		}
		rendar($("#firstContent"),data1);
		$("#checkInput").val("");//清空输入框
	}
	}


	//点击第二个按钮
	function secondOnkey(){ 
		
		if ($.inArray(window.event.keyCode,inputKeyCodeNum)!=-1) {
			var checkValue  = $("#secondCheckInput").val();
			var secondSpliteWord = $.trim(checkValue).split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
			for (var i = 0; i < secondSpliteWord.length; i++) {
				if ($.inArray(secondSpliteWord[i], data2) != -1) {
					alert("您输入了相同的tag:" + secondSpliteWord[i]);
					continue;
				}

				if (secondSpliteWord[i].length != 0) {
					data2.push(secondSpliteWord[i]);
				}
				
			}
			rendar2($("#secondContent"),data2);
			$("#secondCheckInput").val("");//清空输入框

		}
	}


	
