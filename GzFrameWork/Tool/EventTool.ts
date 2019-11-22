import AdMan from "../../AdMan";
import MathTool from "./MathTool";
import Platform, { PlatformType } from "../../Platform";
import { GameDataManager, WeChatShareData, SavePlatformData } from "../Data/GameData";
import { WeChatAd } from "./WeChatAd";



export enum LogEventType
{
    ShareGameCount='ShareGameCount',
    StartGameCount='StartGameCount',
    SingleRewardCount='SingleRewardCount',
    DoubleRewardCount='DoubleRewardCount',
    BackMusicCount='BackMusicCount',
}

export class EventTool
{
    private static s_savePlatformdata:SavePlatformData;
    private static s_NetWorkType:string="none";
    private static s_sessionId:string="";
    private static s_appid="11";
    private static s_extraData;

    public static Init(){

    if (Platform.GetPlatform()==PlatformType.WeChat) 
    {
       
       var launchdata= wx.getLaunchOptionsSync();
       console.log("scene id="+launchdata.scene+' query='+launchdata.query.key);
       if (launchdata.referrerInfo!=undefined) 
       {
           if (launchdata.referrerInfo.appId==undefined) 
           {
                EventTool.s_appid="";
                EventTool.s_extraData="";
           }
           else
           {
                EventTool.s_appid =launchdata.referrerInfo.appId;
                EventTool.s_extraData=launchdata.referrerInfo.extraData;
           }
           EventTool.LogEvent("getLaunchOptionsSync"+ EventTool.s_appid);
       }

        wx.onShow(EventTool.OnWxShow);

        wx.getNetworkType(
            {
                success (res) 
                { 
                    EventTool.s_NetWorkType = res.networkType;
                    console.log("get networktypesuccess "+ res.networkType+" EventTool.s_NetWorkType="+EventTool.s_NetWorkType);
                },
                fail()
                {
    
                },
                complete()
                {
        
                }
              }
            )
            EventTool.s_sessionId=MathTool.GenUUID();
        }
    }


    static OnWxShow(res) 
    {
        console.log("eventtool wxShow");
        if (res.referrerInfo!="undefined"&&res.referrerInfo!=undefined) 
        {
            if (res.referrerInfo.appId==undefined) 
            {
                EventTool.s_appid="";
                EventTool.s_extraData="";
            }
            else
            {
                EventTool.s_appid =res.referrerInfo.appId;
                EventTool.s_extraData=res.referrerInfo.extraData;
            }
            if (res.query!="undefined"&&res.query!=undefined&&res.query.key!="undefined"&&res.query.key!=undefined) 
            {
                EventTool.LogEvent("OnAPPSHow from share+"+res.query.key);
            }
            EventTool.LogEvent("OnAPPSHow+"+EventTool.s_appid);
           
        }
   }



    public static LogEvent(evtName:string)
    { 
        let platform=Platform.GetPlatform();
        if (EventTool.s_savePlatformdata==null)
        {
            EventTool.s_savePlatformdata=Laya.loader.getRes(GameDataManager.s_SavePlatformDataJsonPath);
        }
        console.log("LogEvent "+platform.toString()+" "+evtName);

        switch (platform) 
        {
            case PlatformType.WeChat:
                wx.aldSendEvent(evtName);
                EventTool.LogWXEventToMysql(evtName);
                break;
            case PlatformType.FaceBook:
                if (Platform.isFacebook()) 
                {
                    FBInstant.logEvent(evtName);  
                }
                break;
        
            default:
            
                break;
        
            }
    }


    public static ShareWithFriend(value:string="")
    {
        switch (Platform.GetPlatform()) 
        {
            case PlatformType.WeChat:
             let wechatShareInfo:Array<WeChatShareData>= Laya.loader.getRes(GameDataManager.s_WeChatShareConfigJsonPath);

             if (wechatShareInfo==null||wechatShareInfo==undefined) 
             {
                 return;
             }
             
             let index=MathTool.GetRandomInt(0,wechatShareInfo.length);
             wx.shareAppMessage(
                {
                    title: wechatShareInfo[index].Title,
                    imageUrl:wechatShareInfo[index].ImageUrl,
                    query:"key="+wechatShareInfo[index].ImageId+"&sharekey="+value
                })

            EventTool.LogEvent("ShareWithFriend "+wechatShareInfo[index].ImageId);

            break;

            case PlatformType.FaceBook:
                console.log("Fb Share Game");
            break;
        
            default:
                break;
        }
    }



    static LogWXEventToMysql(eventId:string )
    {
     
          //数据写入到数据库
          if (EventTool.s_savePlatformdata!=null)
          {
            let time=  Laya.Browser.now()/1000;
            let timeint=  time.toFixed(0);
            let timenum=  parseInt(timeint);
            EventTool.s_savePlatformdata.client_ts=timenum;
            EventTool.s_savePlatformdata.connection_type=EventTool.s_NetWorkType;
            EventTool.s_savePlatformdata.device=  WeChatAd.SyncSystemInfo.model;
            EventTool.s_savePlatformdata.event_id=eventId;
            EventTool.s_savePlatformdata.manufacturer=WeChatAd.SyncSystemInfo.brand;
            EventTool.s_savePlatformdata.os_version=WeChatAd.SyncSystemInfo.system;
            EventTool.s_savePlatformdata.platform=WeChatAd.SyncSystemInfo.platform;
            EventTool.s_savePlatformdata.sdk_version=WeChatAd.SyncSystemInfo.SDKVersion;
          
            EventTool.s_savePlatformdata.session_id=EventTool.s_sessionId;
            EventTool.s_savePlatformdata.session_num=1;
            EventTool.s_savePlatformdata.user_id=GameDataManager.PlayerRoleData.PlayerId;
            EventTool.s_savePlatformdata.d0=EventTool.s_appid;
            if (EventTool.s_extraData==undefined) 
            {
                EventTool.s_savePlatformdata.d1="no extradata";
            }else{
                EventTool.s_savePlatformdata.d1=EventTool.s_extraData;
            }
            
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000;//设置超时时间；
            xhr.once(Laya.Event.COMPLETE, EventTool, completeHandler);
            xhr.once(Laya.Event.ERROR, EventTool, errorHandler);
            xhr.on(Laya.Event.PROGRESS, EventTool, processHandler);

            var GAME_APP_URL = "https://data.game520.com/game/event/v1_0/json";
           
            var messagedata=JSON.stringify(EventTool.s_savePlatformdata);
            console.log("messagedata="+messagedata );
            var headers = ["Content-Type", "application/json"];
            xhr.send(GAME_APP_URL,messagedata,"post","json",headers);

          }

          
        function processHandler(data) 
        {
            console.log("LogWXEventToMysql HttpRequest process ");
        }
        
        function errorHandler(data) {
            console.error("LogWXEventToMysql HttpRequest error "+data);

        }
        function completeHandler(e) {
            console.log("LogWXEventToMysql HttpRequest complete ");

        }
    }


    
   



   
    

}