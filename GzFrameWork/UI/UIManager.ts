
import { SkinView } from "./SkinView";
import { DiamonViewUI } from "./DiamonViewUI";
import { GiftView } from "./GiftView";
import { GetGiftView } from "./GetGiftView";
import { LoadingView } from "./LoadingView";
import { StartView } from "./StartView";
import { GameRunningView } from "./GameRunningView";
import { PlayerVictoryView } from "./PlayerVictoryView";
import { PlayerDefealtView } from "./PlayerDefealtView";
import { LevelUpView } from "./LevelUpView";
import { RewardPartView } from "./RewardPartView";
import { Settingview } from "./SettingView";
import { TipView } from "./TipView";
import WaittingView from "./WaittingView";
import { OffLineView } from "./OffLineView";
import ShareSkinView from "./ShareSkinView";
import FreeSkinView from "./FreeSkinView";


export enum ViewType
{
    StartView="StartView",
    SkinView="SkinView",
    GameRunningView="GameRunningView",
    PlayerVictoryView="PlayerVictoryView",
    PlayerDefealtView="PlayerDefealtView",
    DiamonView="DiamonView",
    GiftView="GiftView",
    GetGiftView="GetGiftView",
    LoadingView="LoadingView",
    LevelUpView="LevelUpView",
    RewardPartView="RewardPartView",
    SettingView="SettingView",
    TipView="TipView",
    WatiingView="WatiingView",
    ShareSkinView="ShareSkinView",
    OffLineView= "OffLineView",
    FreeUseSkinView="FreeUseSkinView",
}

export default class UIManager
{
    
    private static m_instance:UIManager;

    public  static get Instance()
    {
        if (this.m_instance==null) {
            this.m_instance=new UIManager();
        }
        return this.m_instance;
    }

    private  m_viewMap: { [keykey: string]: IBaseView; } = {};
    private m_viewStack:Array<IBaseView>=[];
    private m_rewardPartView:RewardPartView;
    private m_TipView:TipView;
    private m_waitingView:WaittingView;

    /// <summary>
    /// 把某个页面入栈，  把某个页面显示在界面上
    /// </summary>
    public  PushPanel(viewType:ViewType)
    {
        if (this.m_viewStack == null)
            this.m_viewStack =[];

        //判断一下栈里面是否有页面
        if ( this.m_viewStack.length > 0)
        {
           let topview:IBaseView = this.m_viewStack[this.m_viewStack.length-1];
           topview.OnPause();
        }

        let panel:IBaseView =this.GetPanel(viewType);
        this.m_viewStack.push(panel);
        panel.OnEnter();
        
    }



    public  PopPanel()
    {
        if (this.m_viewStack.length <= 0) return;

        //关闭栈顶页面的显示
        let topPanel = this.m_viewStack.pop();
        topPanel.OnExit();

        if (this.m_viewStack.length <= 0) return;
        let topPanel2 = this.m_viewStack[this.m_viewStack.length-1];
       topPanel2.OnResume();
    }


    private  GetPanel(panelType:ViewType):IBaseView
    {
        let panel:any = this.m_viewMap[panelType];

        if (panel == null)
        {
            switch (panelType) {
                case ViewType.SkinView:
                    panel=new SkinView(this);
                    break;
                case ViewType.StartView:
                    panel=new StartView(this);
                    break;
                case ViewType.GameRunningView:
                    panel=new GameRunningView(this);
                    break;
                case ViewType.PlayerVictoryView:
                    panel=new PlayerVictoryView(this);
                    break;
                case ViewType.PlayerDefealtView:
                    panel=new PlayerDefealtView(this);
                    break;
                case ViewType.DiamonView:
                    panel=new DiamonViewUI(this);
                    break;
                case ViewType.GiftView:
                    panel=new GiftView(this);
                    break;
                case ViewType.GetGiftView:
                    panel=new GetGiftView(this);
                    break;
                case ViewType.LoadingView:
                    panel=new LoadingView();
                    break;
                case ViewType.LevelUpView:
                    panel=new LevelUpView();
                    break;
                case ViewType.RewardPartView:
                    panel=new RewardPartView();
                    this.m_rewardPartView=panel;
                    break;
                case ViewType.SettingView:
                    panel=new Settingview();
                    break;
                case ViewType.TipView:
                    panel=new TipView();
                    this.m_TipView=panel;
                    break;
                case ViewType.WatiingView:
                    panel=new WaittingView();
                    this.m_waitingView=panel;
                    break;
                case ViewType.OffLineView:
                    panel=new OffLineView();
                    break;
                case ViewType.ShareSkinView:
                    panel=new ShareSkinView();
                    break;
                case ViewType.FreeUseSkinView:
                    panel=new FreeSkinView();
                    break;
                default:
                console.log("Woring:"+panelType+" 没有对应的View界面");
                    break;
            }
            if (panel!=null)
            {
                this.m_viewMap[panelType]=panel;
            }
        }      
            return panel;
    }


    public ShowGetGoldEffect()
    {
        if(this.m_rewardPartView!=null)
        {
            this.m_rewardPartView.ShowGoldPart();
        }
    }


    public ShowGetDiamonEffect()
    {
        if (this.m_rewardPartView!=null) 
        {
            this.m_rewardPartView.ShowDiamonPart();
        }
    }

    public ShowMessage(message?:string)
    {
        if (this.m_TipView!=null) {
          
            this.m_TipView.ShowMessage(message);
        }
    }


    public ShowWaiting()
    {
        if (this.m_waitingView!=null)
        {
            this.m_waitingView.ShowWaiting();    
        }
    }


    public HideWatiing()
    {
        if (this.m_waitingView!=null)
        {
            this.m_waitingView.HideWaiting();    
        }
    }
}