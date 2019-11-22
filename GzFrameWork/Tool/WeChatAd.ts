
export class WeChatAd{

    //bannner
    private static s_NormalBannerId="adunit-769c3a35507c5b0e";
    private static s_RewardBannerId="PBgAAfog4YE87fYc";

    //rewardVideo
    private static s_30RewardVideoId="adunit-931370358c0d9086";
    private static s_15RewardVideoId="adunit-b65f68f85c87afd0";

    //InterstitialAd
    private static s_InterstitialAdId="adunit-48f70c13fa4961b1";

    private static s_Banner:BannerAd=null;
    //video
    private static s_RewardVideoAd:RewardedVideoAd=null;
    private static s_rewardVideoLoaded=false;
    private static s_videoCallBack:Function;
    //interstitial
    private static s_interstitialLoaded=false;
    private static s_InterstitialAd:InterstitialAd=null;
    private static s_interstitialAdCallBack:Function;
    //GameIcon
    private static s_GameIconInterstitialLoaded=false;
    private static s_GameIcon:GameIcon=null;
    
    private static s_safeHeight=0;

    //是否有游戏Icon
    public static get HasGameIcon()
    {
        if (WeChatAd.s_GameIcon==null) 
        {
            WeChatAd.CreateGameIcon();
            return false;
        }
        
        return WeChatAd.s_rewardVideoLoaded;
    }



    ///是否有激励视频广告
    public static get HasRewardVideo()
    {
        if (WeChatAd.s_RewardVideoAd==null) 
        {
            WeChatAd.Created30RewardedVideoAd();
            return false;
        }
        //未加载
        if (!WeChatAd.s_rewardVideoLoaded) {
            WeChatAd.s_RewardVideoAd.load();
        }
        
        return WeChatAd.s_rewardVideoLoaded;

    }


    ///是否有插屏广告
    public static get HasInterstiatialAd()
    {
        if (WeChatAd.s_InterstitialAd==null) 
        {
            WeChatAd.CreatedInterstitialAd();
            return false;
        }
        //未加载
        if (!WeChatAd.s_interstitialLoaded&&WeChatAd.compareVersion(WeChatAd.SDKVersion,'2.8.0')>=0) {
            WeChatAd.s_InterstitialAd.load();
        }
        
        return WeChatAd.s_interstitialLoaded;
    }

    private static s_SystemInfo:_getSystemInfoSuccessObject;
    private static s_syncsystemInfoS:_getSystemInfoSyncReturnValue;
    

    public static get SyncSystemInfo()
    {
        if (WeChatAd.s_syncsystemInfoS==null) {
            WeChatAd.s_syncsystemInfoS=wx.getSystemInfoSync();
        }
        return WeChatAd.s_syncsystemInfoS;
    }

    //SDK版本
    private static SDKVersion="0.0.0";

    public static InitWeChatAd(){
        WeChatAd.GetSystemInfo();
       
    }


    //显示GameIcon
    public static ShowGameIcon()
    {
        if (!WeChatAd.CanShowCreateGameIcon()) 
        {
            return;
        }
        if (WeChatAd.s_SystemInfo==null) {
            WeChatAd.GetSystemInfo();
             console.log("未获取到系统信息 游戏图标显示失败");
             return;
         }

         console.log("WeChatAd.s_GameIconInterstitialLoaded="+WeChatAd.s_GameIconInterstitialLoaded);
         if (WeChatAd.s_GameIconInterstitialLoaded&&WeChatAd.s_GameIcon!=null)
        { 
            console.log("WeChatAd.gameIconSHow");
             WeChatAd.s_GameIcon.show();
         }

    }

    //隐藏游戏Icon
    public static HideGameIcon()
    {
        if (WeChatAd.s_GameIcon!=null) {
            WeChatAd.s_GameIcon.hide();
        }
    }

    //隐藏游戏Icon并创建新的game Icon
    public static HideGameIconAndCreateNew()
    {
        if (WeChatAd.s_GameIcon!=null) {
            WeChatAd.s_GameIcon.hide();
            WeChatAd.s_GameIcon.load()
        }
       
      ;
    }

