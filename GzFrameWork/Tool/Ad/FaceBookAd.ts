

declare let ErrorCode: any;
export default class AdMan {
    private static videoCallBack = null;
    private static hasRV: boolean = true;
    private static curCheckTime: number = 0;

    private static interstitial_idArr = [
        "471460823688838_483049969196590",
        "471460823688838_483049799196607",
        "471460823688838_471465077021746"];
    private static reward_video_idArr = [
        "471460823688838_483050355863218",
        "471460823688838_483050275863226",
        "471460823688838_471465403688380"];

    private static isLoadingInterstitial: boolean = false;
    private static interstitialInstance = null;
    private static interstitialLoaded: boolean = false;
    
    private static rewardVideoInstance = null;
    private static rewardVideoLoaded: boolean = false;
    private static isLoadingRewardVideo: boolean = false;

    private static delayLoadRVTime: number = 0;
    private static failLoadRVCount: number = 0;
    private static delayLoadISTime: number = 0;
    private static failLoadISCount: number = 0;
    private static failAddTime: number = 30;

    private static interstitialIdx: number = 0;
    private static reward_videoIdx: number = 0;


    public static LoadGameAssistant()
    {
        if (AdMan.isFacebook()) {
            FBInstant.player.canSubscribeBotAsync()
            .then(function (can_subscribe) {
            if (can_subscribe) {
            FBInstant.player.subscribeBotAsync().then(
            function () {
                AdMan.AddDesignEvent("SubscribeBotOK");
                }
            ).catch(function (e) {
                AdMan.AddDesignEvent("SubscribeBotFail");  } );  
            }
            }
            );
        }
    }
    
    


    public static isFacebook(): boolean {
        if (typeof FBInstant !== 'undefined') {
            return true;
        }
        return false;
    }



    public static LoadAd() {
        if (AdMan.isFacebook()) {
            AdMan.LoadInterstitialAd();
            AdMan.LoadRewardVideoAd();
        }
    }

    public static LoadInterstitialAd() {
        if (AdMan.isFacebook() && this.delayLoadISTime < 0.001) {
            AdMan.isLoadingInterstitial = true;
            if (AdMan.interstitialInstance == null) {
                FBInstant.getInterstitialAdAsync(
                    AdMan.interstitial_idArr[AdMan.interstitialIdx]
                ).then(function (interstitial) {
                    AdMan.interstitialInstance = interstitial;
                    return interstitial.loadAsync();
                }).then(function () {
                    AdMan.interstitialLoaded = true;
                    AdMan.isLoadingInterstitial = false;
                    console.log("LoadInterstitialAd Scuccess");
                }).catch(function (e) {
                    AdMan.interstitialLoaded = false;
                    AdMan.isLoadingInterstitial = false;
                    console.log("LoadInterstitialAd fail1");
                    console.log(e.code);
                    console.log(e.message);

                    if (e.code == "ADS_NO_FILL") {
                        if (AdMan.interstitialIdx < AdMan.interstitial_idArr.length - 1) {
                            AdMan.interstitialIdx++;
                            AdMan.interstitialInstance = null;
                        }
                    }
                    else {
                        AdMan.interstitialInstance = null;
                    }

                    if (AdMan.interstitialIdx == AdMan.interstitial_idArr.length - 1) {
                        AdMan.delayLoadISTime = AdMan.failLoadISCount * AdMan.failAddTime;
                        AdMan.failLoadISCount++;

                        if(AdMan.failLoadISCount > 4) {
                            AdMan.interstitialIdx = 0;
                            AdMan.delayLoadISTime = 0;
                            AdMan.failLoadISCount = 0;
                        }
                    }
                });
            }
            else {
                AdMan.interstitialInstance.loadAsync().then(function () {
                    AdMan.interstitialLoaded = true;
                    AdMan.isLoadingInterstitial = false;
                    console.log("LoadInterstitialAd Scuccess");
                }).catch(function (e) {
                    AdMan.interstitialLoaded = false;
                    AdMan.isLoadingInterstitial = false;
                    console.log("LoadInterstitialAd fail2");
                    console.log(e.code);
                    console.log(e.message);

                    if (e.code == "ADS_NO_FILL") {
                        if (AdMan.interstitialIdx < AdMan.interstitial_idArr.length - 1) {
                            AdMan.interstitialIdx++;
                            AdMan.interstitialInstance = null;
                        }
                    }
                    else {
                        AdMan.interstitialInstance = null;
                    }

                    if (AdMan.interstitialIdx == AdMan.interstitial_idArr.length - 1) {
                        AdMan.delayLoadISTime = AdMan.failLoadISCount * AdMan.failAddTime;
                        AdMan.failLoadISCount++;
                    }
                });
            }
        }
    }

