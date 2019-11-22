
import InputManager from "./InputManager";
import CameraMove from "./CameraMove";
import SimpleObjectPool from "../Pool/SimpleObjectPool";
import MsgDispatcher, { MsgType } from "../MsgDispatcher";
import { GameDataManager } from "../../Resource/ResourceLoad";
import Platform, { PlatformType } from "../Ad/Platform";
import { EventTool } from "../EventTool";
import UIManager, { ViewType } from "../../UI/UIManager";
import MathTool from "../MathTool";


export enum GameModel
{
    FreeDomModel,
    TeamModel,

}

export enum GroundType{
    Water,
    Magma,//岩浆
}


export enum GameState
{
    Ready,
    Start,
    GameOver,
}


export enum GameLanguageType{
    Chinese,
    English,
}



export default class GameManager{

    m_currentScene: Laya.Scene3D;
    private static m_instance:GameManager;
    public m_GameState:GameState=GameState.Ready;
    public m_GameModel:GameModel=GameModel.FreeDomModel;

    public static s_GameLanguageType=GameLanguageType.Chinese;


        
    public static GetInstance():GameManager
    {
        if(this.m_instance==null){
            this.m_instance=new GameManager();
        }
        return this.m_instance;
    }




    public Init()
    {  
        MsgDispatcher.Register(MsgType.ChangeLevel.toString(),this.ChangeLevel.bind(this));
        MsgDispatcher.Register(MsgType.ChangeModelSkin.toString(),this.OnPlayerChangeSkin.bind(this));
        InputManager.GetInstance().InitInputManager();

        Laya.Scene3D.load(GameDataManager.s_ScenePath,Laya.Handler.create(this,this.OnLoadSceneComplete.bind(this))); 
        if (Platform.GetPlatform()==PlatformType.WeChat)
        {
            wx.onHide(this.OnGameExit.bind(this));
        }
    }


    OnGameExit()
    {
        console.log("OnGameHide=====");
        GameDataManager.PlayerRoleData.LoginOutTime=Laya.Browser.now();
        GameDataManager.SetPlayerDataLocal();
    }


    private index=1;
    LoadScene()
    {
        
    }


    OnLoadSceneComplete(scene:Laya.Scene3D)
    {
        console.log("OnLoadSceneComplete =========="+scene==null);
        if (scene==null) 
        {
            Laya.Scene3D.load(GameDataManager.s_ScenePath,Laya.Handler.create(this,this.OnLoadSceneComplete.bind(this))); 
            console.log("正在尝试重新加载");
            EventTool.LogEvent("OnLoadSceneComplete Reload===");
            return;
        }
        this.m_currentScene=scene;
        this.m_currentScene.active=true;
        Laya.stage.addChild(scene);

        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
        this.m_currentScene.physicsSimulation.fixedTimeStep=2/60;

        var palyerdata=GameDataManager.PlayerRoleData;

        this.InitLight();
        this.LoadScene();
        this.InitPrefab();
        this.InitPool();
        this.InitGroundTexture();

        this.InitPlayer();
        this.InitMap();
        this.InitGameScene();
        this.InitUI();
    }

    InitUI()
    {
        UIManager.Instance.PushPanel(ViewType.RewardPartView);
        UIManager.Instance.PushPanel(ViewType.DiamonView);
        UIManager.Instance.PushPanel(ViewType.TipView);
        UIManager.Instance.PushPanel(ViewType.GiftView);
        UIManager.Instance.PushPanel(ViewType.StartView);
        this.InitOffLineReward();
    }


    InitOffLineReward()
    {
        let loginouttime=GameDataManager.PlayerRoleData.LoginOutTime;
        if (loginouttime==0) 
        {
            return;    
        }
        //老用户离线时间超过2分钟
        if (Laya.Browser.now()-loginouttime>120000) 
        {
           UIManager.Instance.PushPanel(ViewType.OffLineView);
        }
    }


    InitLight()
    {
        let lighting=this.m_currentScene.getChildByName("Directional Light") as Laya.DirectionLight;
         //灯光开启阴影
         lighting.shadow = true;
         //可见阴影距离
         lighting.shadowDistance = 300;
         //生成阴影贴图尺寸
         lighting.shadowResolution = 800;
         //生成阴影贴图数量
         lighting.shadowPSSMCount = 1;
         //模糊等级,越大越高,更耗性能
         lighting.shadowPCFType = 1;
    }


    InitGroundTexture()
    {

    }


    InitPool()
    {
        
    }


    InitPrefab()
    {
       
    }


    public InitGameScene()
    {
       //初始化敌人位置
      
    }


    InitMap()
    {

    }

    
    public  FindSp(name:string):Laya.Sprite3D
    {
        let sp:Laya.Sprite3D=this.m_currentScene.getChildByName(name) as Laya.Sprite3D;
        return sp;
    }


    public InitPlayer()
    {
          
    }


    ShowLeveObjs(levelId:number)
    {
       
    }

    private  s_textureArray:Array<number>=[];
    public OnPlayerChangeSkin()
    {
 
    }

    public ResetTextureArray()
    {
        this.s_textureArray=[];
    }

    public  GetTexureRandom()
    {
        if (this.s_textureArray.length<1)
        {
            for (let index = 0; index < GameDataManager.s_ModelSkinNum; index++) 
            {
                if (index!=GameDataManager.PlayerRoleData.Skin) 
                {
                    this.s_textureArray.push(index);
                }
                else
                {
                   // console.log("GetTexureRandom============");
                }
            }
        }

        let textureNum=MathTool.GetRandomInt(0,this.s_textureArray.length);
        let num=this.s_textureArray[textureNum];
        let texture=GameDataManager.s_ModelSkinMap[num];
        let index=this.s_textureArray.indexOf(num);

        if (index>-1) 
        {
            this.s_textureArray.splice(index,1);
        }
        return texture;
    }



    RestGameObjs()
    {

       this.ResetTextureArray();
    }


    public ChangeLevel()
    { 
        this.RestGameObjs();
        this.LoadScene();
        this.InitPlayer();
        this.InitMap();
        this.InitGameScene();
        UIManager.Instance.PushPanel(ViewType.StartView);
        this.m_GameState=GameState.Ready;
    }


    //场景数据记录======================================================
    public OnEnemyDeath(gameroleTeam)
    {
        
      
    }
    public OnGameStart()
    {
      
    }





}