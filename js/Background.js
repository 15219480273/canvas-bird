(function(){
    window.Background = Class.extend({
        // 背景类  就是所有的平铺背景
        // 一会这个类将有三个实例 房子、大树、地板
        init : function(params){
            this.image = params.image;
            this.width = params.width;
            this.height = params.height;
            this.speed = params.speed;
            this.y = params.y;
            this.x = 0;
            // 循环画背景的数量  图片要能够平铺  所以个数就是画布总宽度除以图片宽度
            this.amount = Math.ceil(game.canvas.width / this.width);
        },
        // 背景移动暂停
        pause : function(){
            this.speed = 0;
        },
        update : function(){
            this.x -= this.speed;
            if(this.x <= -this.width * this.amount){
                this.x = 0;
            }
        },
        // 渲染 这个函数每帧执行
        render : function(){
            // 绘制图片 绘制两倍的图片数量 用于做无缝
            for(var i = 0; i < this.amount * 2; i++){
                game.ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x + this.width * i, this.y, this.width, this.height);
            }
        }
    });
})();