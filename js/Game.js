(function(){
    // 游戏类  最核心的类
    window.Game = Class.extend({
        init : function(paramsJSON){
            // 备份this
            var self = this;
            this.gameend = false;
            // fps表示 frames per second 每秒多少帧
            // 默认值60
            this.fps = paramsJSON.fps || 60;
            // 定时器
            this.timer = null;
            // 我的帧工具
            this.frameUtil = new FrameUtil();
            // 得到canvas
            this.canvas = document.getElementById(paramsJSON.canvasId)
            // 得到上下文
            self.ctx = this.canvas.getContext("2d");
            // 所有图片
            this.images = null;  
            // 实例化一个静态资源管理工具
            self.sr = new StaticResoucesUtil();
            // 命令这个静态资源管理工具，开始加载图片
            this.sr.loadImages("r.json", function (alreayLoadNum, allNum, imagesObj) {
                //清屏
                self.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                //打印当前加载图片个数
                self.ctx.font = "20px 黑体";
                self.ctx.fillText("正在加载" + alreayLoadNum + "/" + allNum, 30, 50);
                //如果已经加载的图片个数，等于了图片总数，那么运行游戏
                if (alreayLoadNum == allNum) {
                    self.images = imagesObj;
                    self.run();
                }
            });
        },
        // 开始游戏
        run : function(){
            // 备份this
            var self = this;
            // 定时器
            this.timer = setInterval(function(){
                self.mainloop();
            },1000 / self.fps);
            //自己的一些演员，罗列出来
            this.fangzi = new Background({
                "image" : this.images.fangzi,
                "width" : 300,
                "height" : 256,
                "speed" : 1,
                "y" : this.canvas.height - 296
            });
            this.diban = new Background({
                "image" : this.images.diban,
                "width" : 48,
                "height" : 48,
                "speed" : 3,
                "y" : this.canvas.height - 48
            });
            this.shu = new Background({
                "image" : this.images.shu,
                "width" : 300,
                "height" : 246,
                "speed" : 2,
                "y" : this.canvas.height - 264
            });
            // 实例化一个鸟
            this.bird = new Bird();
            // 管子数组
            this.pipeArray = [new Pipe()];
            //分数对象
            this.scoreManager = new ScoreManager();
        },
        // 主循环
        mainloop : function(){
            // 里面的语句 每帧执行
            this.frameUtil.update();
            //清屏
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            // 打印fps
            this.ctx.font = "16px 微软雅黑";
            this.ctx.fillText("FPS /" + this.frameUtil.realFps,10,20);
            // 打印帧编号
            this.ctx.fillText("FNO /" + this.frameUtil.currentFrame,10,40);
            //房子(更新渲染)
            this.fangzi.update();
            this.fangzi.render();

            //地板(更新渲染)
            this.diban.update();
            this.diban.render();

            //树(更新渲染)
            this.shu.update();
            this.shu.render();

            //鸟类(更新渲染)
            this.bird.update();
            this.bird.render();

            //判断当前帧数是不是100的整数倍 是的话new一个新管子
            if(!this.gameend && this.frameUtil.currentFrame % 150 == 0){
                this.pipeArray.push(new Pipe());
            }
            for(var i = 0; i < this.pipeArray.length; i++){
                this.pipeArray[i].update();
                if(this.pipeArray[i]){
                    this.pipeArray[i].render();
                }
            }
            // 分数的更新、渲染
            this.scoreManager.update();
            this.scoreManager.render();
        },
        // 暂停
        pause : function(){
            // 清除定时器
            clearInterval(this.timer);
        },
        // 游戏结束
        gameover : function(){
            // 各种暂停
            game.fangzi.pause();
            game.diban.pause();
            game.shu.pause();
            for(var i = 0; i < this.pipeArray.length; i++){
                game.pipeArray[i].pause();
            }
            // 
            this.gameend = true;
            this.bird.die = true;
        }
    });   
})();