     //显示广告
     public static ShowBanner()
     {
         if (!WeChatAd.CanShowBannerAd()) 
         {
             return;
         }
         if (WeChatAd.s_SystemInfo==null) {
            WeChatAd.GetSystemInfo();
             console.log("未获取到系统信息 广告显示失败");
             return;
         }
         if(WeChatAd.s_Banner!=null)
         {
             WeChatAd.s_Banner.show();
            // console.log("wechatscreen height="+this.s_SystemInfo.screenHeight+"wechatscreen width="+
            // this.s_SystemInfo.screenWidth+"laya screenheight="+Laya.Browser.height+" laya screenwidth="+Laya.Browser.width+
            // "safe width="+this.s_SystemInfo.safeArea.width+" safe height="+this.s_SystemInfo.safeArea.height
            // );
         }
         else{
             WeChatAd.CreateBanner();
         }
     }

     //隐藏Banner广告
     public static HideBanner()
     {
         if(WeChatAd.s_Banner!=null)
         {
             WeChatAd.s_Banner.hide();
         }
     }

     public static HiderBannerAndCreateNew()
     {
      
        if(WeChatAd.s_Banner!=null)
        {
            WeChatAd.s_Banner.hide();

            if (!WeChatAd.CanShowBannerAd()) 
            {
                return;
            }
            WeChatAd.s_Banner.destroy(); 
            WeChatAd.s_Banner=null
            WeChatAd.CreateBanner();
        }
     }

 
     //刷新Banner广告
     public static ReflashBanner(){
        WeChatAd.CreateBanner();
     }
 

     //显示激励视频广告
     public static ShowRewardVieoAd(callback,type?:number)
     {
        WeChatAd.s_videoCallBack=callback;
        if (WeChatAd.HasRewardVideo) 
        {
            WeChatAd.s_RewardVideoAd.show().
            then(function()
            {
                WeChatAd.s_rewardVideoLoaded=false
            }
            ).
            catch(function(e)
            {
                WeChatAd.s_interstitialLoaded=false
                console.error(e.message);
                WeChatAd.s_videoCallBack(false);
            }); 

        }
        else{
            WeChatAd.s_videoCallBack(false);
        }
           
     }
    
     
     //显示插屏广告
     public static ShowInterstitialAd(callback,type?:number)
     {
        WeChatAd.s_interstitialAdCallBack=callback;
        if (WeChatAd.HasInterstiatialAd) 
        {
            WeChatAd.s_InterstitialAd.show().
            then(function()
            {
                WeChatAd.s_interstitialLoaded=false
            }
            ).
            catch(function(e)
            { 
                WeChatAd.s_interstitialLoaded=false
                console.error(e.message);            
            }); 
        }     
     }


     public static CanShowBannerAd()
     {
        return WeChatAd.compareVersion(WeChatAd.SDKVersion,'2.0.4')>=0;
     
     }

     public static CanShowRewardVideoAd()
     {
       
        return WeChatAd.compareVersion(WeChatAd.SDKVersion,'2.0.4')>=0;
     
     }

     public static CanShowInterstitialAd()
     {
        return WeChatAd.compareVersion(WeChatAd.SDKVersion,'2.6.0')>=0;
     }

     public static CanShowRank()
     {
         return WeChatAd.compareVersion(WeChatAd.SDKVersion,"1.9.92")>=0;
     }

     public static CanShowCreateGameIcon()
     {
         return WeChatAd.compareVersion(WeChatAd.SDKVersion,"2.8.3")>=0;
     }


     public static CanUseGetMenuButton()
     {
         console.log("CanUseGetMenuButton "+WeChatAd.SDKVersion);
        return  WeChatAd.compareVersion(WeChatAd.SDKVersion,"2.1.0")>=0;
     }

