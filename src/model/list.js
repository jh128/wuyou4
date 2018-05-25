  // 商品列表页 渲染 及 购物车
    function ShopCar(url,selector){
      this.url = url; 
      this.main = $(selector);
      this.init();
    };
    ShopCar.prototype = {
      constructor:ShopCar,
      init(){
        //加载功能;
        this.loading()
        .then(function(res){
          // console.log(res);
          this.json = res;
          this.render()
        }.bind(this));
        this.carNum = $(".car_sum");
        this.carNum.html(this.getSum());
        // console.log(this.getSum());
        this.main.on("click.addCar","button[data-id]",$.proxy(this.addCar,this));
        this.main.on("click.changeNum","button[data-id]",$.proxy(this.changeNum,this));
      },
      loading(){
        //加载数据;
        var opt = {
          url:this.url
        }
        return $.ajax(opt);
      },
      render(){
        var html = "";
        // console.log(this.json)
        this.json.forEach(function(item){
          // console.log(item)
          html += ` <li>
                        <a href="details.html" class="img-link">
                          <img src=${item.img_src}>
                        </a>
                        <p class="desc">
                          <a href="details.html" target="_blank">${item.title}</a>
                        </p>
                        <p>${item.price}</p>
                        <button data-id=${item.img_id} class="car">加入购物车</button>
                        <p class="dz">
                          <a href="#">${item.a_txt}</a>
                          <span class="pj">${item.span_pj}</span>
                        </p>
                    </li> `;
        }.bind(this));
        this.main.html(html);
      },
      addCar(event){
        //id获取 ---start;
        //我怎么知道当前点击的元素是谁;
        var target = event.target || event.srcElement;
        var goodsId = $(target).attr("data-id");
        //id获取 ---end;
        
        //操作cookie存入购物车;
        // [{"id":,"num"}]
        
        if(!$.cookie("shopCar")){
          //表示是第一次存数据;
          var shopCarArray = [
            {
              id:goodsId,
              num:1
            }
          ]
          $.cookie("shopCar",JSON.stringify(shopCarArray))
          // console.log($.cookie("shopCar"));
          return 0;
        }
        //其余次数进行购物车添加;
        
        //id是否在购物车之中存在;

        var shopCarString = $.cookie("shopCar");
        var shopCarArray = JSON.parse(shopCarString);

        // console.log(shopCarArray)
        var hasItem = false;
        shopCarArray.forEach(function(item){  
          // console.log(item);
          //如果购物车列表之中有当前项，让商品数量自增就可以了;
          if(item.id == goodsId){
            item.num ++;
            hasItem = true;
          }
        })
        if(!hasItem){
          var item = {
            id:goodsId,
            num:1
          }
          shopCarArray.push(item)
        }
        $.cookie("shopCar",JSON.stringify(shopCarArray));
        // console.log($.cookie("shopCar"));
      },
      changeNum(){
        this.carNum.html(this.getSum());
      },
      getSum(){
        var shopCarString = $.cookie("shopCar");

        if(shopCarString){
          var shopCarArray = JSON.parse(shopCarString);
          var sum = 0;
          shopCarArray.forEach(function(item){
            sum += Number(item.num);
          })
          return sum;
        }

        return 0;
      }
    }