    public static LoadRewardVideoAd() {
        if (AdMan.isFacebook() && AdMan.delayLoadRVTime < 0.01) {
            AdMan.isLoadingRewardVideo = true;
            if (AdMan.rewardVideoInstance == null) {
                FBInstant.getRewardedVideoAsync(
                    AdMan.reward_video_idArr[AdMan.reward_videoIdx]
                ).then(function (rewarded) {
                    AdMan.rewardVideoInstance = rewarded;
                    return rewarded.loadAsync();
                }).then(function () {
                    AdMan.rewardVideoLoaded = true;
                    AdMan.isLoadingRewardVideo = false;
                    console.log("LoadRewardVideoAd Scuccess");
                }).catch(function (e) {
                    AdMan.rewardVideoLoaded = false;
                    AdMan.isLoadingRewardVideo = false;
                    console.log("LoadRewardVideoAd fail1");
                    console.log(e.code);
                    console.log(e.message);

                    if (e.code == "ADS_NO_FILL") {
                        if (AdMan.reward_videoIdx < AdMan.reward_video_idArr.length - 1) {
                            AdMan.rewardVideoInstance = null;
                            AdMan.reward_videoIdx++;
                        }
                    }
                    else {
                        AdMan.rewardVideoInstance = null;
                    }

                    if (AdMan.reward_videoIdx == AdMan.reward_video_idArr.length - 1) {
                        AdMan.delayLoadRVTime = AdMan.failLoadRVCount * AdMan.failAddTime;
                        AdMan.failLoadRVCount++;
                        if(AdMan.failLoadRVCount > 4) {
                            AdMan.reward_videoIdx = 0;
                            AdMan.delayLoadRVTime = 0;
                            AdMan.failLoadRVCount = 0;
                        }
                    }
                });
            }
            else {
                AdMan.rewardVideoInstance.loadAsync().then(function () {
                    AdMan.rewardVideoLoaded = true;
                    AdMan.isLoadingRewardVideo = false;
                    console.log("LoadRewardVideoAd Scuccess");
                }).catch(function (e) {
                    AdMan.rewardVideoLoaded = false;
                    AdMan.isLoadingRewardVideo = false;
                    console.log("LoadRewardVideoAd fail2");
                    console.log(e.code);
                    console.log(e.message);

                    if (e.code == "ADS_NO_FILL") {
                        if (AdMan.reward_videoIdx < AdMan.reward_video_idArr.length - 1) {
                            AdMan.rewardVideoInstance = null;
                            AdMan.reward_videoIdx++;
                        }
                    }
                    else {
                        AdMan.rewardVideoInstance = null;
                    }

                    if (AdMan.reward_videoIdx == AdMan.reward_video_idArr.length - 1) {
                        AdMan.delayLoadRVTime = AdMan.failLoadRVCount * AdMan.failAddTime;
                        AdMan.failLoadRVCount++;                        
                    }
                });
            }
        }
    }

    public static hasInterstitial(): boolean {
        if (AdMan.isFacebook()) {
            if (AdMan.interstitialInstance != null &&
                AdMan.interstitialLoaded) {
                return true;
            }
            else {
                if (AdMan.isLoadingInterstitial) {
                    return false;
                }
                else {
                    AdMan.LoadInterstitialAd();
                }
            }
        }
        else {
        }
        return false;
    }

    public static showInterstitial(): void {
        if (AdMan.isFacebook() && AdMan.hasInterstitial()) {
            AdMan.interstitialInstance.showAsync()
                .then(function () {
                    AdMan.interstitialLoaded = false;
                    console.log('Interstitial ad finished successfully');
                    AdMan.interstitialIdx = 0;
                    AdMan.delayLoadISTime = 0;
                    AdMan.failLoadISCount = 0;
                    AdMan.interstitialInstance = null;
                    AdMan.LoadInterstitialAd();
                })
                .catch(function (e) {
                    AdMan.interstitialLoaded = false;
                    console.error(e.message);
                    AdMan.interstitialIdx = 0;
                    AdMan.delayLoadISTime = 0;
                    AdMan.failLoadISCount = 0;
                    AdMan.interstitialInstance = null;
                    AdMan.LoadInterstitialAd();
                });
        }
    }

