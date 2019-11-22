export default class QuaternionExtension
{

    public static LookAtRotation(forward:Laya.Vector3):Laya.Quaternion
    {
        let result:Laya.Quaternion=Laya.Quaternion.DEFAULT;
        Laya.Quaternion.rotationLookAt(forward,Laya.Vector3._Up,result);
        return result;
    }

    public static LookAt(eye:Laya.Vector3, target:Laya.Vector3):Laya.Quaternion
    {
        let result:Laya.Quaternion=Laya.Quaternion.DEFAULT;
        Laya.Quaternion.lookAt(eye,target,Laya.Vector3._Up,result);
        return result;
    }

    public static Lerp(a:Laya.Quaternion,b:Laya.Quaternion,t:number):Laya.Quaternion
    {
        let tarQua:Laya.Quaternion=Laya.Quaternion.DEFAULT;
        Laya.Quaternion.lerp(a,b,t,tarQua);
        return tarQua;
    }

    

}