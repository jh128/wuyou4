$(function(){
	// 礼物分类子菜单功能实现
	$(".fen").on("mouseenter",function(){
		// console.log(this)
		$(".show").css({
			display:"block"
		});
	})
	$(".fen").on("mouseleave",function(){
		$(".show").css({
			display:"none"
		})
	})	
	
	$(".show").on("mouseenter",function(){
		$(this).css({
			display:"block"
		})
	})
	$(".show").on("mouseleave",function(){
		$(this).css({
			display:"none"
		})
	})
	// 送礼导航子菜单
	$(".list1").on("mouseenter",function(){
		$(".list1-show").css({
			display:"block"
		})
	})
	$(".list1").on("mouseleave",function(){
		// $(".list1-show").hide();
		
		$(".list1-show").on("mouseenter",function(){
			$(this).css({
				display:"block"
			})
		})
		

		$(".list1-show").on("mouseleave",function(){
			$(this).css({
				display:"none"
			})
		})

	})
	
	// 登录子菜单
	$(".login").on("mouseenter",function(){
		$(".user-signin")
		.show()
		.css({zIndex:"99"});
	})
	$(".login").on("mouseleave",function(){
		// $(".user-signin")
		// .hide();
		$(".user-signin").on("mouseenter",function(){
			$(this).css({display:"block"})
		})
		$(".user-signin").on("mouseleave",function(){
			$(this).css({display:"none"})
		})
	})
	$(".shopping").on("mouseenter",function(){
		$(".user-regis").css({display:"block",zIndex:"99"});
	})
	$(".shopping").on("mouseleave",function(){
		$(".user-regis").on("mouseenter",function(){
			$(this).css({display:"block",zIndex:"999"})
		})
		$(".user-regis").on("mouseleave",function(){
			$(this).css({
				display:"none",
				zIndex:"-1"
			})
		})
	})

	// QQ在线交谈
	$(".follow-box4").on("mouseenter",function(){
		$("a").css({
			borderColor:"#d93732"
		})
	})
	$(".follow-box4").on("mouseleave",function(){
		$("a").css({
			borderColor:""
		})
	})
})

