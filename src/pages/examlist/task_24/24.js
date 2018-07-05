
var data =  [];
var tempArray = [];
var i  =0 ;
function  init(){
	var timeCount  = 800;
	$("#bfs").click(function(){
		data = [];
		i = 0;
		bfs($(".flex"));
		var time  = setInterval(function(){
			$("button").attr("disabled", "disabled");
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
				$("button").removeAttr("disabled");

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
		var time  = setInterval(function(){
			$("button").attr("disabled", "disabled");
			console.log("setInterval");
			if (i>= 1) {
				data[i-1].css("background-color","white");
			}
			var needCompareValue = data[i]
			if (data[i][0].firstChild != null && $.trim(data[i].html().split("<")[0]) == searchValue) {
				data[i].css("background-color","blue");
				clearInterval(time);
				$("button").removeAttr("disabled");
				return;
			} else {
				data[i].css("background-color","red");
			}
			
			console.log(i);
			if (i >= data.length -1 ) {
				console.log("test");
				clearInterval(time);
				$("button").removeAttr("disabled");
				setTimeout(function(){
					data[i].css("background-color","white");
					alert("并没有找到相应内容");
				}, timeCount * 2);
				return;
			}
			i++;
		},timeCount);
	});


	$("#deleteBtn").click(function(event) {
		if (selectNode == undefined) {
			alert("您未选择任何要删除的元素");
		} else {
			if (selectNode.attr("class") == "flex") {
				alert("您不能删除根元素");
			} else {
				selectNode.remove();
			}
				
				
		}
		
	});

	$("#addBtn").click(function(event) {
		/* Act on the event */
		$("*").css("background-color","white");
		var addValue = $("#addInput").val();
		if (addValue.length == 0) {
			alert("您未输入要添加的元素");
			return;
		}
		if (selectNode == undefined) {
			alert("您未选中任何元素");
			return;
		}
		var addDiv = $("<div class='addDiv'></div>");
		addDiv.text(addValue);
		selectNode.append(addDiv);
		addDiv.click(function(e){
			$("*").css("background-color","white");
			e.stopPropagation();//Prevents the event from bubbling up the DOM tree
			$(this).css("background-color","#fef9d1");
			selectNode = $(this);
		});
	});


	var allNode  = $("body div");
	var selectNode ;
	for (var i = 0; i < allNode.length; i++) {
		console.log(allNode.eq(i));
		allNode.eq(i).click(function(e){
			$("*").css("background-color","white");
			e.stopPropagation();//Prevents the event from bubbling up the DOM tree
			$(this).css("background-color","#fef9d1");
			selectNode = $(this);
		});
	}
	
 
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
