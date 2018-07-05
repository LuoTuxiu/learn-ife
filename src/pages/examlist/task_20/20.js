var data = new Array();
var spliteWord;
var allStr = "";
init()

function  init(){
	$("#insert").click(function () {

		var textValue = $("#textValue");
		var getStr  = textValue.val();
		allStr = allStr +" "+getStr;
		spliteWord = allStr.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
		if (spliteWord.length != 0) {
			$("#content").empty();
			data = new Array();
		}
		for (var i = 0; i < spliteWord.length; i++) {
			insert(spliteWord[i]);
		}
	})
	$("#check").click(function(){ //查询
		var checkValue  = $("#checkInput").val();
		$("#content").empty();
		data = new Array();
		for (var i = 0; i < spliteWord.length; i++) {
			var newStr  =  spliteWord[i].replace(new RegExp(checkValue, "g"),"<span class='selectStr'>" + checkValue + "</span>");
			console.log(newStr);
			insert(newStr);
		}
		
	})
	

}

function insert(valueNum){
	data.push(valueNum);

	var para = $("<li></li>");
	para.css("display","inline-block");	
	para.append(valueNum);
	$("#content").append(para);
}


