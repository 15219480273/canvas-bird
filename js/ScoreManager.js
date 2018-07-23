(function(){
    // 打分类
    window.ScoreManager = Class.extend({
        init : function(){
            this.score = 0;
        },
        addPoint : function(){
            this.score++;
        },
        update : function(){

        },
        render : function(){
            // 分析当前的分数有几位
            var NumLength = this.score.toString().length;
            var jizhunwei = game.canvas.width / 2 - 20 * NumLength;
            // 循环语句  循环遍历每一位
            for(var i = 0; i < NumLength; i++){
                var now = parseInt(this.score.toString().substr(i,1));
                renderOneNum(now,jizhunwei + i * 40 , 100);
            }
        }
    });
    function renderOneNum(num,x,y){
        game.ctx.drawImage(game.images.number, 40 * num, 0, 40, 57, x , y, 40, 57);
    }
})();