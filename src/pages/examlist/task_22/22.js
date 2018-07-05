
var data =  [];
var i  =0 ;
function  init(){
	var timeCount  = 800;
	$("#frontSort").click(function(){
		data = [];
		i = 0;
		preSort($(".flex"));
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

	$("#midSort").click(function(){
		data = [];
		i = 0;
		midSort($(".flex"));
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


	$("#backSort").click(function(){
		data = [];
		i = 0;
		backSort($(".flex"));
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
	
}

//前序遍历
function preSort(node){
	if (node.length == 0) 
	{
		return;
	}
	data.push(node);
	preSort(node.children().first());
	preSort(node.children().last());
}

//中序遍历
function midSort(node){
	if (node.length == 0) 
	{
		return;
	}
	midSort(node.children().first());
	data.push(node);
	midSort(node.children().last());
}

//后序遍历
function backSort(node){
	if (node.length == 0) 
	{
		return;
	}
	backSort(node.children().first());
	backSort(node.children().last());
	data.push(node);
}

init();
