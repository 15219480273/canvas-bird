(function(){
    // 鸟类
    window.Bird = Class.extend({
        init : function(){
            this.x = (game.canvas.width - 85) / 2;
            this.y = 200;
            this.w = 85;
            this.h = 60;
            // 翅膀形态 0 1 2
            this.swing = 0;
            // Y的变化值
            this.dY = 1;
            // 记录开始往下掉的帧数
            this.dropStartFram = game.frameUtil.currentFrame;
            // 鸟的方向
            this.ro = 0;
            // 添加监听
            this.bindClickListener();
            // 小鸟状态： 0是下降  1是上升
            this.state = 0;
            this.deltaY = 1;
            // 判断小鸟死了
            this.die = false;
            // 死亡血迹动画
            this.dieAnimate = 0;
        },
        // 往上飞
        fly : function(){
            // 改变状态
            this.state = 1;
            // 改变角度
            this.ro = -25;
            // 初始的每帧移动距离
            this.deltaY = 1;
            // 翅膀煽动速度
            this.swingSpeed = 5;
        },
        // 每帧执行 
        update : function(){
            // 如果小鸟死了
            if(this.die){
                this.dieAnimate ++;
                if(this.dieAnimate == 30){
                    game.pause();
                }
                return;
            }else{
                // 如果当前的帧编号是五的倍数 改变翅膀形态
                if(game.frameUtil.currentFrame % this.swingSpeed == 0){
                    this.swing++;
                    if(this.swing > 2 ){
                        this.swing = 0;
                    }
                }
                //如果当前小鸟的状态是0  则往下掉 
                if(this.state == 0){
                    this.swingSpeed = 5;
                    // dY在变化 会越来越大 当前的帧 数减去开始掉落的帧数 
                    this.dY = 0.001 * Math.pow(game.frameUtil.currentFrame - this.dropStartFram,2)
                    // 旋转的改变
                    this.ro++;
                }else if(this.state == 1){
                    this.swingSpeed = 2;
                    //小鸟上升
                    this.deltaY += 1;
                    this.dY = -12 + this.deltaY;
                    this.ro += 0.5;
                    if(this.ro < 0){
                        this.ro = 0;
                    }
                    // 小鸟上升的极限 就是上升那一瞬间往上120像素
                    if(this.dY > 0){
                        this.state = 0;
                        this.dropStartFram = game.frameUtil.currentFrame;
                    }
                }
                // y的改变
                this.y += this.dY;
                // 验收  不能让小鸟飞天或者遁地
                if(this.y < 0){
                    this.y = 0;
                }
                // 小鸟碰地板
                if(this.y > game.canvas.height - 50 - this.h){
                    game.gameover();
                }
            }
        },
        render : function(){
            if(this.die){
                var row = parseInt(this.dieAnimate / 5);
                var col = this.dieAnimate % 5;
                game.ctx.drawImage(game.images.blood, 325 * col, 138 * row, 325, 138, this.x - 155, this.y + 50, 325, 138);
                return;
            }else {
                // 旋转公式
                // 旋转之前"保存"
                game.ctx.save();
                // 旋转??????
                game.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
                game.ctx.rotate((Math.PI/180) * this.ro);
                game.ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
                game.ctx.drawImage(game.images.bird,this.swing * this.w,0,this.w,this.h,this.x,this.y,this.w,this.h);
                // 旋转之后"恢复"
                game.ctx.restore();
            }
        },
        //绑定监听 
        bindClickListener : function(){
            var self = this;
            game.canvas.addEventListener("mousedown",function(){
                self.fly();
            });
            game.canvas.addEventListener("touchstart",function(evet){
                self.fly();
            });
        }
    });
})();