    private static GetSystemInfo()
    {
        wx.getSystemInfo({success:(res)=>{
            WeChatAd.s_SystemInfo=res;
            WeChatAd.SDKVersion=WeChatAd.s_SystemInfo.SDKVersion;
            console.log("model="+res.model);
            console.log("pixelRatio="+res.pixelRatio);
            console.log("windowWidth="+res.windowWidth);
            console.log("windowHeight="+res.windowHeight);
            console.log("ScreenWidth="+res.screenWidth);
            console.log("screenHeight="+res.screenHeight);
            console.log(res.language);
            console.log(res.version);
            console.log(res.SDKVersion);
            console.log(res.platform);
        },
        fail:()=>{ 
        },
        complete:()=>{
        }
        });
    }

/////////=========================Banner


    private static CreateBanner()
    {
        if (WeChatAd.s_SystemInfo==null) {
            return;
        }

        let bannerAd = wx.createBannerAd({
            adUnitId: WeChatAd.s_NormalBannerId,
            style: {
                width:300,
                left:(WeChatAd.s_SystemInfo.screenWidth-300)/2+0.1,
                top:WeChatAd.s_SystemInfo.screenHeight-105,
                adIntervals: 30
            }
          })
          if (WeChatAd.s_Banner!=null) 
          {
            WeChatAd.s_Banner.destroy()
            WeChatAd.s_Banner=null;
          }
          bannerAd.onLoad(() => {
            WeChatAd.s_Banner=bannerAd;
            console.log('banner 广告加载成功')
         
          })
          bannerAd.onResize(size=>
          {
            console.log("bannerSize="+size.width+" height="+size.height+" realwidth="+bannerAd.style.realWidth+" realheight="+bannerAd.style.realHeight);
             bannerAd.style.left=(WeChatAd.s_SystemInfo.screenWidth-size.width)/2+0.1;
             bannerAd.style.top =WeChatAd.s_SystemInfo.screenHeight- size.height+0.1;
          }
        );

          bannerAd.onError(err => {
            console.error("BannerIdError"+err);
           // WeChatAd.CreateGameBanner();
          })
    }


    private static CreateGameBanner()
    {
        let bannerAd = wx.createGameBanner({
            adUnitId: WeChatAd.s_RewardBannerId,
            style: {
                top:WeChatAd.s_SystemInfo.screenHeight-105,
                width:300,
                left:(WeChatAd.s_SystemInfo.screenWidth-300)/2+0.1,
            }
          })
          if (WeChatAd.s_Banner!=null) 
          {
            WeChatAd.s_Banner.destroy()
            WeChatAd.s_Banner=null;
          }
          bannerAd.onLoad(() => {
            WeChatAd.s_Banner=bannerAd;
            console.log('gamebanner 广告加载成功')
           
          })

          bannerAd.onError(err => {
            console.log(err)
            if (WeChatAd.s_Banner!=null) 
            {
                WeChatAd.s_Banner.destroy()
                WeChatAd.s_Banner=null;
            }
          })
    }



    ////////////RewardVidoe=============================

