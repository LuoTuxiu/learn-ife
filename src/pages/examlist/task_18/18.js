init()
var data = new Array();
function  init(){
	$("#leftIn").click(function () {
		leftIn();
	})
	$("#rightIn").click(function(){
		rightIn();
	})
	$("#leftOut").click(function(){
		leftOut();
	})
	$("#rightOut").click(function(){
		rightOut();
	})	

}


function leftIn(){
	var value = $(".inputText").val();
	var valueNum = +value;
	if (isNaN(valueNum)) {
		alert("您必须输入合法的数字");
		return;
	}
	data.unshift(valueNum);

	rendarData();

}

function rightIn(){
	var value = $(".inputText").val();
	var valueNum = +value;
	if (isNaN(valueNum)) {
		alert("您必须输入合法的数字");
		return;
	}
	data.push(valueNum);
	rendarData();
	
}

function leftOut(){
	
	var deleteData  = data.shift();
	alert(deleteData);
	rendarData();

}

function rightOut(){

	var deleteData  = data.pop();
	alert(deleteData);
	rendarData();
	
}

function rendarData(){
	var element  = document.getElementById("content");

	for (var i = element.children.length - 1; i >= 0; i--) {
		var child  = element.children[i];
		element.removeChild(child);
	}

	for (var i = 0; i < data.length; i++) {
			var para = document.createElement("div");
			var text = document.createTextNode(data[i]);
			var attrs  = para.getAttribute("name");
			para.setAttribute("name",i);
			para.style.float = "left";
			para.style.backgroundColor = "red";
			para.style.marginLeft = "20px";
			para.style.marginTop = "20px";
			para.appendChild(text);
			para.onclick = function(){
				var para  = $(this)[0];
				var attrs  = para.getAttribute("name");
				data.splice(parseInt(attrs), 1)
				rendarData();
			}
			// para.style.background-color="red";
			element.appendChild(para);
		}

}