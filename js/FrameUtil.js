(function(){
    // 帧工具类  提供当前的真实的fps
    window.FrameUtil = Class.extend({
        init : function(){
            this.currentFrame = 0;
            // 起始帧用于统计fps的
            this.sFrame = 0;
            this.sTime = new Date()
            //真实fps
            this.realFps = 0;
        },
        //更新 在函数mainloop每帧执行
        update : function(){
            // 当前帧序号
            this.currentFrame ++;
            // 判断是否是sTime + 1000
            var t = new Date();
            if(t - this.sTime >= 1000){
                // 计算1000毫秒里面的帧序号的流逝
                this.realFps = this.currentFrame - this.sFrame;
                // 当前的帧序号 就是新的起点标志帧
                this.sFrame = this.currentFrame;
                // 当前帧的发生时间  就是新的标志帧时间
                this.sTime = t;
            }
        }
    });
})()