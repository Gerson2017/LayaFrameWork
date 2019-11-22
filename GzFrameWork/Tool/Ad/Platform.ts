export enum PlatformType
{
    FaceBook="FaceBook",
    WeChat="WeChat",
    None="None",
}
   
   export default class Platform {

   private static s_platformType=PlatformType.None;

   public static GetPlatform()
   {
       if (Platform.s_platformType==PlatformType.None) 
       {
           if (Platform.isFacebook())
           {
               Platform.s_platformType=PlatformType.FaceBook;
           }
           else if (Laya.Browser.onWeiXin) 
           {
               Platform.s_platformType=PlatformType.WeChat;
           }
       }
      return this.s_platformType;
   }


   public  static isFacebook(): boolean 
   {
       if (typeof FBInstant !== 'undefined') 
       {
           return true;
       }
       return false;
   }


}