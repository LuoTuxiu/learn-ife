var data = new Array();
init()

function  init(){
	$("#leftIn").click(function () {
		var num = inputText();
		if (data.length >= 60) {
			alert("您最多只能够输入60个数字");
			return;
		}
		if (isNaN(num)) {
			alert("您必须输入合法的数字");
			return;
		}
		else if(num <100 && num > 10){
			leftIn(num);
		}else{
			alert("您必须输入10-100的数字");
			return;
		}

	})
	$("#rightIn").click(function(){
		var num = inputText();
		if (data.length >= 60) {
			alert("您最多只能够输入60个数字");
			return;
		}
		if (isNaN(num)) {
			alert("您必须输入合法的数字");
			return;
		}
		else if(num <100 && num > 10){
			rightIn(num);
		}else{
			alert("您必须输入10-100的数字");
			return;
		}
	})
	$("#leftOut").click(function(){
		leftOut();
	})
	$("#rightOut").click(function(){
		rightOut();
	})	
	$("#sort").click(function(){
		sort();
	})	

	for (var i = 0; i < 10; i++) {
		var temp = Math.random();
		var tempNum = Math.floor(temp * 100);
		leftIn(tempNum);
	}
	// // rendarData();
	sort();
	

}
function inputText(){
	var value = $(".inputText").val();
		var valueNum = +value;
		return valueNum;
}


function leftIn(valueNum){

	data.unshift(valueNum);

	var para = $("<li></li>");
	para.css("height",valueNum);
	para.css("background-color","red");
	para.css("display","inline-block");
	para.css("width","20px");	
	para.click(function(){
		var index =  $("#content").children().index(this);
		data.splice(index, 1);
		$(this).remove();
	})
	$("#content").prepend(para);

}

function rightIn(valueNum){
	data.push(valueNum);

	var para = $("<li></li>");
	para.css("height",valueNum);
	para.css("background-color","red");
	para.css("display","inline-block");
	para.css("width","20px");	
	para.click(function(){
		var index =  $("#content").children().index(this);
		data.splice(index, 1);
		$(this).remove();
	})
	$("#content").append(para);
}

function leftOut(){
	
	var deleteData  = data.shift();
	var firstNode  = $("#content").children().first();
	firstNode.remove();

	alert(deleteData);

}

function rightOut(){

	var deleteData  = data.pop();
	var lastNode  = $("#content").children().last();
	lastNode.remove();

	alert(deleteData);

	
}

function sort(){
		var i = data.length - 1;
		var j = 0;
		var temer = setInterval(function(){
			if (i<0) {
				clearInterval(temer);
			}
			if (j == i) {
				j  = 0;
				i--;
			}

			if (data[j] > data[j+1]) {
				temp = data[j];
				data[j] = data[j+1];
				data[j+1] = temp;
				var leftNode = $("#content").children().eq(j);
				var rightNode = $("#content").children().eq(j+1);
				leftNode.before(rightNode);
			}
			j++;

		
		}, 50);
	
}
