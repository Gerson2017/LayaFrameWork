export  default  class GameTool {


        ///获取帧时间间隔 以秒为单位
        public static get DeltaTime():number
        {
            return Laya.timer.delta/1000;
        }

        public static get CurrentTime()
        {
            var nowdate:Date = new Date(); 
            //创建新的日期对象，用来获取现在的时间 
            var year:Number = nowdate.getFullYear(); 
            //获取当前的年份 
            var month:Number = nowdate.getMonth()+1; 
            //获取当前的月份，因为数组从0开始用0-11表示1-12月，所以要加1 
            var date:Number = nowdate.getDate(); 
            //获取当前日期 
            var day:Number = nowdate.getDay(); 
            //获取当年的星期 
            var hour:Number = nowdate.getHours(); 
            //获取当前小时 
            var minute:Number = nowdate.getMinutes(); 
            //获取当前的分钟 
            var second:Number = nowdate.getSeconds(); 
            //获取当前的秒钟 
            //trace("今天是" + year + "年" + month + "月" + date+"日" + "星期" + day + "现在时刻" + hour + ":" + minute+":" + second); 
            var currenttime =year+":"+ hour + ":" + minute+":" + second;
         
            return currenttime;
        } 

        
        public static IsCurrenTimeInRange(mindata:number,maxdata)
        {
            let date=new Date();
           let time= date.getTime();
           if (time<mindata||time>maxdata) 
           {
               return false;
           }
           return true;
        }

}