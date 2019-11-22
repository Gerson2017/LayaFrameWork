import Platform, { PlatformType } from "../../Platform";


export class EffectTool
{

    private static s_canShake=true;

    public static OpenShake()
    {
        EffectTool.s_canShake=true;
    }


    public static CloseShake()
    {
        EffectTool.s_canShake=false;
    }


    public static  vibration(shaketime:number=100)
    {
        if (!EffectTool.s_canShake) {
           return;
        }

        switch(Platform.GetPlatform())
        {
            case PlatformType.WeChat:
                wx.vibrateShort({success:EffectTool.WxVibrateSuccess,complete:EffectTool.WxVibrateComplete,fail:EffectTool.WxVibrateFail})
            break;
            case PlatformType.FaceBook:           
                if (navigator.vibrate) 
                {
                    // 支持
                    navigator.vibrate(100);
                }
                else
                {
                    // 不支持
                    console.log("不支持设备震动！");
                    return;
                }
            break;
        }


    }
    
    private static WxVibrateSuccess(){

    }

    private static WxVibrateComplete(){

    }

    private static WxVibrateFail(){
        
    }
}