
	var oList = document.getElementById("add-list");
	// var aButton = oList.querySelectorAll("button[data-id]");
	// oList.onclick = delegation(aButton,addCar);

	function addCar(){
		var goodsId = this.getAttribute("data-id");
		// 第一次; => 建立对应的json结构;
		if(!getCookie("carList")){
			//第一次;
			var goodsObj = [
				{
					"id":goodsId,
					"num":1
				}
			]
			var goodsString = JSON.stringify(goodsObj);

			setCookie("carList",goodsString)
			// console.log(goodsString)
		}else{
			var goodsString = getCookie("carList");
			// console.log(goodsString)
			var goodsArray = JSON.parse(goodsString);
			//判定当前id是否存在;

			var hasId = false;

			for(var i = 0 ; i < goodsArray.length ; i++){
				if(goodsArray[i].id == goodsId){
					goodsArray[i].num ++;
					//商品数量递增;
					hasId = true;
					break;
				}
			}

			//如果id不存在;
			if(!hasId){
				goodsArray.push({
					"id":goodsId,
					"num":1
				})
			}
			//把操作好的数据放入cookie之中;
			goodsString = JSON.stringify(goodsArray);
			setCookie("carList",goodsString);
		}

		carNum(car);
	}

	// console.log(json)
		function rendering(json,root){
			// //根据json去渲染页面;
			var dataList,
				item,
				frag,
				list,
				dl,
				dt,
				img,
				small,lihe,gx,rg,price,number,btnR,btnL,input,kucun,jiage,dele,
			frag = document.createDocumentFragment();
			for(var i = 0 ; i < json.length ; i++){
				item = json[i];
				//创建结构;
				list = cE("div");
				dl = cE("dl");
				dt = cE("dt");
				img = cE("img");
				small = cE("div");
				lihe = cE("span");
				gx = cE("span");
				rg = cE("div");
				price = cE("span");
				number = cE("div");
				btnL = cE("button");
				btnR = cE("button");
				input = cE("input");
				kucun = cE("span");
				jiage = cE("span");
				dele = cE("i");

				list.className = "infro-list";
				dl.className = "dl";
				dt.className = "dt";
				small.className = "small-title";
				lihe.className = "small-title span";
				gx.cssText = "font-size:12px";
				rg.className = "infro-rg";
				number.className = "number";
				btnL.className = "button";
				btnR.className = "button";
				input.className = "input";
				dele.className = "i";

				
				btnL.innerHTML = "-";
				btnR.innerHTML = "+";
				input.value = json[i].num;
				input.type = "number";
				//结构嵌套;
				dt.appendChild(img);
				dl.appendChild(dt);
				small.appendChild(lihe);
				small.appendChild(gx);
				dl.appendChild(small);
				rg.appendChild(price);
				number.appendChild(btnR)
				number.appendChild(btnL);
				number.appendChild(input);
				rg.appendChild(number);
				rg.appendChild(kucun);
				rg.appendChild(jiage);
				rg.appendChild(dele);
				list.appendChild(dl);
				list.appendChild(rg);

				// console.log(list);

				list.setAttribute("data-id",json[i].id);
				frag.appendChild(list);
				
			}
			// console.log(frag)
			// root.appendChild(frag);
		}

		function cE(str){
			return document.createElement(str);
		}

	function getCar(){
			//从cookie之中取到购物车之中的内容;
			var carListString = getCookie("carList");
			var carListArray = JSON.parse(carListString);
			console.log(carListArray);
			var carArray = [];
			for(var i = 0 ;i < carListArray.length ; i++){
				// console.log(carListArray[i].id)
				var itemId = carListArray[i].id;//购物车中商品的id;
				// console.log(fromIdToItem(itemId,json.subjects))
				//获取对应的数据对象
				var itmeobj = fromIdToItem(itemId,json.subjects);
				//向结构中放入商品数量;
				itmeobj.num = carListArray[i].num;
				carArray.push(itmeobj);
			}
			// console.log(carArray);
			rendering(carArray,oList);
	}
	getCar();

		
		// rendering(json,oList);
		
		// function fromIdToItem(id,json){
		// 	// console.log(id,json);
		// 	for(var i = 0 ; i < json.length ; i++){
		// 		if(json[i].id == id){
		// 			return json[i];
		// 		}
		// 	} //通过id在json数组中找到对应id的 对象，并返回这个对象;
		// }

	
