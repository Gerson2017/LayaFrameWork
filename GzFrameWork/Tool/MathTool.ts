export default class MathTool {


   public static  GetRandomInt(min: number, max: number): number {  
        var Range = max - min;  
        var Rand = Math.random();  //(0,1)
        return(min +Math.floor(Rand * Range));  
    }

    public static Clamp(value:number,min:number,max:number):number
    {
        var tempValue:number=0;
        if(value<min)
        {
            tempValue=min;
        }
        else if(value>max)
        {
            tempValue=max;
        }
        else
        {
            tempValue=value;
        }
        return tempValue;
    }


    /**
     * vector1逆时针计算角度
     */
    public static  AngleBetweenVector( vector1:Laya.Vector2, vector2:Laya.Vector2)
    {

        let angle = Math.atan2(vector2.y, vector2.x) - Math.atan2(vector1.y, vector1.x);
        if (angle < 0) angle += 2 * Math.PI;
        // let sin = vector1.x * vector2.y - vector2.x * vector1.y;  
        // let cos = vector1.x * vector2.x + vector1.y * vector2.y;
        // let angel=Math.atan2(sin, cos) * (180 / Math.PI);
        angle= angle*180/Math.PI;
       // console.log("angle="+angle);
        return angle;
    }


    public static  AngleBetweenPoint( vector1:Laya.Vector2, vector2:Laya.Vector2)
    {

        let xd= vector2.x-vector1.x;
        let yd=vector2.y-vector1.y;
       // let sin = vector1.x * vector2.y - vector2.x * vector1.y;  
      //  let cos = vector1.x * vector2.x + vector1.y * vector2.y;
      console.log("hudu="+Math.atan2(yd,xd)+" xd="+xd+" yd="+yd);
        let angel=Math.atan2(vector2.y-vector1.y, vector2.x-vector1.x) * (180 / Math.PI);

       // console.log("angle="+angel);
        return angel;
    }


    public static GenUUID() {
        function code() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return code() + code() + code() + code() + code() + code() + code() + code()
    }

    
    private static S4() 
    {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }


    public static GetPlayerId()
    {
        return (MathTool.S4() + MathTool.S4() + "-" + MathTool.S4() + "-" +
        MathTool.S4() + "-" + MathTool.S4() + "-"+Laya.Browser.now());
    }


    /**
 *  产生指定范围不重复的随机数
 *  参数一: 最小值    int
 *  参数二: 最大值    int
 *  参数三: 随机数量  int
 *  返回值: 结果数组  Array
 **/
    public static getRandNumForRange(least, max, num) :Array<number>
    {
        // 检查传值是否合法
        if(num > max - least) [];
        // 产生指定范围的所有数值
       let numList: Array<number> = [], numRandList: Array<number> = [], randId;
        for (let index = least; index <= max; index++) 
        numList.push(index);

        // 产生记录次数
        for (let index = 0; index < num; index++) 
        {
            randId = Math.floor(Math.random() * numList.length);    // 随机一个数组ID
            numRandList.push(numList[randId]);  // 获取这个值
            numList.splice(randId, 1);  // 删除这个成员 防止下次再次生成
        }

        return numRandList;
    }

}