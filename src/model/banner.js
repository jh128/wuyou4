;
+function($){
	$.fn.banner = function(banner_sele,options){
		new Banner(banner_sele,options,this);
	}

	function Banner(banner_sele,options,base_ele){
		this.init(banner_sele,options,base_ele);
	}
	Banner.prototype = {
		constructor:Banner,
		init:function(banner_sele,options,base_ele){
			// 当前显示图片
			this.index = 0;
			// 获取元素
			this.bannerImg = $(banner_sele);
			// console.log(this.bannerImg);
			// 动画模式
			this.direction = options.direction ? options.direction : "fade";
			// 具体元素获取
			this.bannerItem = this.bannerImg.children();
			
			this.bannerNum = this.bannerItem.length;
			
			this.pagination = $(options.pagination ? options.pagination.el : "");
			
			if(this.pagination.length !== 0){
				for(var i = 0;i < this.bannerNum;i++){
					var span = $("<span></span>");
					var img = $("<img>"); 

					this.pagination.append(span);
					this.bannerImg.append(img);
					// console.log(this.bannerImg)
					if(i == this.index){
						span.addClass("sp1");
						img.addClass("banner-img");
					}
					// console.log(img)
				}
				this.paginationItem = this.pagination.children();
				this.paginationItem.on("mouseover.changeIndex",{"turn":"toIndex"},$.proxy(this.change_index,this));
				this.paginationItem.on("mouseover.animation",$.proxy(this.animation,this));	
			}

			// 获取pagination元素
			if(typeof options.pagination == "object"){
				this.paginationEl = $(options.pagination.el);
			}
			// console.log(this.bannerImg);
		},
		change_index:function(event){
			// console.log(1)
			var turnList = {
				"prev":function(){
                    this.prev = this.index;
                    if(this.index  == 0){
                        this.index = this.bannerNum - 1;
                    }else{
                        this.index --;
                    }
                }.bind(this),
                "next":function(){
                    this.prev = this.index;
                    if(this.index == this.bannerNum - 1){
                        this.index = 0;
                    }else{
                        this.index ++;
                    }
                }.bind(this),
				"toIndex":function(){
					// console.log(event.target);
					this.prev = this.index;
					this.index = $(event.target).index();
				}.bind(this)
			}
			if(!(typeof turnList[event.data.turn] == "function")) return 0;
			turnList[event.data.turn]();
			console.log(this.index);
		},
		animation:function(event){
			if(this.prev == this.index) return ;
			var animationList = {
				"slide":function(){
					animationList.slideFadeInit();
					this.bannerItem.eq(this.index)
					.addClass("sp1","banner-img")
					.css({display:"none"})
					.slideDown()
					.siblings()
					.removeClass("sp1","banner-img");
				}.bind(this),
				"fade":function(){
					animationList.slideFadeInit();
					this.bannerItem.eq(this.index)
					.addClass("sp1","banner-img")
					.css({
						display:"none"
					})
					.fadeIn()
					.siblings()
					.removeClass("sp1","banner-img");
				}.bind(this),
				"scroll":function(){
					this.bannerItem
					.css({
						zIndex:0
					})
					.eq(this.prev)
					.css({
						zIndex:2
					})
					.end()
					.eq(this.index)
					.css({
						zIndex:2
					})
					console.log(this.prev,this.index);

					 //判定从左到右 还是从右到左;
                    if(this.prev > this.index){
                        //左;
                        this.bannerItem.eq(this.prev)
                        .animate({
                            left:this.bannerItem.outerWidth()
                        })
                        .end()
                        .eq(this.index)
                        .css({
                            left:-this.bannerItem.outerWidth()
                        })
                        .animate({
                            left:0
                        })
                    }else{
                        //右;
                        this.bannerItem.eq(this.prev)
                        .animate({
                            left:-this.bannerItem.width()
                        })
                        .end()
                        .eq(this.index)
                        .css({
                            left:this.bannerItem.width()
                        })
                        .animate({
                            left:0
                        })
                    }
				}.bind(this),
				"slideFadeInit":function(){
					this.bannerItem.eq(this.prev)
					.css({
						zIndex:1
					})
					.siblings()
					.css({
						zIndex:""
					})
				}.bind(this)
			}
			animationList[this.direction]();
			this.pagination.children().eq(this.index)
			.addClass("sp1","banner-img")
			.siblings()
			.removeClass("sp1","banner-img");
		}
	}

}(jQuery);