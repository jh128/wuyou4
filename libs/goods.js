$(function(){
	//产品图加载……
	var $thumbslist = $("#goods_img_list").children("img"),
	$singlelist = $(".jpg").children("img"),
	$loadbigimg = $(".load-big-img"),
	imgdefereds=[],
	$loading = $(".jpg .loading"),
	currentindex = 0,
	length = 0, 
	firstclick = true,
	previndex = 999;
	$loadbigimg.each(function(ind, ele) {
        var dfd = $.Deferred();
		$(ele).bind('load',function(){
			dfd.resolve();
		}).bind('error',function(){
			dfd.resolve();
		});
		if(this.complete){//IE兼容
			dfd.resolve();
		}
		imgdefereds.push(dfd);
    });
	var bindEvent = function(){
		$loading.hide();
		$thumbslist.each(function(ind, ele) {
			$(ele).mouseenter(function(){
				$thumbslist.removeClass("focus");
				$thumbslist.eq(ind).addClass("focus");
				$singlelist.hide();
				$singlelist.eq(ind).show();
			});
		});
	}
	$.when.apply(null,imgdefereds).done(function(){
		bindEvent();
		init_event();
	});
	function init_screen(){	
		var $naturalpic = $("#naturalpic"),$tablist = $("#tablist");
		var dfd_screen = $.Deferred(),screendefereds = [];
		$.each(gallery,function(ind,ele){
			var img = document.createElement("img");
			var li = document.createElement("li");
			img.src = ele.naturalpic;
			//img.className = "test"+ind;
			if(ind == currentindex){ 
				li.className = "focus";
				img.className = "curr";
			}
			$naturalpic.append(img);
			$tablist.append(li);
			$(img).bind('load',function(){
				dfd_screen.resolve();
			}).bind('error',function(){
				dfd_screen.resolve();
			});
			if(img.complete){//IE兼容
				dfd_screen.resolve();
			}
			screendefereds.push(dfd_screen);
		});
		length = screendefereds.length;
		$.when.apply(null,screendefereds).done(function(){
			init_screen_event();
		});
	}
	function show_screen(currentindex){
		if(currentindex!=previndex){
			var $naturalpic = $("#naturalpic img").not(".loading"),$tablist = $("#tablist li")
			$tablist.removeClass("focus").eq(currentindex).addClass("focus");
			//console.log("previndex:"+previndex);
			//console.log("currentindex:"+currentindex);
			$naturalpic.each(function(ind, ele) {
				if(ind === previndex){
					$(ele).css("z-index",12).css("display","inline");
				}else if(ind === currentindex){
					$(ele).css("z-index",13).css("display","none");
				}else{				
					$(ele).css("z-index",10).css("display","none");
				}
			});
			$naturalpic.eq(currentindex).fadeIn(200,function(){
				$naturalpic.eq(previndex).css("display","none");
			});
		}
	}
	function init_screen_event(){
		var $screen_image = $("#screen_image"),$naturalpic = $("#naturalpic");
		$naturalpic.find(".loading").hide();
		$("body").on("click","#evt_close",function(){
			$screen_image.fadeOut(300);
		});
		$("body").on("click","#evt_left",function(){
			if(currentindex>0) {
				previndex = currentindex;
				currentindex--;
			}else{
				previndex = currentindex;
				currentindex = length - 1;
			}
			show_screen(currentindex);
		});
		$("body").on("click","#evt_right,#naturalpic img",function(){
			if(currentindex+1<length){
				previndex = currentindex;
				currentindex++;
			}else{
			 	previndex = currentindex;
				currentindex = 0;
			}
			show_screen(currentindex);
		});
		$("#tablist").children("li").each(function(ind, ele) {
			$(ele).on("click",function(){
				previndex = currentindex;
				currentindex = ind;
				show_screen(ind);
			});
		});
	}
	function init_event(){	
		var $screen_image = $("#screen_image");	
		$singlelist.each(function(ind, ele) {
            $(ele).on("click",function(){
				currentindex = ind;
				$screen_image.show();
				if(firstclick){
					init_screen();
					firstclick=false;
				}else{
					show_screen(ind);
				}
			});
        });		
	}
//-------------------------------------------详情页描述标题---------------------------------------------------
var imgdefereds=[];
$("#discription").find("img").each(function(ind, ele) {
    var dfd = $.Deferred();
	$(ele).bind('load',function(){
		dfd.resolve();
	}).bind('error',function(){
		dfd.resolve();
	});
	if(this.complete){//IE兼容
		dfd.resolve();
	}
	imgdefereds.push(dfd);
});
$.when.apply(null,imgdefereds).done(function(){
	loadGoodsTitle();
});
function loadGoodsTitle(){
	try{
		var $header = $("#detail_header"),
		title_top = $header.offset().top,
		$temp = $("#title_temp"),
		title_height = $header.outerHeight(true),
		flag = true,
		elseflag = true,
		sizeTop = $("#size").offset().top-90,
		commentTop = $("#comment").offset().top-90,
		consultTop = $("#consult").offset().top;
		
		var sizePos = $("#size").offset().top-90,
		commentPos = $("#comment").offset().top-90,
		consultPos = $("#consult").offset().top-90,
		guessyoulikePos = $("#guessyoulike").offset().top-90,$service = $(".gds_service"),$qq_chat = $("#goods_qq_chat");
		//console.log("sizePos:"+sizePos+"|commentPos:"+commentPos+"|consultPos:"+consultPos+"|guessyoulikePos:"+guessyoulikePos);
		$(window).scroll(function(){	
			var scrollTop = $(this).scrollTop()+10;
			if(scrollTop>title_top){
				if(flag){
					$header.css({"position":"fixed","top":"-"+title_height+"px"});
					$temp.show();
					$header.animate({top:0},300,function(){$service.fadeIn(300);});
					flag = false;
					elseflag = true;
					$qq_chat.stop().fadeOut(300);
				}
			}else{
				if(elseflag){
					$header.css("position","static");
					$temp.hide();
					flag = true;
					elseflag = false;					
					$service.hide();
					$qq_chat.stop().fadeIn(300);
				}
			}
			//console.log(scrollTop);
			if(scrollTop>=sizePos&&scrollTop<commentPos){
				$header.find("a").eq(1).addClass("focus").siblings().removeClass("focus");
			}else if(scrollTop>=commentPos&&scrollTop<consultPos){
				$header.find("a").eq(2).addClass("focus").siblings().removeClass("focus");
			}else if(scrollTop>=consultPos){
				$header.find("a").eq(3).addClass("focus").siblings().removeClass("focus");
			}else{
				$header.find("a").eq(0).addClass("focus").siblings().removeClass("focus");
			}
		});
		var $header_link = $header.find("a");
		$header_link.each(function(ind, ele) {
	        		
			$(ele).on("click",function(){
				var id = $(this).data("param");
		        var top = $(id).offset().top;
				$header_link.removeClass("focus");
				$header_link.eq(ind).addClass("focus");
				$("body,html").animate({scrollTop:top-90},300);
			});		
	    });
		$(".slider").slider();
		
	}catch(e){
		console.log(e);
	}
}
	
	
//----------------------加入购物车----------------------------------
	$('#add_to_cart').on('click',function(){
		if($(this).hasClass("disabled")) return false;
		if($(this).data('is_no_stock') == '1'){
			no_stock();
			return false;
		}
		goods = new Object();
		spec_arr = new Array();
		fittings_arr = new Array();
		fittings_spec = new Array();
		fittings = new Array();
		if($('#goodsAttrListCount').val() > 0 ){
			if($("#spec_selected").val() == 0){
				alert('请选择规格');
				return false;
			}
			spec_arr.push($("#spec_selected").val());
			quick = 1;
		}
		number = 1;
		goods.fittings = fittings;
		goods.quick = 1;
		goods.spec = spec_arr;
		goods.goods_id = goods_id;
		goods.number = number;
		goods.shipping_date = '';//鲜花送货时间
		goods.parent = 0;
		jQuery.post( 'flow.php?step=add_to_cart&check_diy=0','goods=' + BASE64.encode(objToJSONString(goods)),function(data){
			if (data.error > 0) {
				// 如果需要缺货登记，跳转
				if (data.error == 2) {
					//alert(data.message);
					no_stock();
				}
				else if (data.error == 6){
					//没选规格
						
					art.dialog({
						id:"no_stock",
						title:"",
						lock:true,
						background:"#000",
						opacity:0.15,
						content:data.message
					});
					//alert(data.message);
				}
				else if(data.error == 10){
					//定制
					
					art.dialog({
						id:"no_stock",
						title:"",
						lock:true,
						background:"#000",
						opacity:0.15,
						content:data.message
					});
					//alert(data.message);
				}else{
					art.dialog({
						id:"no_stock",
						title:"",
						lock:true,
						background:"#000",
						opacity:0.15,
						content:data.message
					});
					//alert(data.message);
				}
			}else{
				window.location.href="flow.php";
				//alert(data.content);
			}
		},'JSON' );
		
	});
//------------------------缺货登记-------------------------
	function no_stock(){
		var html = '<div class="no-stock bg-fff">'+
'<h2 class="p-x-20">缺货登记</h2>'+
'<p class="m-t-31 p-x-20">此礼物热销暂无现货，通常1-5日内会到货。您可以先进行缺货登记并留下联系方式，到货后我们会优先为您预留并第一时间通知您。为感谢您的等待，届时您可以享受白金会员价购买此商品！</p>'+
'<div class="form-contact m-t-40">'+
'<table width="100%">'+
'<tr><td width="12%"><b>Email：</b></td><td width="54%"><input type="input" name="email"></td><td><span class="f-b28850">还没有填写邮件地址</span></td></tr>'+
'<tr><td><b>手机号码：</b></td><td><input type="input" name="phone"></td><td><span class="f-b28850">到货时会有短信通知</span></td></tr>'+
'<tr><td>&nbsp;</td><td>&nbsp;</td><td><p class="error-msg f-d93732 tc">&nbsp;</p><a href="javascript:void(0)" class="btn-red-single ani-bg tc" id="save_contact">保存</a></td></tr>'+
'</table>'+
'</div>'+
'</div>';
		art.dialog({
			id:"no_stock",
			title:"",
			lock:true,
			background:"#000",
			opacity:0.15,
			padding: '40px 40px 0',
			content:html
		});
	}

//-----------------------缺货登记事件----------------------
	$("body").on("click","#save_contact",function(){
		var $email = $("input[name=email]"),$phone = $("input[name=phone]"),$errormsg = $(this).prev(".error-msg"),emailVal = $email.val(),phoneVal = $phone.val();
		if(!emailVal && !phoneVal){
			$errormsg.html('email和手机号至少要填一项');
		}else if(emailVal && !checkEmail(emailVal)){
			$errormsg.html('请输入正确邮箱');
		}else if(phoneVal && !validPhone(phoneVal)){
			$errormsg.html('请输入正确手机号');
		}else{
			$errormsg.html('&nbsp;');
			
			$.post('user.php?is_ajax=1&act=act_add_booking',{id:goods_id,number:1,email:emailVal,tel:phoneVal},function(data){
				if(data.error == 0){
					art.dialog.list["no_stock"].content('<p style="padding-bottom:40px; width:805px; text-align:center">提交成功,感谢您对我们的信任和支持！</p>');
				}else{
					art.dialog.tips('<p style="padding-bottom:40px; width:805px; text-align:center">'+data.message+'</p>');
				}
				
			},'json');
			
		}
	});
	
	//------------------------定制----------------------------
	$("#product_diy").on("click",function(){
		if($(this).hasClass("disabled")) return false;
		if($(this).data('is_no_stock') == '1'){
			no_stock();
			return false;
		}
		var goods_attr_id = $("#spec_selected").val();
		var url = 'goods.php?act=diy_info&id='+goods_id+'&goods_attr_id='+goods_attr_id;
		$.get(url,function(data){
			console.log(data);
			if(data.error == 0){
				if(data.data.diy_type == '1008'){
					//文字定制
					diy_pop(data.data.inputs);
				}else{
					//图片定制
					goto_diy();
				}
			}else{
				alert('找不到定制信息');
			}
		},'json');
	
	});	
	function diy_pop(inputs){
		
		var html = '<div class="diy-pop"><h3>确认定制模板和内容</h3>';
		for(var i=0;i<inputs.length;i++){
			html += '<p class="lh2 m-t-40">'+inputs[i].title+'</p>';
			if(inputs[i].max >= 20){
				html += '<p><textarea class="value-input" type="text" name="diy_info['+i+'][value]"></textarea><input type="hidden" value="'+inputs[i].title+'" name="diy_info['+i+'][title]"/></p>';
			}else{
				html += '<p><input class="value-input" type="text" name="diy_info['+i+'][value]"><input type="hidden" value="'+inputs[i].title+'" name="diy_info['+i+'][title]"/></p>';
			}
			
		}
		html += '<p class="tr m-t-31"><a href="javascript:void(0)" class="btn-red-single" id="buy_to_cart">加入购物车</a></p></div>';
		var dialog_diy = art.dialog({
			id:"diy_pop",
			title:"",
			fixed: true,
			lock:true,
			background:"#000",
			opacity:0.15,
			content:html
		});
		var $diy_template = $("#diy_template"),$dialog = $(".aui_state_focus"),left = $diy_template.length>0?$diy_template.offset().left:false,top = $diy_template.length>0?$diy_template.offset().top:false,width = $diy_template.length>0?$diy_template.width():0;
			if(left && top){
				$("body,html").animate({scrollTop:top-140},300,function(){
					$dialog.animate({left:left+width+"px"},800);
				});
			}
	}
	function goto_diy(){
		var goods = new Object();
		var spec_arr = new Array();
		var fittings_arr = new Array();
		var fittings_spec = new Array();
		var fittings = new Array();
		if($('#goodsAttrListCount').val() > 0 ){
			if($("#spec_selected").val() == 0){
				alert('请选择规格');
				return false;
			}
			spec_arr.push($("#spec_selected").val());
			quick = 1;
		}
		
		var number = 1;
		
		
		goods.fittings = fittings;
		goods.quick = 1;
		goods.spec = spec_arr;
		goods.goods_id = goods_id;
		goods.number = number;
		goods.shipping_date = '';//鲜花送货时间
		goods.parent = 0;
		var urlStr = objToJSONString(goods);
		var encodeUrlStr = BASE64.encode(urlStr);
		window.location.href = 'diy.php?act=submitData&goods_id=' + goods_id
				+ '&goods=' + encodeUrlStr;
	}
	$("body").on("click","#buy_to_cart",function(){
//		var tempno = $("input[name=tempno]").val(),
//			temptxt = $("textarea[class=temptxt]").val();
//		if(tempno.length == 0 || temptxt.length == 0){
//			art.dialog.tips('请填写模版信息');
//			return false;
//		}
		var error = '';
		var diy_info = [];
		$('.diy-pop .value-input').each(function(){
			var value = $(this).val();
			if(value == ''){
				error += '请填写模版信息';
				return;
			}else{
				var diy = {
					"title":$(this).next().val(),
					"value":value
				};
				diy_info.push(diy);
			}
		});
		if(error){
			art.dialog.tips(error);
			return false;
		}
		var goods = new Object();
		var spec_arr = new Array();
		var fittings_arr = new Array();
		var fittings_spec = new Array();
		var fittings = new Array();
		if($('#goodsAttrListCount').val() > 0 ){
			if($("#spec_selected").val() == 0){
				alert('请选择规格');
				return false;
			}
			spec_arr.push($("#spec_selected").val());
			quick = 1;
		}
		
		var number = 1;
		
		goods.diy_info = diy_info;
		goods.fittings = fittings;
		goods.quick = 1;
		goods.spec = spec_arr;
		goods.goods_id = goods_id;
		goods.number = number;
		goods.shipping_date = '';//鲜花送货时间
		goods.parent = 0;
		
		jQuery.post( 'flow.php?step=add_to_cart&check_diy=1&json=1','goods=' + encodeURIComponent(objToJSONString(goods)),function(data){
			if (data.error > 0) {
				// 如果需要缺货登记，跳转
				if (data.error == 2) {
					alert(data.message);
				}
				else if (data.error == 6){
					//没选规格
					alert(data.message);
				}
				else if(data.error == 10){
					//定制
					alert(data.message);
				}else{
					alert(data.message);
				}
			}else{
				window.location.href="flow.php";
				//alert(data.content);
			}
		},'JSON' );
		//$.ajax({})
	});
	
	//----------------------规格选择------------------------------------

	$('.select_attr').on('click',function(){
		//样式
		$(this).parent().find('.select_attr').removeClass('focus');
		$(this).addClass('focus');
		//功能
		
		var attr_name = $(this).data('spec');
		var type_id = $(this).data('spec-key');
		var arr = get_spec_key_by_val( type_id + '-' + attr_name , spec_info);//spec_info from global
		var spec_count = $('#goodsAttrListCount').val();
		var k = arr[0];
		var keys = arr[1];
		if(spec_count == 1){//如果是单选
			var attr_price = spec_info[k[0]]['price'];
			var attr_id = spec_info[k[0]]['goods_attr_id'];
			var number = spec_info[k[0]]['number'];
			var name = objToJSONString(spec_info[attr_id]['value']);
			var img_id = spec_info[k[0]]['img_id'];
			if(number > 0){
				//有库存
				$('#attr_'+type_id).val(type_id+'-'+attr_name);
				$('#spec_selected').val(attr_id);
				change_img(img_id);
				update_price(attr_price,name);
				update_buybtn(true);
			}
			else{
				//无库存
				$('#attr_'+type_id).val('');
				$('#spec_selected').val('');
				change_img(img_id);
				//art.dialog.tips('抱歉，此款暂时缺货，请选其它款式');
				//alert('抱歉，此款暂时缺货，请选其它款式');
				update_buybtn(false);
				return;
			}
		}
		else if(spec_count > 1){//如果是多选的话
			$('#attr_'+type_id).val(type_id+'-'+attr_name);//把已选的规格写入input中
			var selected_attr = [];
			$('.attr_selected').each(function (){//已选的规格
				if($(this).val()!='' && $(this).val()!=undefined)
					selected_attr.push($(this).val());
			});
			
			//处理选择一个属性后和这个属性没有组合的属性改为不可选.
			var attrs = new Array;
			var tem_attrs = new Array;
			for(var i = 0 ; i < keys.length ; i++){
				tem_attrs = keys[i].split('→_→');
				tem_attrs.remove(tem_attrs.getIndexByValue(type_id+'-'+attr_name));
				attrs = attrs.concat(tem_attrs);
			}
			$(".attr-box a:not(.s_"+type_id+")").each(function(){
				var data_attr = $(this).attr('data-attr');
				if( ! attrs.in_array(data_attr)){
					$(this).hide();

				}else{
					data_attr = data_attr.split('-');
					$(this).show();
				}
			});
			
			//判断是完成了规格的选择.
			if(selected_attr.length == spec_count){
				//选完
				selected_attr = selected_attr.join('→_→');
				selected_attr = selected_attr.replace(/\(/,'\\(');
				selected_attr = selected_attr.replace(/\)/,'\\)');
				var i = keys.getIndexByValue(selected_attr);
				if(i !== false && i !== undefined){
					attr_id = k[i];
					var attr_price = spec_info[attr_id]['price'];
					var number = spec_info[attr_id]['number'];
					var name = objToJSONString(spec_info[attr_id]['value']);
					var img_id = spec_info[attr_id]['img_id'];
					if(number > 0){
						//有库存
						$('#spec_selected').val(attr_id);
						change_img(img_id);
						update_price(attr_price,name);
						update_buybtn(true);
					}
					else{
						//无库存
						$('#attr_'+type_id).val('');
						$('#spec_selected').val('');
						change_img(img_id);
						//art.dialog.tips('抱歉，此款暂时缺货，请选其它款式');
						//alert('抱歉，此款暂时缺货，请选其它款式');
						update_buybtn(false);
						return;
					}

				}else{
					//没有这种规格
					$('#attr_'+type_id).val('');
					$('#spec_selected').val('');
					//art.dialog.tips('抱歉，此款暂时缺货，请选其它款式');
					//alert('抱歉，此款暂时缺货，请选其它款式');
					update_buybtn(false);
					return ;
				}
				
			}else{
				//alert("非法操作");
			}

		}
	});
	function change_img(img_id){
		if($('.img_id_'+img_id).length > 0){
			$('.img_id_'+img_id).mouseenter();
		}else{
			for (var i = 0; i< gallery.length;i++){
				if(gallery[i].img_id == img_id){
					$('#goods_img_list .focus')
					.prop('class','m-t-16 img_id_'+img_id+' focus')
					.prop('src',gallery[i].smallpic);
					$('.jpg img:visible')
					.prop('src',gallery[i].bigpic)
					.prop('data-cloudzoom',"zoomImage: '"+gallery[i].naturalpic+"'");
					break;
				}
			}
		}

	}
	function update_buybtn(flag){
		var $add_to_cart = $("#add_to_cart"),$product_diy = $("#product_diy");
		if(flag){
			$add_to_cart.removeClass("greensty").html("直接购买").data('is_no_stock','0');
			$product_diy.removeClass("greensty").html("定制购买").data('is_no_stock','0');
		}else{
			$add_to_cart.addClass("greensty").html("缺货登记").data('is_no_stock','1');
			$product_diy.addClass("greensty").html("缺货登记").data('is_no_stock','1');
		}
	}
	function update_price(attr_price,name){
		var uPrice = parseFloat($(".price-show").data("base-price") );
		var Discount = parseInt($(".price-show").data("discount"));
		var aPrice = parseFloat(attr_price);
		var shop_price = Number(uPrice + aPrice*Discount/100 ).toFixed(1);
		$(".price-show").html('￥'+shop_price+'元');
		var $add_to_cart = $("#add_to_cart"),$product_diy = $("#product_diy");
		if(name.match("定制")){
			$product_diy.show();
			$add_to_cart.hide();
		}else{
			$product_diy.hide();
			$add_to_cart.show();
		}
	}
	
	/**
	 * 获取属性组合的位置和信息
	 */
	function get_spec_key_by_val(attr_name,spec_info_a){
		attr_name = escape(attr_name);
		attr_name = attr_name.replace(/\*/,'\\*');
		attr_name = attr_name.replace(/\+/,'\\+');
		attr_name = attr_name.replace(/\./,'\\.');
		attr_name = attr_name.replace(/\//,'\\/');
		var reg = new RegExp('('+attr_name+'$)|('+attr_name+'%u2192)');
		var n = [];
		var keys = [];
		for (var property in spec_info_a){
			var key = escape(spec_info_a[property].key);
			if(key.match(reg)!=null){
				n.push(property);
				keys.push(spec_info_a[property].key);
			}
		}
		var arr = [];
		arr.push(n,keys);
		return arr;
	}
	 
	
	//----------------------------咨询------------------------------------------------
	
	$('.question-search-txt').on('keyup',function(){
		var key = $(this).val();
		get_comments(1,goods_id,0,3,key);
	});
	
	$('.question-search-btn').on('click',function(){
		var key = $('.question-search-txt').val();
		window.location.href="goods.php?act=question&id="+goods_id+"&key="+key;
	});
	
	$('.submit-comment-question').on('click',function(){
		var key = $('.question-search-txt').val();
		if(key.length < 1){
			return false;
		}
		var cmt = {
				id:goods_id,
				type:0,
				content:key,
				comment_cat:3
		};
		var url = 'comment.php?cmt='+JSON.stringify(cmt);
		$.post(url,function(data){
			if(data.error == 0){
				$('.question-search-txt').val('');
				make_question_list(data);
				//alert('你的提问已提交!');
				art.dialog.tips('你的提问已提交!');
			}else{
				art.dialog.tips(data.message);
				//alert(data.message);
			}
			
		},'json');
	});
	
	//***************************/user.php?act=collect&id=554*****************************************
	
	$('.collect').on('click',function(){
		var url = 'user.php?act=collect&id='+goods_id;
		var $_this = $(this);
		$.get(url,function(data){
			if(data.error == 200){
				$_this.find('i').addClass('icon-heart-red');
				$_this.addClass("focus");
				//art.dialog.tips('收藏成功!');
				
			}else if (data.error == 201){
				$_this.find('i').removeClass('icon-heart-red');
				$_this.removeClass("focus");
			}
			else{
				art.dialog.tips(data.message);
				//alert(data.message);
			}
			
		},'json');
	});
	
	/*单属性默认选择*/
	if($("#spec_selected").val()){
		$('.select_attr').click();
	}
});

function get_comments(page,goods_id,type,comment_cat,key){
	key = key || '';	
	var tab_ags = arguments[5];
	var url = 'comment.php?act=gotopage&page='+page+'&id='+goods_id+'&type='+type+'&comment_cat='+comment_cat+'&key='+key;
	var df = $.get(url,function(data){
		if(data.comment_cat == '3'){
			make_question_list(data);
		}else{
			make_comment_list(data);
		}
		if(tab_ags){
			$(tab_ags).parent(".totals").find("a").removeClass("fb");
			$(tab_ags).addClass("fb");
		}
	},'json');
	return df;
	
}

function make_comment_list(data){
	var $commen_list = $('.commen-list');
	var temp_html = '',lv_title='';
	var temp_star = ['<div class="stars"><i class="icon-bgr icon-star "></i><i class="icon-bgr icon-star "></i><i class="icon-bgr icon-star "></i><i class="icon-bgr icon-star"></i><i class="icon-bgr icon-star"></i></div>',
	                 '<div class="stars"><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star "></i><i class="icon-bgr icon-star "></i><i class="icon-bgr icon-star"></i><i class="icon-bgr icon-star"></i></div>',
	                 '<div class="stars"><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star "></i><i class="icon-bgr icon-star"></i><i class="icon-bgr icon-star"></i></div>',
	                 '<div class="stars"><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star"></i><i class="icon-bgr icon-star"></i></div>',
	                 '<div class="stars"><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star"></i></div>',
	                 '<div class="stars"><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star focus"></i><i class="icon-bgr icon-star focus"></i></div>'
	                 ];
	if(data.error == 0){
		if(data.comments.length>0){
			for(var id = 0; id < data.comments.length; id++){
				if(data.comments[id].user_rank == "2"){
					lv_title = "银牌会员";
				}else if(data.comments[id].user_rank == "12"){
					lv_title = "金牌会员";
				}else if(data.comments[id].user_rank == "13"){
					lv_title = "铂金会员";
				}else if(data.comments[id].user_rank == "14"){
					lv_title = "VIP会员";
				}else{
					lv_title = "普通会员";
				}
				
				temp_html += '<li class="rel">'
					+'<i class="icon-bgr icon-lv'+data.comments[id].user_rank+' level" title="'+lv_title+'"></i>'
					+'<p class="lh2">'+data.comments[id].username+'&nbsp;&nbsp;<span class="f-808080">'+data.comments[id].add_time+'</span></p>'
					+'<p>'+data.comments[id].content+'</p>'
					+ ( typeof(data.comments[id].imgs) == 'object' ? make_image_list(data.comments[id].imgs):'')
					+temp_star[data.comments[id].rank]
					+'</li>';
			}
			$(".pages-comment").show();
			$("#good_rate").show();
		}else{
			temp_html += '<p class="tc p-y-40 f-999">暂时没有评价</p>';
			$(".pages-comment").hide();
			$("#good_rate").hide();
		}
	}
	$commen_list.html(temp_html);
	
	var	$pager = $('.pages-comment');
	var pager_html = '<a class="prev icon-bgr icon-page-l" href="'+data.pager.page_prev+'"></a>';
	for(var i = 0; i< data.pager.pages.length ;i++){
		pager_html += '<a href="javascript:get_comments('+data.pager.pages[i]+','+data.pager.goods_id+',0,'+data.pager.comment_cat+')" class="'+(data.pager.pages[i] == data.pager.page ? 'current':'')+'">'+data.pager.pages[i]+'</a>';
	}
	pager_html += '<a class="next icon-bgr icon-page-r" href="'+data.pager.page_next+'"></a>';
	
	$pager.html(pager_html);
	if(data.comment_cat =='1'){
		$('.comment_total').html(data.pager.record_count);
		$('.commen-orders .comment_total').parents(".totals").find("a").removeClass("fb");
		$('.commen-orders .comment_total').parent().addClass("fb");
	}
	else{
		$('.saidan_total').html(data.pager.record_count);
		$('.saidan_total').parents(".totals").find("a").removeClass("fb");
		$('.saidan_total').parent().addClass("fb");
	}
	
	initCommEvent();
}
function make_question_list(data){
	var in_goods_question_page = $('#in-goods-question-page').length;
	if(in_goods_question_page){
		var $commen_list = $('#question-list');
		var temp_html = '';
		
		if(data.error == 0){
			if(data.comments.length>0){
				for(var id = 0; id < data.comments.length; id++){
					temp_html += '<li class="rel lh2 m-t-40">'
							  +  '<span class="time f-9e9e9e f12 dn">'+data.comments[id].add_date+'</span>'
							  +  '<p class="f16">Q: '+data.comments[id].content+'</p>'
							  +  '<p class="f-996c33">'+(data.comments[id].re_content ? 'A: '+data.comments[id].re_content : '&nbsp;')+'</p>'
							  +  '</li>';
					
				}
			}else{
				temp_html += '<p class="tc p-y-40 f-999">暂时没有咨询</p>';
				
			}
		}
		$commen_list.html(temp_html);
		var	$pager = $('.pages');
		var pager_html = '<a class="prev icon-bgr icon-page-l" href="'+data.pager.page_prev+'"></a>';
		for(var i = 0; i< data.pager.pages.length ;i++){
			pager_html += '<a href="javascript:get_comments('+data.pager.pages[i]+','+data.pager.goods_id+',0,'+data.pager.comment_cat+',\''+data.key+'\')" class="'+(data.pager.pages[i] == data.pager.page ? 'current':'')+'">'+data.pager.pages[i]+'</a>';
		}
		pager_html += '<a class="next icon-bgr icon-page-r" href="'+data.pager.page_next+'"></a>';
		
		$pager.html(pager_html);
	}else{
		var $commen_list = $('#question-list');
		var temp_html = '';
		
		if(data.error == 0){
			if(data.comments.length>0){
				for(var id = 0; id < data.comments.length; id++){
					temp_html += (id%2 != 0 ? '<li class="fl m-t-28 m-l-80">' : '<li class="fl m-t-28">')
							  +  '<p class="question clear"><span class="fl overtxt">Q: '+data.comments[id].content+'</span><span class="fr f-9e9e9e dn">'+data.comments[id].add_date+'</span></p>'
							  +  (data.comments[id].re_content ? '<p class="f-996c33 overtxt">A: '+data.comments[id].re_content+'</p>' : '<p class="f-996c33 overtxt">&nbsp;</p>')
							  +  '</li>';
					
				}
				$(".look-all").show();
			}else{
				temp_html += '<p class="tc p-y-40 f-999">暂时没有咨询</p>';
				$(".look-all").hide();
			}
		}
		$commen_list.html(temp_html);
		
		if(data.key == ''){
			$('.question-total').html(data.pager.record_count);
		}
	}
}
function make_image_list(imgs){
	var imghtml = '',imgdata = '';
	for(var i=0;i<imgs.length;i++){
		imghtml += '<span class="fl m-l-15 rel"><em><i class="icon-bgr icon-goods-zoom"></i></em><img src="'+imgs[i].src+'!list130"></span>';
		imgdata += (i==0?'':'+')+'{\'bigpic\':\''+imgs[i].src+'!480\',\'smallpic\':\''+imgs[i].src+'!goods80.jpg\'}'
	}
	
	var html = '<div class="order-pics clear m-t-20" data-gallery="'+imgdata+'">'+ imghtml + '</div>';
	
	return html;
}
function initCommEvent(){
	/*-------------------------晒单图片展示---------------------------------*/
		$(".order-pics").each(function(ind, ele) {
			var arr = $(ele).data("gallery").split("+");
			$(ele).find("em").each(function(index, element) {
				$(element).on("click",function(){
					initOrderPics(arr,index);
				});				
			});
		});
		function initOrderPics(arr,index){
			var i,len = arr.length,obj,bigpic = '',smallpic = '',imgdefereds=[]; 		
			for(i = 0; i<len; i++){
				obj = eval('('+arr[i]+')');
				if(i===index){
					bigpic += '<img src="'+obj.bigpic+'">';
					smallpic += '<img src="'+obj.smallpic+'" class="current">';
				}else{
					bigpic += '<img src="'+obj.bigpic+'" class="dn">';
					smallpic += '<img src="'+obj.smallpic+'">';
				}
			}
			var html = '<div class="goods-pics-layout rel"><img src="/themes/pc/images/ajax-loader.gif" class="loading" style=""><div class="pics-big rel">' +
			'<span class="left ani-bg" onselectstart="return false;"><i class="icon-bgr icon-goods-l"></i></span>' +
			'<span class="right ani-bg" onselectstart="return false;"><i class="icon-bgr icon-goods-r"></i></span>';
			html += bigpic;
			
			html += '</div><div class="pics-sm">';
			
			html += smallpic;
			
			html += '</div></div>';
			var dialog_see = art.dialog({
				id:"goods_pic_see",
				title:"",
				lock:true,
				background:"#000",
				opacity:0.15,
				padding: '10px 10px 0',
				content:html
			});
			$(".goods-pics-layout img").each(function(ind, ele) {   
				var dfd = $.Deferred();
				$(ele).bind('load',function(){
					dfd.resolve();
				}).bind('error',function(){
					dfd.resolve();
				});
				if(this.complete){//IE兼容
					dfd.resolve();
				}
				imgdefereds.push(dfd);
			});
			$.when.apply(null,imgdefereds).done(function(){
				initOrderEvent(index);
			});
		}
		function initOrderEvent(index){
			var $goodspop = $(".goods-pics-layout"),
			$loadimg = $goodspop.find(".loading"),
			$left = $goodspop.find(".left"),
			$right = $goodspop.find(".right"),
			$bigpic = $goodspop.find(".pics-big").children("img"),
			$smallpic = $goodspop.find(".pics-sm").children("img"),
			length = $bigpic.length,current = index;
			$loadimg.hide();
			$left.on("click",function(){
				if(current-1>=0){
					current--;
					showPopPic();
				}else{
					current = length - 1;
					showPopPic();
				}
			});
			$right.on("click",function(){
				if(current+1<length){
					current++;
					showPopPic();
				}else{
					current = 0;
					showPopPic();
				}
			});
			$smallpic.each(function(ind,ele){
				$(ele).on("click",function(){
					current = ind; 
					showPopPic();
				});
			});
			function showPopPic(){
				$bigpic.hide();
				$smallpic.removeClass("current");
				$bigpic.eq(current).show();
				$smallpic.eq(current).addClass("current");
			}
		}
}