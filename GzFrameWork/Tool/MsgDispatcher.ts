


export enum MsgType
{
    GameLoading="GameLoading",
    GameLoadOver="GameLoadOver",
    GameStart="GameStart",
    GameStartDirect="GameStartDirect",
    GameWaiting="GameWaiting",
    ChangeLevel="ChangeLevel",
    PlayerDefeate="PlayerDefeate",
    PlayerVictory="PlayerVictory",
    ReflashDiamonNum="ReflashDiamonNum",
    ReflashGoldNum="ReflashGoldNum",
    ReflashScoreNum="ReflashScoreNum",
    HandleGoldNumCount="HandleGoldNumCount",
    HandleDiamonNumCount="HandleDiamonNumCount",
    HandleScoreNumCount="HandleScoreNumCount",
    ChangeModelSkin="ChangeModelSkin",
    ShowGetDiamonEffect="ShowGetDiamonEffect",
    ShowGetGoldEffect="ShowGetGoldEffect",
    ShowGiftProgress="ShowGiftProgress",
    HIdeGiftViewProgress="HIdeGiftViewProgress",
    PlayerGetGift="PlayerGetGift",
    ShowFingerAmTip="ShowFingerAmTip",
    HideFingerAmTip="HideFingerAmTip",
    ShowFingerImg="ShowFingerImg",
    DuanWeiLevelUP="DuanWeiLevelUP",
    OnSkinViewShow="OnSkinViewShow",
    OnSkinViewHide="OnSkinViewHide",
    OnPlayerWinIntheStartLine="OnPlayerWinIntheStartLine",
    OnPlayerGetSpecialSkin="OnPlayerGetSpecialSkin",
   // TeamFightClick="TeamFightClick",
}


export default class MsgDispatcher extends Laya.Script3D 
{

   private static m_registeredMsgs: { [key: string]:Array<Function>; } ={};


   public static Register( msgName:string, onMsgReceived:Function):void
   {
        if(this.m_registeredMsgs[msgName]==null)
        {
            this.m_registeredMsgs[msgName]=[];
        }
        this.m_registeredMsgs[msgName].push(onMsgReceived);
   }


   public static  UnRegisterAll( msgName:string)
   {  
       if(this.m_registeredMsgs[msgName]!=null)
       {
           delete this.m_registeredMsgs[msgName];      
       }
   }


   public static  UnRegister(msgName:string, onMsgReceived:Function)
   {
        if(this.m_registeredMsgs[msgName]!=null)
        {
            let index=this.m_registeredMsgs[msgName].indexOf(onMsgReceived);
            if( index>-1)
            {
                this.m_registeredMsgs[msgName].slice(index,1);
            }
            if(this.m_registeredMsgs[msgName].length<1){
                delete this.m_registeredMsgs[msgName];
            }
        }
   }


   public static  Send(msgName:string,data:any=null)
   {
       if (this.m_registeredMsgs[msgName]!=null)
       {
            this.m_registeredMsgs[msgName].forEach(func => {
           func(data);
            });
       }
       else{
           console.log("error:"+msgName+" 不存在当前数组中");
       }
   }
}