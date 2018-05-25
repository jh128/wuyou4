requirejs.config({
    baseUrl:"src", 
    //给模块起别名,方便使用,在依赖的模块中也能使用;
    paths:{
        "jquery":"libs/jquery-3.3.1"
        
    }
})
// 1.配置所有模块的基础路径,该路径相对于引入了requirejs的html文件的路径
// 2.所有的路径都会自动拼上baseUrl