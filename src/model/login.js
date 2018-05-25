$(function(){

	$(".btn-login").on("click",function(){
        
		var username = $("#usr").val(); 
		var pwd = $("#pwd").val();
        var reg = /^1[0-9]]\d{10}$/;
        if(username=="" || pwd==""){
            return 0;
        }else if(!reg.test(username)){
            alert("手机号或邮箱输入错误。");
        }
		var opt = {
			url:"http://localhost:80/liwuyou/php/login.php", 
			type:"POST",
			data:{username:username,password:pwd,type:"login"}
		}
		$.ajax(opt)
		.then(function(res){
			console.log(res);
		})
	})

	 $(".btn-register").on("click",function(){
            
            //把登陆信息交给后台验证;
            var tele = $("#tele").val();
            // console.log(tele)
            var pwd = $("#pwd").val();
            var pwd2 = $("#pwd2").val();
            // email test
            var regTele = /^1[0-9]{10}$/;
            if(tele == ""){
            	return 0;
            }else if(!regTele.test(tele)){
            	alert("error");
            }

            var opt = {
                url:"http://localhost:80/liwuyou/php/register.php",
                type:"POST",
                data:{tele:tele,pwd:pwd,pwd2:pwd2,type:"register"}
            }
            $.ajax(opt)
            .then(function(res){
                console.log(res);
            })
        })

})