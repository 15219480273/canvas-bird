// 加载静态资源
(function(){
    // 静态资源管理类  这个类用于加载所有的静态图片 音乐。
    window.StaticResoucesUtil = Class.extend({
        init : function(){
            this.images = new Object();
        },
        // 读取图片
        // 调用loadImages有两个参数 第一个是json  表示读取的列表
        // 第二个是回调函数，回调函数又接收三个参数:已经加载的总数  总数量  图片对象
        loadImages : function(jsonURL,callback){
            // 备份this
            var self = this;
            // 先要去读取json文件，ajax
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                        var alreayLoadNumber = 0;//已经加载好的图片数量
                        // 将json文件里面的纯文本转换成json对象
                        var jsonObj = JSON.parse(xhr.responseText);
                        // 循环语句 像每个图片发出请求
                        for(var i = 0; i < jsonObj.images.length; i++){
                            // 创建一个图片
                            var image = new Image();
                            // 一旦设置src属性 上行发出请求
                            image.src = jsonObj.images[i].src;
                            // 编号下标
                            image.index = i;
                            image.onload = function(){
                                alreayLoadNumber++;//让已经加载好的图片数量+1
                                // 保存在自己的images的属性里
                                self.images[jsonObj.images[this.index].name] = this;
                                // 回调传进来的函数
                                callback(alreayLoadNumber,jsonObj.images.length,self.images)
                            }
                        }
                    }
                }
            }
            xhr.open("get",jsonURL,true);
            xhr.send(null);
        }
    });
})();