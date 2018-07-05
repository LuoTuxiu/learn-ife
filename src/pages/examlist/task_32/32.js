
function doEvent(){
  $("#add").click(function(event) {
    /* Act on the event */
    json = jQuery.parseJSON($(".textInput").val());
    rendar();
  });

  $("#styleSelect").change(function(event) {
    /* Act on the event */
    console.log($(this).val());
    if ($(this).val() == "样式1") {
        $(".error").css("display","initial");
    } else {
        $(".error").css("display","block");
    }
  });

  $("#submit").click(function(event) {
    /* Act on the event */
    var flag = true;
    for (var i = 0; i < json.length; i++) {
      var object = json[i];
      flag = flag && object.isSuccess;
    }
    if (flag) {
      alert("验证成功啦啦啦");
    } else {
      alert("验证失败咯咯咯");
    }
    });

}




function init(){
    doEvent();
}

function rendar(){
    var myform  = $("#myform");
    myform.empty();
    for (var i = 0; i < json.length; i++) {
      var object = json[i];
      var label  = $("<label></label>");
      label.text(object.label);

      var input  = $("<"+ object.type +" class='myInput' type='text'>");
      var div =  $("<div></div>");
      input.attr('index', i);
      div.append(label);
      div.append(input);

      myform.append(div);

      $(input).focus(function(){
           
            var index = $(this).attr("index");
            var object = json[index];
            var spanPara  = $("<span></span>");
            spanPara.text(object.rules);
            if ($(this).next().length == 0) 
              { 
                $(this).after(spanPara);
              }

    
      });

      $(input).blur(function(event) {
        /* Act on the event */
        var index = $(this).attr("index");
            var object = json[index];
            var inputData = $(this).val();
            var spanPara;
            if ($(this).nextAll().length != 0) {
              spanPara = $(this).next();
            }else{
              spanPara  = $("<span></span>");
              $(this).after(spanPara);
            }
            var ifTestTrue = true;
            for(var key in object.validator){
                var value  =  object.validator[key];
                if (value) {
                  ifTestTrue = validatorText(key,value,inputData) && ifTestTrue;
                }
                
            }
           
            if (ifTestTrue) {
              spanPara.removeClass('error');
              spanPara.text(object.success);

            } else {
              spanPara.addClass('error');
              spanPara.text(object.fail);

            }
            object.isSuccess = ifTestTrue;
            
      });
    }
}


function validatorText(key,value,inputData){
  var flag =true;
  var reg ="";
  switch (key){
    case "minlength":
      reg = "^\\d{" + value + ",}$";
    break;
    case "email":
      reg = "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*"; 
    break;
    case "mobilephone":
       reg = "^0?(13|14|15|18)[0-9]{9}$";
    break;
    case "url":
       reg = "[a-zA-z]+:\/\/[^\\s]*";
    break;
    default:

    break;
  }
  var regExp  = new RegExp(reg);
  flag = regExp.test(inputData);
  return flag;
}

init();