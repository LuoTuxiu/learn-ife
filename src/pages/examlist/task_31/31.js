var data = [
  {
    name:"guangdong",value:"广东省",sub:[{
      name:"shenzhendaxue",value:"深圳大学",
    },
    {
      name:"zhongshandaxe",value:"中山大学",
    },]
  },
  {
    name:"shanghai",value:"上海市",sub:[{
      name:"shanghaijiaotong",value:"上海交通大学",
    },
    {
      name:"shanghaicaijing",value:"上海财经大学",
    }
    ]
  }
]

var selectValue = 0;

function doEvent(){
  $("input[name='radio']").change(function(){
    if ($(this).val() == 1  ) {
      $(".contentDiv").addClass("hidden");
      $(".selectDiv").toggleClass("hidden");
    } else {
      $(".selectDiv").addClass("hidden");
      $(".contentDiv").toggleClass("hidden");
    }
  });

  $(".leftSelect").change(function(event) {
    /* Act on the event */
    selectValue = $(this).get(0).selectedIndex;
    rendar();
  });


  

  
}

function rendar(){
    var para  = $(".rightSelect");
    para.empty();
    for (var j = 0; j < data[selectValue].sub.length; j++) {
      var object = data[selectValue].sub[j]
      
      var newPara  = $("<option></option>").text(object.value);
      para.append(newPara);
      console.log(object);
    }
}


function init(){
    doEvent();

    for (var i = 0; i < data.length; i++) {
    var object = data[i];
    var para  = $(".leftSelect");
    var newPara  = $("<option></option>").text(object.value);
    para.append(newPara);


  }

  rendar();
}

init();