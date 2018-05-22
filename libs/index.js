$(function(){
	// 礼物分类子菜单功能实现
	$(".fen").on("mouseover",function(){
		// console.log(this)
		$(".show").css({
			display:"block"
		});
	})
	$(".fen").on("mouseout",function(){
		$(".show").css({
			display:"none"
		})
	})	
	
	$(".show").on("mouseover",function(){
		$(this).css({
			display:"block"
		})
	})
	$(".show").on("mouseout",function(){
		$(this).css({
			display:"none"
		})
	})
	// 送礼导航子菜单功能实现ction(){
	// 	$(".list1-show")
	// $(".list1").on("mouseover",fun
	// 	.css({
	// 		display:"block"
	// 	})
	// })
	// $(".list1").on("mouseout",function(){
	// 	$(".list1-show").on("mouseover",function(){
	// 		$(this).css({
	// 			display:"block"
	// 		})
	// 	})
	// 	$(".list1-show").on("mouseout",function(){
	// 		$(this).css({
	// 			display:"none"
	// 		})
	// 	})
		
	// })
	
	$(".list1").on("mouseover",function(){
		$(".list1-show")
		.stop()
		.fadeIn()
		.end()
		.stop()
		.fadeOut();
	})
	$(".list1").on("mouseout",function(){
		// $(".list1-show")
		// .stop()
		// .fadeOut();
		
		$(".list1-show").on("mouseover",function(){
			$(this).css({
				display:"block"
			})
		})
	
		$(".list1-show").on("mouseout",function(){
			$(this).css({
				display:"none"
			})
		})
	})
	
	// 登录子菜单
	$(".login").on("mouseover",function(){
		$(".user-signin")
		.show()
		.css({zIndex:"99"});
	})
	$(".login").on("mouseout",function(){
		// $(".user-signin")
		// .hide();
		$(".user-signin").on("mouseover",function(){
			$(this).css({display:"block"})
		})
		$(".user-signin").on("mouseout",function(){
			$(this).css({display:"none"})
		})
	})
	$(".shopping").on("mouseover",function(){
		$(".user-regis").css({display:"block",zIndex:"99"});
	})
	$(".shopping").on("mouseout",function(){
		$(".user-regis").on("mouseover",function(){
			$(this).css({display:"block",zIndex:"999"})
		})
		$(".user-regis").on("mouseout",function(){
			$(this).css({
				display:"none",
				zIndex:"-1"
			})
		})
	})

	// QQ在线交谈
	$(".follow-box4").on("mouseover",function(){
		$("a").css({
			borderColor:"#d93732"
		})
	})
	$(".follow-box4").on("mouseout",function(){
		$("a").css({
			borderColor:""
		})
	})
})

