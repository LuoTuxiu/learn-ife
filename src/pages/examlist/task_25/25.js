
var data =  [];
var tempArray = [];
var i  =0 ;
var searchValue;
function  init(){

//点击查询按钮
	$("#searchBtn").click(function(){
		searchValue  = $(".search").val();
		if (searchValue) {
			compare($("#content"),searchValue);
		} else {
			$("*").show();
			$("img").css("display","none");
		}
		
	});

	var contentAll = $("#content");
	contentAll.find().remove();
 	creatContent(contentAll,dataContent["title"],dataContent["children"]);

	commonset();

}

function creatContent(node,title,content){
	var labelTitle  = $("<label class='labelTitle'></label>");
	var spanTitle  =  $("<span class='nameTitle'></span>");
	var imgTitle  =  $("<img src='http://chuantu.biz/t5/25/1470389812x3738746595.png' class='imgClass'>");
	var imgDelete = $("<img src='http://img.blog.csdn.net/20160809134520761' class='deleteImage'>");
	spanTitle.append(title);
	labelTitle.append(spanTitle);
	imgTitle.click(function(event) {
		/* Act on the event */
		var title  = prompt("请输入标题：");
		var levelNum = [];
		if (title != null) {
			var nowNode = $(this).parent().parent();
			while(nowNode.attr("id")  != "content"){
				var preBrotherCounts = nowNode.prevAll().length;
				nowNode = nowNode.parent();
				levelNum.unshift(preBrotherCounts);
			}


			console.log(levelNum);
			var addSelectLevel = dataContent.children;
			for (var i = 0; i < levelNum.length ; i++) {
				addSelectLevel  = addSelectLevel[levelNum[i] -1 ].children;
			}

			var addObject  = {
					title:title,
					children:[],
			};
			addSelectLevel.push(addObject);

			var contentAll = $("#content");
			contentAll.empty();
			
		 	creatContent(contentAll,dataContent["title"],dataContent["children"]);

		 	commonset();
		}

	});


	labelTitle.append(imgTitle);

	imgDelete.click(function(event) {
		/* Act on the event */
		var levelNum = [];
			var nowNode = $(this).parent().parent();
			while(nowNode.attr("id")  != "content"){
				var preBrotherCounts = nowNode.prevAll().length;
				nowNode = nowNode.parent();
				levelNum.unshift(preBrotherCounts);
			}


			console.log(levelNum);
			var addSelectLevel = dataContent.children;
			for (var i = 0; i < levelNum.length -1  ; i++) {
				addSelectLevel  = addSelectLevel[levelNum[i] -1 ].children;
			}
			addSelectLevel.splice(levelNum[levelNum.length -1] -1,1);

			var contentAll = $("#content");
			contentAll.empty();
			
		 	creatContent(contentAll,dataContent["title"],dataContent["children"]);

		 	commonset();

	});

	
	labelTitle.append(imgDelete);

	node.append(labelTitle);
	imgTitle.css("display","none");
	imgDelete.css("display","none");
	if (content.length == 0) {
		return;
	}
	for (var i = 0; i < content.length; i++) {
		var temp  = content[i];
		var secondNode = $("<div></div>");
		node.append(secondNode);
		creatContent(secondNode,temp["title"],temp["children"]);
	}

}

function commonset(){
	var allNode  = $(".nameTitle");
	var allLabels = $(".labelTitle");
	var selectNode ;
	for (var i = 0; i < allLabels.length; i++) {
		console.log(allLabels.eq(i));
		allLabels.eq(i).mouseover(function(e){
			$("*").css("color","black");
			e.stopPropagation();//Prevents the event from bubbling up the DOM tree
			$(this).children().first().css("color","red");
			selectNode = $(this);
			$(this).children().eq(1).css("display","initial");
			$(this).children().eq(2).css("display","initial");
		});

		allLabels.eq(i).mouseout(function(e){

			$(this).children().eq(1).css("display","none");
			$(this).children().eq(2).css("display","none");
			$("*").css("color","black");
		});

		allNode.eq(i).click(function(e){
			e.stopPropagation();//Prevents the event from bubbling up the DOM tree
			// selectNode = $(this).siblings();
			var needCloseNodes = $(this).parent().siblings();
			for (var i = 0; i < needCloseNodes.length; i++) {
				needCloseNodes.eq(i).toggle(500);
			}
		});
	}
}

function compare(node,Value){
	if (node.children.length != 0) {
		var label =  node.children().eq(0);
		if (label.text() == searchValue) {
			label.children().eq(0).css("color","green");
			// $("*").css("display","initial");
			label.parents().show();
		}else if(node.children.length != 1){
			for (var i = 1; i < node.children().length; i++) {
			compare(node.children().eq(i),Value);
		}
		}else
		{
			return;
		}
		
	}
	

}

// //广度优先遍历
// function bfs(node){


// 	console.log(node);
// 	data.push(node);
// 	for (var i = 0; i < node.children().length; i++) {
// 		tempArray.push(node.children().eq(i));
// 	}
// 	var i  =0;
// 	while(tempArray.length !=0){
		
// 		var deleteNode  = tempArray.shift();
// 		console.log(deleteNode);
// 		data.push(deleteNode);
// 		if (deleteNode.children().length != 0) {
// 			console.log(deleteNode);
// 				for (var j = 0; j < deleteNode.children().length; j++) {
// 					tempArray.push(deleteNode.children().eq(j));
// 				}
// 		}

// 	}
// }

var dataContent= {
	title:"标题1",
	children:[
		{
			title:"标题2",
			children:[
				{
					title:"标题3",
					children:[

					]
				}
			]
		},
		{
			title:"标题2",
			children:[]
			// [
			// 	{
			// 		title:"level3",
			// 		children:[

			// 		]
			// 	}
			// ]
		}
	]

};

init();
