
var data =  [];
var tempArray = [];
var i  =0 ;
function  init(){
	var timeCount  = 800;
	$("#bfs").click(function(){
		data = [];
		i = 0;
		bfs($(".flex"));

		console.log(data);
		var time  = setInterval(function(){
			if (i>= 1) {
				data[i-1].css("background-color","white");
			}
			data[i].css("background-color","red");
			i++;
			if (i > data.length -1 ) {
				setTimeout(function(){
					data[i-1].css("background-color","white");
				}, timeCount);
				
				clearInterval(time);
			}
		},timeCount);
	});

	$("#dfs").click(function(){
		data = [];
		i = 0;
		dfs($(".flex"));
		console.log(data);
		var time  = setInterval(function(){
		if (i>= 1) {
			data[i-1].css("background-color","white");
		}
			data[i].css("background-color","red");
			i++;
			if (i > data.length -1 ) {
				setTimeout(function(){
					data[i-1].css("background-color","white");
				}, timeCount);
				
				clearInterval(time);
			}
		},timeCount);
	});


	$("#searchBtn").click(function(){
		var searchValue  = $(".search").val();
		data = [];
		i = 0;
		$("*").css("background-color","white");
		bfs($(".flex"));
		console.log(data);
		var time  = setInterval(function(){
			console.log("setInterval");
			if (i>= 1) {
				data[i-1].css("background-color","white");
			}
			if (data[i][0].firstChild != null && $.trim(data[i][0].firstChild.textContent) == searchValue) {
				data[i].css("background-color","blue");
				clearInterval(time);
			} else {
				data[i].css("background-color","red");
			}
			
			console.log(i);
			if (i >= data.length -1 ) {
				console.log("test");
				clearInterval(time);
				setTimeout(function(){
					data[i].css("background-color","white");
					alert("并没有找到相应内容");
				}, timeCount * 2);
				return;
			}
			i++;
		},timeCount);
	});

}

//广度优先遍历
function bfs(node){


	console.log(node);
	data.push(node);
	for (var i = 0; i < node.children().length; i++) {
		tempArray.push(node.children().eq(i));
	}
	var i  =0;
	while(tempArray.length !=0){
		
		var deleteNode  = tempArray.shift();
		console.log(deleteNode);
		data.push(deleteNode);
		if (deleteNode.children().length != 0) {
			console.log(deleteNode);
				for (var j = 0; j < deleteNode.children().length; j++) {
					tempArray.push(deleteNode.children().eq(j));
				}
		}

	}
}




init();
