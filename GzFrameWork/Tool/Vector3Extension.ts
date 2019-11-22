export default class Vector3Extension{



     public static Subtract(a:Laya.Vector3,b:Laya.Vector3 ):Laya.Vector3
    {
        let result:Laya.Vector3=new Laya.Vector3();
        Laya.Vector3.subtract( a,b,result);
        return result;
    }

    public static MultiplyNumber(a:Laya.Vector3,b:number ):Laya.Vector3
    {
        let result:Laya.Vector3=new Laya.Vector3();
        Laya.Vector3.scale(a,b,result);
        return result;
    }


    public static Add(a:Laya.Vector3,b:Laya.Vector3 ):Laya.Vector3
    {
        let result:Laya.Vector3=new Laya.Vector3();
        Laya.Vector3.add( a,b,result);
        return result;
    }


    public static Normalize(input:Laya.Vector3)
    {
        let result:Laya.Vector3=new Laya.Vector3();
        Laya.Vector3.normalize(input,result);
        return result;
    }






}