    public static hasRewardVideo(): boolean {
        if (AdMan.isFacebook()) {
            if (AdMan.rewardVideoInstance != null &&
                AdMan.rewardVideoLoaded) {
                return true;
            }
            else {
                if (AdMan.isLoadingRewardVideo) {
                    return false;
                }
                else {
                    AdMan.LoadRewardVideoAd();
                    return false;
                }
            }
        }
        else {
            return AdMan.hasRV;
        }
    }

    public static showRewardVideo(type: number, callBack): void {
        AdMan.videoCallBack = callBack;
        if (AdMan.isFacebook()) {
            AdMan.rewardVideoInstance.showAsync()
                .then(function () {
                    AdMan.rewardVideoLoaded = false;
                  
                    AdMan.videoCallBack(true);
                    AdMan.reward_videoIdx = 0;
                    AdMan.failLoadRVCount = 0;
                    AdMan.delayLoadRVTime = 0;
                    AdMan.rewardVideoInstance = null;
                    AdMan.LoadRewardVideoAd();
                    console.log('Rewarded video watched successfully');
                })
                .catch(function (e) {
                    AdMan.rewardVideoLoaded = false;
                    AdMan.videoCallBack(false);
                    AdMan.reward_videoIdx = 0;
                    AdMan.failLoadRVCount = 0;
                    AdMan.delayLoadRVTime = 0;
                    AdMan.rewardVideoInstance = null;
                    console.error(e.message);
                    AdMan.LoadRewardVideoAd();
                });
        }
        else {
            AdMan.videoCallBack(true);
        }
    }

    public static loadRewardedVideoCallBack() {
        AdMan.hasRV = true;
    }

    public static showRewardedVideoAdCallBack(show: boolean) {
        AdMan.videoCallBack(show);
        AdMan.videoCallBack = null;
    }

    public static UpdateCheckRV(dt: number) {
        if (AdMan.isFacebook()) {
            AdMan.delayLoadRVTime -= dt;
            if (AdMan.delayLoadRVTime < 0) {
                AdMan.delayLoadRVTime = 0;
            }

            AdMan.delayLoadISTime -= dt;
            if (AdMan.delayLoadISTime < 0) {
                AdMan.delayLoadISTime = 0;
            }

            return;
        }
    }

    public static BusinessCurrency(currency: string, amount: number, itemType: string, itemId: string,
        cartType: string, receipt: string, signature: string): void {
        if (AdMan.isFacebook()) {
            return;
        }
        else {
        }
    }

    public static AddResouce(currency: string, amount: number, itemType: string, itemId: string) {
        if (AdMan.isFacebook()) {
            FBInstant.logEvent("AddResouce", amount, { itemType: itemType, itemId: itemId });
            return;
        }
        else {
        }
    }

    public static SinkResouce(currency: string, amount: number, itemType: string, itemId: string) {
        if (AdMan.isFacebook()) {
            FBInstant.logEvent("SinkResouce", amount, { itemType: itemType, itemId: itemId });
            return;
        }
        else {
        }
    }

    public static StartProgression(level: string, stage: string) {
        if (AdMan.isFacebook()) {
            FBInstant.logEvent("StartLevel:" + level);
            return;
        }
        else {
        }
    }

    public static CompleteProgression(level: string, stage: string) {
        if (AdMan.isFacebook()) {
            FBInstant.logEvent("CompleteLevel:" + level);
            return;
        }
        else {
        }
    }

    public static AddDesignEvent(eventId: string) {
        if (AdMan.isFacebook()) {
            FBInstant.logEvent(eventId);
            return;
        }
        else {
        }
    }

    public static GetConfigDataByKey(key: string): number {
        if (AdMan.isFacebook()) {
            return;
        }
        else {
        }
    }

  

    public static ShowBannerAd(show: boolean) {
        if (AdMan.isFacebook()) {
            return;
        }
        else {
        }
    }

    public static IsIPhoneX(): boolean {
        if (AdMan.isFacebook()) {
            return false;
        }
        else {
        }
    }

    public static Share(title: string, callBack) {
        if (AdMan.isFacebook()) {
            FBInstant.shareAsync({
                intent: 'REQUEST',
                image: AdMan.getImgBase64(),
                text: title,
                data: {
                    myReplayData: '...'
                },
            }).then(() => {
                callBack(true);
            });
        }
        else {
            callBack(false);
        }
    }

    public static getImgBase64() {
        return "";
    }
}
