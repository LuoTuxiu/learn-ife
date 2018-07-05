    var inputValue;
    var pwdValue;
    var checkNum = [false,false,false,false,false];

    var validateRules = {
    rules:{
        name:{
          required:true,
        },
        pwd:{
          required:true,

        },
        pwdConfirm:{
          required:true,
        },
        email:{
          required:true,
        },
        phone:{
          required:false,
        }
    },
    message:{
        name:{
          nomal:"必填，长度为4-161个字符",
          success:"名称可用",
          fail:"名称不可用"
        },
        pwd:{
          nomal:"必填，长度为4-16个字符",
          success:"密码可用",
          fail:"密码不可用"
        },
        pwdConfirm:{
          nomal:"必填，长度为4-16个字符",
          success:"确认密码可用",
          fail:"确认密码不可用"
        },
        email:{
          nomal:"必填，长度为4-16个字符",
          success:"邮箱可用",
          fail:"邮箱不可用"
        },
        phone:{
          nomal:"必填，长度为4-1656个字符",
          success:"电话可用",
          fail:"电话不可用"
        } 
    }
};



function init(){
    // doEvent();
    
    validate(validateRules);
    
}


function validate(validateRule){
    var rules  = Object.keys(validateRule.rules);
    var allMessages = validateRule.message;
    for (var i = 0; i < rules.length; i++) {
        var object = rules[i];
        console.log(object);

        var messages  = allMessages[rules[i]];
        console.log(messages);


        $("#" + rules[i]).focus(function(event) {
            /* Act on the event */
            var name  = $(this).attr("name");
            var j = rules.indexOf(name);

            var description = $(".helpLabel").eq(j);
            description.text(allMessages[name].nomal);
            description.css("color","black");
          });      

        $("#" + rules[i]).blur(function(event) {
            /* Act on the event */
            var name  = $(this).attr("name");
            var j = rules.indexOf(name);
            var description = $(".helpLabel").eq(j);
            var nameValue = $(this).val();
            
            var flag;
            switch(name)
            {
                 case "name":
                    flag=/^[a-zA-Z0-9_]{4,16}$/.test(nameValue);
                 break;
                 case "pwd":
                    var countLength  = 0;
                    for (var i = 0; i < nameValue.length; i++) {
                      if (nameValue.charCodeAt(i) >= 0 && nameValue.charCodeAt(i) <= 128) {
                        countLength+=1;
                      } else {
                        countLength+=2;
                      }
                    }
                    if (countLength <4 ||  countLength > 16) {
                      flag = false;
                    }else{
                      flag = true;
                    }
                 break;
                 case "pwdConfirm":
                    flag= (nameValue == $("#pwd").val() && nameValue.length!= 0);
                 break;
                 case "email":
                    flag=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(nameValue); 
                 break;
                 case "phone":
                    flag=/^1[34578]\d{9}$/.test(nameValue); 
                 break;
                 default:
                 break;
            }

            if( flag ){  
                  description.text(allMessages[name].success);
                  description.css("color","green");  
                  checkNum[j] = true;
              }else{  
                  description.text(allMessages[name].fail);
                  description.css("color","red");
                  checkNum[j] = false;  
              }  
      });     
    }

     $("#confirm").click(function(){
        for (var ii = 0; ii < rules.length; ii++) {
            var object = rules[ii];
            $("#" + rules[ii]).focus();
        }
        $("#" + rules[rules.length-1]).blur();
        var ifTure = true;
        for (var i = 0; i < checkNum.length; i++) {
            if (validateRule.rules[rules[i]].required) {
                ifTure = ifTure && checkNum[i];
            }
           
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

init();