    private static Created30RewardedVideoAd()
    {
        if (!WeChatAd.CanShowRewardVideoAd()) 
        {
            return;
        }
        WeChatAd.s_RewardVideoAd = wx.createRewardedVideoAd({ adUnitId: WeChatAd.s_30RewardVideoId })
        WeChatAd.s_RewardVideoAd.onLoad(() => {
            WeChatAd.s_rewardVideoLoaded=true;
            console.log('激励视频 广告加载成功')
          })
          WeChatAd.s_RewardVideoAd.onError(err => {
            WeChatAd.s_rewardVideoLoaded=false;
            WeChatAd.Created15RewardedVideoAd();
            console.log("30激励加载失败:"+err)
          })

          WeChatAd.s_RewardVideoAd.onClose(function(res){
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                WeChatAd.s_videoCallBack(true);
              }
              else{
                WeChatAd.s_videoCallBack(false);
              }
              WeChatAd.s_videoCallBack=null;
           
          });

          
    }

    private static Created15RewardedVideoAd()
    {
        WeChatAd.s_RewardVideoAd= wx.createRewardedVideoAd({ adUnitId: WeChatAd.s_15RewardVideoId })
        WeChatAd.s_RewardVideoAd.onLoad(() => {
          //  WeChatAd.s_rewardVideoLoaded=true;
            console.log('15激励视频 广告加载成功')
          })
          WeChatAd.s_RewardVideoAd.onError(err => {
           // WeChatAd.s_rewardVideoLoaded=false;
            console.log("15激励加载失败:"+err)
          })
    }

 ///////////////============================================插屏广告=============

    private static CreatedInterstitialAd()
    {
        if (!WeChatAd.CanShowInterstitialAd()) {
            return;
        }
        WeChatAd.s_InterstitialAd= wx.createInterstitialAd({ adUnitId: WeChatAd.s_InterstitialAdId })
        WeChatAd.s_InterstitialAd.onLoad(() => {
            WeChatAd.s_interstitialLoaded=true;
            console.log('插屏 广告加载成功')
          })
          WeChatAd.s_InterstitialAd.onError(err => {
            WeChatAd.s_interstitialLoaded=false;
            console.log("插屏广告加载失败:"+err)
          })

          WeChatAd.s_InterstitialAd.onClose(function(e)
          {
              if (WeChatAd.s_interstitialAdCallBack!=null)
                {
                    WeChatAd.s_interstitialAdCallBack();
              }
         
            WeChatAd.s_interstitialAdCallBack=null;
          })
    }


    ///=======================游戏Icon==========

    public static CreateGameIcon()
    {
        if (!WeChatAd.CanShowCreateGameIcon()) 
        {
            return;
        }
        if (WeChatAd.s_SystemInfo==null) {
            return;
        }
        console.log("CreateGameIcon=======");
        // 在适合的场景显示推荐位 if (iconAd) {  iconAd.load().then(() => {    iconAd.show()  }).catch((err) => {    console.error(err)  }) }
        WeChatAd.s_GameIconInterstitialLoaded=false;
        let iconAd = wx.createGameIcon(
          {
              adUnitId: 'PBgAAfog4YE7G7sw',
              count:2,
              style:[],
          },
          {
          }
        );

        iconAd.onLoad(() => {

            console.log('CreateGameIcon 广告加载成功')  
            WeChatAd.s_GameIcon=iconAd;
            WeChatAd.s_GameIconInterstitialLoaded=true;
          })
          iconAd.onResize(size=>
          {
            iconAd.icons[0].appNameHidden = true;
            iconAd.icons[1].appNameHidden = true;
            iconAd.icons[0].left = 0;
            iconAd.icons[0].top = WeChatAd.SyncSystemInfo.screenHeight / 2 - 100;
            iconAd.icons[1].left = WeChatAd.SyncSystemInfo.screenWidth - 70;
            iconAd.icons[1].top = WeChatAd.SyncSystemInfo.screenHeight / 2 - 100;
          }
        );

        iconAd.onError(err => {
            WeChatAd.s_GameIconInterstitialLoaded=false;
            console.error("CreateGameIcon "+err.errMsg+" code="+err.errCode);
          })

    }

    public static CreateNewGameIcon(){
        
        if (WeChatAd.s_GameIcon!=null)
        {
            WeChatAd.s_GameIcon.destroy();
            WeChatAd.s_GameIcon=null;    
        }

        WeChatAd.s_GameIconInterstitialLoaded=false;
        WeChatAd.CreateGameIcon();
    }


    //版本号比较
   public static compareVersion(v1, v2) {
        v1 = v1.split('.')
        v2 = v2.split('.')
        const len = Math.max(v1.length, v2.length)
      
        while (v1.length < len) {
          v1.push('0')
        }
        while (v2.length < len) {
          v2.push('0')
        }
      
        for (let i = 0; i < len; i++) {
          const num1 = parseInt(v1[i])
          const num2 = parseInt(v2[i])
      
          if (num1 > num2) {
            return 1
          } else if (num1 < num2) {
            return -1
          }
        }
      
        return 0
      }

}