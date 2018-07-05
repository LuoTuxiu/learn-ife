    var inputValue;
    var pwdValue;
    var checkNum = [false,false,false,false,false];
init();
function init(){
    // doEvent();
    $("#submitForm").validate({
      rules:{
        name:{
          required:true,
          minlength:4,
          maxlength:16,
        },
        pwd:{
          required:true,

        },
        pwdConfirm:{
          required:true,
          equalTo:"#pwd",
        },
        email:{
          required:true,
          email:true,
        },
        phone:{
          required:true,
          length:11,
        }


      },
      messages:{
        name:"请输入您的名字",
        pwd:"请输入密码",
        pwdConfirm:"请再次输入密码",
        email:"请输入邮箱",
        phone:"请输入电话",     
      }
    });


  $("#submitForm").validate({
    wrapper:"p",
  });

    
}

function doEvent(){
    $("#name").focus(function(event) {
        /* Act on the event */
        var description = $(".helpLabel").eq(0);
        description.text("必填，长度为4-16个字符");
        description.css("color","black");
      });

      $("#name").blur(function(event) {
        /* Act on the event */
        var description = $(".helpLabel").eq(0);
        var nameValue = $(this).val();
        if (nameValue.length == 0) {
             description.text("名字不能为空");
             description.css("color","red");
             checkNum[0] = false;
             return;
        }
       var countLength  = 0;
        for (var i = 0; i < nameValue.length; i++) {
          if (nameValue.charCodeAt(i) >= 0 && nameValue.charCodeAt(i) <= 128) {
            countLength+=1;
          } else {
            countLength+=2;
          }
        }
        if (countLength <4 ||  countLength > 16) {
          description.text("输入字符长度不符");
          description.css("color","red");
          checkNum[0] = false;
        }else{
          description.text("名称可用");
          description.css("color","green");
          checkNum[0] = true;
        }
      });


      $("#pwd").focus(function(event) {
        /* Act on the event */
        var description = $(".helpLabel").eq(1);
        description.text("必填，长度为4-16个字符");
        description.css("color","black");
      });

      $("#pwd").blur(function(event) {
        /* Act on the event */
        var description = $(".helpLabel").eq(1);
        pwdValue = $(this).val();
        if (pwdValue.length == 0) {
             description.text("密码不能为空");
             description.css("color","red");
             checkNum[1] = false;
             return;
        }
       var countLength  = 0;
        for (var i = 0; i < pwdValue.length; i++) {
          if (pwdValue.charCodeAt(i) >= 0 && pwdValue.charCodeAt(i) <= 128) {
            countLength+=1;
          } else {
            countLength+=2;
          }
        }
        if (countLength <4 ||  countLength > 16) {
          description.text("输入密码长度不符");
          description.css("color","red");
          checkNum[1] = false;

        }else{
          description.text("密码可用");
          description.css("color","green");
          checkNum[1] = true;
        }
      });


      $("#pwdConfirm").focus(function(event) {
        /* Act on the event */
        var description = $(".helpLabel").eq(2);
        description.text("必填，长度为4-16个字符");
        description.css("color","black");
      });

      $("#pwdConfirm").blur(function(event) {
        /* Act on the event */
        var description = $(".helpLabel").eq(2);
        var nameValue = $(this).val();
        if (nameValue.length == 0) {
             description.text("密码不能为空");
             description.css("color","red");
             checkNum[2] = false;
             return;
        }
        if (nameValue == pwdValue) {
          description.text("密码输入一致");
          description.css("color","green");
          checkNum[2] = true;
        }else{
          description.text("密码输入不一致");
          description.css("color","red");
          checkNum[2] =  false;
        }
      
      });

      $("#email").focus(function(event) {
        /* Act on the event */
        var description = $(".helpLabel").eq(3);
        description.text("必填，长度为4-16个字符");
        description.css("color","black");

      });

      $("#email").blur(function(event) {
        /* Act on the event */
        var description = $(".helpLabel").eq(3);
        var nameValue = $(this).val();
        if (nameValue.length == 0) {
             description.text("邮箱不能为空");
             description.css("color","red");
             checkNum[3] =false;
             return;
        }
        if (verifyemail(nameValue)) {
            description.text("邮箱格式正确");
            description.css("color","green");
            checkNum[3] =true;
        } else {
            description.text("邮箱格式错误");
            description.css("color","red");
            checkNum[3] = false;
        }
      
      });


      $("#phone").focus(function(event) {
        /* Act on the event */
        var description = $(".helpLabel").eq(4);
        description.text("必填，长度为4-16个字符");
        description.css("color","black");
      });

      $("#phone").blur(function(event) {
        /* Act on the event */
        var description = $(".helpLabel").eq(4);
        var nameValue = $(this).val();
        if (nameValue.length == 0) {
             description.text("电话不能为空");
             description.css("color","red");
             checkNum[4] = false;
             return;
        }
        if (checkPhone(nameValue)) {
            description.text("手机格式正确");
            description.css("color","green");
            checkNum[4] =true;
        } else {
            description.text("手机格式错误");
            description.css("color","red");
            checkNum[4] =false;
        }
      
      });


      $("#confirm").click(function(){
        var ifTure = true;
        for (var i = 0; i < checkNum.length; i++) {
           ifTure = ifTure && checkNum[i]
        }

        if (ifTure) {
            alert("验证成功啦"); 
            return true;    
        } else {
            alert("验证失败咯咯咯咯咯");
            return false;
        }

      });
}

//检测邮箱
function verifyemail(str){  
      var reg=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;  
      if( reg.test(str) ){  
          return true;  
      }else{  
          return false;  
      }  
}

//检测手机号
function checkPhone(str){ 
      var reg=/^1[34578]\d{9}$/;  
      if( reg.test(str) ){  
          return true;  
      }else{  
          return false;  
      } 
}
